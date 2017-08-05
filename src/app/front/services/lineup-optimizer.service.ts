import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import {CustomAuthService} from "../../shared/services/auth.service";
import {environment} from "../../../environments/environment";
import {Observable, BehaviorSubject, Subject} from "rxjs/Rx";
import {AdvFilterSettings} from "../models/adv-filter-setting.model";
import {OptimizerPlayer} from "../models/player.model";
import {FilterCriteria} from "../../user/models/filter-criteria.model";
import {LineupOppFilterCriteria} from "../models/filter-criteria.model";
import {LineupOppFilterConstants} from "../constants/lineup-opp.constants";
import {GeneratedLineupRecords} from "../models/generated-lineup.model";
import {Slate} from "../models/slate.model";
/**
 * Created by Hiren on 05-07-2017.
 */

@Injectable()
export class LineupOptimizerService {

  searchStr: string = '';
  selectedOperator: string = 'FanDuel';
  selectedSport: string = 'MLB';
  selectedSlate: number = 0;
  selectedGame: number = 0;
  filterSettings: AdvFilterSettings;

  activeSlate: Slate;

  players: OptimizerPlayer[];
  playersSubject: Subject<OptimizerPlayer[]> = new Subject<OptimizerPlayer[]>();
  players$: Observable<OptimizerPlayer[]> = this.playersSubject.asObservable();

  private _generatedLineups: GeneratedLineupRecords;

  get generatedLineups(): GeneratedLineupRecords {
    return this._generatedLineups;
  }

  set generatedLineups(value: GeneratedLineupRecords) {
    this._generatedLineups = value;
  }

  constructor(private http: Http, private authService: CustomAuthService) {

  }

  getToken(): string {
    return environment.token;
  }

  getHeaders(): Headers {
    let headers = new Headers();
    headers.append('content-type', 'application/json');
    if (this.getToken()) {
      headers.append('Authorization', 'Bearer ' + this.getToken());
    }
    return headers;
  }

  getPlayers(operator: string, sport: string, slateId: number): Observable<OptimizerPlayer[]> {
    return new Observable<OptimizerPlayer[]>(
      observer => {
        if (this.players && this.players.length) {
          observer.next(this.players);
        }
        else {
          this.retrievePlayers(operator, sport, slateId)
            .subscribe(
              response => {
                if (response.statusCode == 200) {
                  this.players = response.data.map(currPlayer => {
                    if (currPlayer.BattingOrder == null) {
                      currPlayer.BattingOrder = 0;
                    }
                    if (currPlayer.Value == null) {
                      currPlayer.Value = 0;
                    }
                    return currPlayer;
                  });
                  observer.next(this.players);
                }
              }
            );
        }
        this.players$.subscribe(
          players => {
            observer.next(players)
          }
        )
      }
    ).share();
  }

  retrieveSlates(operator: string, sport: string): Observable<any> {
    return this.http.get(environment.api_end_point + 'optimizer/slates?operator=' + operator + '&sport=' + sport, {headers: this.getHeaders()})
      .map((reponse: Response) => reponse.json())
      .catch(error => {
        this.handelError(error.json());
        return Observable.throw(error.json())
      });
  }

  retrievePlayers(operator: string, sport: string, slateId: number): Observable<any> {
    let url = environment.api_end_point + 'optimizer/playersBySlate?sport=' + sport + '&operator=' + operator;
    if (slateId != 0) {
      url += '&slate_id=' + slateId;
    }
    return this.http.get(url, {headers: this.getHeaders()})
      .map((reponse: Response) => reponse.json())
      .catch(error => {
        this.handelError(error.json());
        return Observable.throw(error.json())
      });
  }

  generateLineups(data: any, operator: string, sport: string): Observable<any> {
    return this.http.post(environment.api_end_point + 'optimizer/lineups?sport=' + sport + '&operator=' + operator, JSON.stringify(data), {headers: this.getHeaders()})
      .map((reponse: Response) => reponse.json())
      .catch(error => {
        this.handelError(error.json());
        return Observable.throw(error.json())
      });
  }

  retrieveAdvFilterSettings(operator: string, sport: string, slateId: number): Observable<any> {
    let url = environment.api_end_point + 'optimizer/filter?sport=' + sport + '&operator=' + operator;
    if (slateId != 0) {
      url += '&slate_id=' + slateId;
    }
    return this.http.get(url, {headers: this.getHeaders()})
      .map((reponse: Response) => reponse.json())
      .catch(error => {
        this.handelError(error.json());
        return Observable.throw(error.json())
      });
  }


  retrieveStackingData(sport: string, slateId: number): Observable<any> {
    let url = environment.api_end_point + 'optimizer/stacking?sport=' + sport;
    if (slateId != 0) {
      url += '&slate_id=' + slateId;
    }
    return this.http.get(url, {headers: this.getHeaders()})
      .map((reponse: Response) => reponse.json())
      .catch(error => {
        this.handelError(error.json());
        return Observable.throw(error.json())
      });
  }

  handelError(error: any) {
    if (error.statusCode == 401) {
      this.authService.logout();
    }
  }

  getBattingOrderByPlayerId(id: number): number {
    let order: number = 0;
    this.players.forEach(player => {
      if (player.PlayerID == id) {
        order = player.BattingOrder;
        return;
      }
    });
    return order;
  }

  getOpponentByPlayerId(id: number): string {
    let opponent: string = "";
    this.players.forEach(player => {
      if (player.PlayerID == id) {
        opponent = player.Opponent;
        return;
      }
    });
    return opponent;
  }

  getHomeTeamByPlayerId(id: number): string {
    let team: string = "";
    this.players.forEach(player => {
      if (player.PlayerID == id) {
        team = player.Team;
        return;
      }
    });
    return team;
  }

  applyFilters(filters: LineupOppFilterCriteria[]) {
    console.log("Filters => ", filters);
    let filteredPlayers = this.filterPlayers(filters);
    this.playersSubject.next(filteredPlayers);
  }

  filterPlayers(filters: LineupOppFilterCriteria[]): OptimizerPlayer[] {
    let players = this.players;

    filters.forEach(
      (currFilter: LineupOppFilterCriteria) => {
        switch (currFilter.filterKey) {
          case LineupOppFilterConstants.SLATE_ID:
            break;
          case LineupOppFilterConstants.PLAYER_SALARY:
            players = players.filter(
              (currPlayer: OptimizerPlayer) => {
                if (currPlayer.Salary >= currFilter.minValue && currPlayer.Salary <= currFilter.maxValue) {
                  return true;
                }
              }
            );
            break;
          case LineupOppFilterConstants.PLAYER_VALUE:
            players = players.filter(
              (currPlayer: OptimizerPlayer) => {
                if (currPlayer.Value >= currFilter.minValue && currPlayer.Value <= currFilter.maxValue) {
                  return true;
                }
              }
            );
            break;
          case LineupOppFilterConstants.PROJECTION:
            players = players.filter(
              (currPlayer: OptimizerPlayer) => {
                if (currPlayer.Points >= currFilter.minValue && currPlayer.Points <= currFilter.maxValue) {
                  return true;
                }
              }
            );
            break;
          case LineupOppFilterConstants.PLAYER_BATTING_ORDER:
            players = players.filter(
              (currPlayer: OptimizerPlayer) => {
                if (currPlayer.BattingOrder >= currFilter.minValue && currPlayer.BattingOrder <= currFilter.maxValue) {
                  return true;
                }
              }
            );
            break;
          case LineupOppFilterConstants.GAME_TYPE:
            players = players.filter(
              (currPlayer: OptimizerPlayer) => {
                let isPlayerInSlate: boolean = false;
                for (let i = 0; i < currFilter.filterValue.length; i++) {
                  let currValue = currFilter.filterValue[i];
                  if (currPlayer.GameID == currValue) {
                    isPlayerInSlate = true;
                    break;
                  }
                }
                return isPlayerInSlate;
              }
            );
            break;
          default:
            break;
        }
      }
    );
    return players;
  }

}
