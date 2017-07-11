import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import {AuthService} from "../../shared/services/auth.service";
import {environment} from "../../../environments/environment";
import {Observable, BehaviorSubject, Subject} from "rxjs/Rx";
import {AdvFilterSettings} from "../models/adv-filter-setting.model";
import {OptimizerPlayer} from "../models/player.model";
import {FilterCriteria} from "../../user/models/filter-criteria.model";
import {LineupOppFilterCriteria} from "../models/filter-criteria.model";
import {LineupOppFilterConstants} from "../constants/lineup-opp.constants";
/**
 * Created by Hiren on 05-07-2017.
 */

@Injectable()
export class LineupOptimizerService {

  players:OptimizerPlayer[];
  playersSubject:Subject<OptimizerPlayer[]> = new Subject<OptimizerPlayer[]>();
  players$:Observable<OptimizerPlayer[]> = this.playersSubject.asObservable();

  constructor(private http:Http, private authService:AuthService) {

  }

  getToken():string {
    return environment.token;
  }

  getHeaders():Headers {
    let headers = new Headers();
    headers.append('content-type', 'application/json');
    if (this.getToken()) {
      headers.append('Authorization', 'Bearer ' + this.getToken());
    }
    return headers;
  }

  getPlayers(operator:string, sport:string, slateId:number):Observable<OptimizerPlayer[]> {
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

  retrieveSlates(operator:string, sport:string):Observable<any> {
    return this.http.get(environment.api_end_point + 'api/slates?date_exact=2017-07-09&operator=' + operator + '&sport=' + sport, {headers: this.getHeaders()})
      .map((reponse:Response) => reponse.json())
      .catch(error => {
        this.handelError(error.json());
        return Observable.throw(error.json())
      });
  }

  retrievePlayers(operator:string, sport:string, slateId:number):Observable<any> {
    let url = environment.api_end_point + 'api/optimizer/playersBySlate?date_exact=2017-07-09&sport=' + sport + '&operator=' + operator;
    if (slateId != 0) {
      url += '&slate_id=' + slateId;
    }
    return this.http.get(url, {headers: this.getHeaders()})
      .map((reponse:Response) => reponse.json())
      .catch(error => {
        this.handelError(error.json());
        return Observable.throw(error.json())
      });
  }

  generateLineups(data:any, operator:string, sport:string, since:string = 'yesterday'):Observable<any> {
    return this.http.post(environment.api_end_point + 'api/optimizer/lineups?sport=' + sport + '&since=' + since + '&operator=' + operator, JSON.stringify(data), {headers: this.getHeaders()})
      .map((reponse:Response) => reponse.json())
      .catch(error => {
        this.handelError(error.json());
        return Observable.throw(error.json())
      });
  }

  retrieveAdvFilterSettings(operator:string, sport:string, slateId:number):Observable<any> {
    let url = environment.api_end_point + 'api/optimizer/filter?date_exact=2017-07-09&sport=' + sport + '&operator=' + operator;
    if (slateId != 0) {
      url += '&slate_id=' + slateId;
    }
    return this.http.get(url, {headers: this.getHeaders()})
      .map((reponse:Response) => reponse.json())
      .catch(error => {
        this.handelError(error.json());
        return Observable.throw(error.json())
      });
  }

  handelError(error:any) {
    if (error.statusCode == 401) {
      this.authService.logout();
    }
  }

  applyFilters(filters:LineupOppFilterCriteria[]) {
    console.log("Filters => ", filters);
    let filteredPlayers = this.filterPlayers(filters);
    this.playersSubject.next(filteredPlayers);
  }

  filterPlayers(filters:LineupOppFilterCriteria[]):OptimizerPlayer[] {
    let players = this.players;

    filters.forEach(
      (currFilter:LineupOppFilterCriteria) => {
        switch (currFilter.filterKey) {
          case LineupOppFilterConstants.SLATE_ID:
            break;
          case LineupOppFilterConstants.PLAYER_SALARY:
            players = players.filter(
              (currPlayer:OptimizerPlayer) => {
                if (currPlayer.Salary >= currFilter.minValue && currPlayer.Salary <= currFilter.maxValue) {
                  return true;
                }
              }
            );
            break;
          case LineupOppFilterConstants.PLAYER_VALUE:
            players = players.filter(
              (currPlayer:OptimizerPlayer) => {
                if (currPlayer.Value >= currFilter.minValue && currPlayer.Value <= currFilter.maxValue) {
                  return true;
                }
              }
            );
            break;
          case LineupOppFilterConstants.PROJECTION:
            players = players.filter(
              (currPlayer:OptimizerPlayer) => {
                if (currPlayer.Points >= currFilter.minValue && currPlayer.Points <= currFilter.maxValue) {
                  return true;
                }
              }
            );
            break;
          case LineupOppFilterConstants.PLAYER_BATTING_ORDER:
            players = players.filter(
              (currPlayer:OptimizerPlayer) => {
                if (currPlayer.BattingOrder >= currFilter.minValue && currPlayer.BattingOrder <= currFilter.maxValue) {
                  return true;
                }
              }
            );
            break;
          case LineupOppFilterConstants.GAME_TYPE:
            players = players.filter(
              (currPlayer:OptimizerPlayer) => {
                if (currPlayer.GameID == currFilter.filterValue || currFilter.filterValue == 0) {
                  return true;
                }
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
