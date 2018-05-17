/* core */
import { Injectable } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

/* libs */
import { Observable, of, throwError, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

/* env */
import { environment } from "../../../environments/environment";

/* services */
import { AuthService } from "../../shared/new-services/auth.service";

/* models */

// import { AdvFilterSettings } from "../models/adv-filter-setting.model";
// import { OptimizerPlayer } from "../models/player.model";
// import { FilterCriteria } from "../../user/models/filter-criteria.model";
// import { LineupOppFilterCriteria } from "../models/filter-criteria.model";
// import { LineupOppFilterConstants } from "../constants/lineup-opp.constants";
// import { GeneratedLineupRecords } from "../models/generated-lineup.model";
// import { Slate } from "../models/slate.model";
// import { AdvFilterValue } from "../models/adv-filter-value.model";
// import { ArrayUtils } from "../../shared/utilities/ArrayUtils";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const httpOptionsCustom = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LineupService {

  // public static MLB_MIN_SALARY_FOR_DRAFT_KING: number = 30000;
  // public static MLB_MAX_SALARY_FOR_DRAFT_KING: number = 50000;
  // public static MLB_MIN_SALARY_FOR_FANDUAL: number = 20000;
  // public static MLB_MAX_SALARY_FOR_FANDUAL: number = 35000;
  // public static NFL_MIN_SALARY_FOR_DRAFT_KING: number = 25000;
  // public static NFL_MAX_SALARY_FOR_DRAFT_KING: number = 50000;
  // public static NFL_MIN_SALARY_FOR_FANDUAL: number = 30000;
  // public static NFL_MAX_SALARY_FOR_FANDUAL: number = 60000;
  // public static NBA_MIN_SALARY_FOR_DRAFT_KING: number = 25000;
  // public static NBA_MAX_SALARY_FOR_DRAFT_KING: number = 50000;
  // public static NBA_MIN_SALARY_FOR_FANDUAL: number = 30000;
  // public static NBA_MAX_SALARY_FOR_FANDUAL: number = 60000;
  //
  // searchStr: string = '';
  // selectedOperator: string = 'FanDuel';
  // selectedSport: string;
  // selectedSlate: number = 0;
  // selectedGame: number = 0;
  // filterSettings: AdvFilterSettings;
  //
  // activeSlate: Slate;
  // slates: Slate;
  //
  // players: OptimizerPlayer[];
  // playersSubject = new Subject<OptimizerPlayer[]>();
  // players$: Observable<OptimizerPlayer[]> = this.playersSubject.asObservable();
  //
  // private _generatedLineups: GeneratedLineupRecords;
  //
  // get generatedLineups(): GeneratedLineupRecords {
  //   return this._generatedLineups;
  // }
  //
  // set generatedLineups(value: GeneratedLineupRecords) {
  //   this._generatedLineups = value;
  // }

  private apiUrl;
  private appUrl;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.apiUrl = environment.api_end_point + 'api/';
    this.appUrl = environment.api_end_point;
  }

  // getPlayers(operator: string, sport: string, slateId: number, time: string = null): Observable<OptimizerPlayer[]> {
  //   return new Observable<OptimizerPlayer[]>(
  //     observer => {
  //       this.retrievePlayers(operator, sport, slateId, time)
  //         .subscribe(
  //         response => {
  //           if (response.statusCode == 200) {
  //             this.players = response.data.map(currPlayer => {
  //               if (currPlayer.BattingOrder == null) {
  //                 currPlayer.BattingOrder = 0;
  //               }
  //               if (currPlayer.Value == null) {
  //                 currPlayer.Value = 0;
  //               }
  //               return currPlayer;
  //             });
  //             this.players = ArrayUtils.sort(this.players, 'Salary', true);
  //             observer.next(this.players);
  //           }
  //         },
  //         error => {
  //           observer.error(error);
  //         },
  //         () => {
  //           observer.complete()
  //         });
  //     }
  //   ).share();
  // }
  //
  // retrieveSlates(operator: string, sport: string, time: string = null): Observable<any> {
  //   let url = this.appUrl + 'optimizer/slates?operator=' + operator + '&sport=' + sport;
  //   if (time) {
  //     url += "&" + time;
  //   }
  //
  //   return this.http.get<any>(url, httpOptions).pipe(
  //     tap((datas: any) => {}),
  //     catchError(this.handleError<any>('retrieveSlates'))
  //   );
  // }
  //
  // retrievePlayers(operator: string, sport: string, slateId: number, time: string = null): Observable < any > {
  //   let url = this.appUrl + 'optimizer/playersBySlate?sport=' + sport + '&operator=' + operator;
  //
  //   if(slateId != 0) {
  //     url += '&slate_id=' + slateId;
  //   }
  //   if (time) {
  //     url += "&" + time;
  //   }
  //   return this.http.get<any>(url, httpOptions).pipe(
  //     tap((datas: any) => {}),
  //     catchError(this.handleError<any>('retrievePlayers'))
  //   );
  // }
  //
  // generateLineups(data: any, operator: string, sport: string, time: string = null): Observable<any> {
  //   let url = this.appUrl +'optimizer/lineups?sport=' + sport + '&operator=' + operator;
  //   if (time) {
  //     url += "&" + time;
  //   }
  //   return this.http.post<any>(url, JSON.stringify(data), httpOptions).pipe(
  //     tap((datas: any) => {}),
  //     catchError(this.handleError<any>('generateLineups'))
  //   );
  // }
  //
  // retrieveAdvFilterSettings(operator: string, sport: string, slateId: number, time: string = null): Observable<any> {
  //   let url = this.appUrl + 'optimizer/filter?sport=' + sport + '&operator=' + operator;
  //   if (slateId != 0) {
  //     url += '&slate_id=' + slateId;
  //   }
  //   if (time) {
  //     url += "&" + time;
  //   }
  //   return this.http.get<any>(url, httpOptions).pipe(
  //     tap((datas: any) => {}),
  //     catchError(this.handleError<any>('retrieveAdvFilterSettings'))
  //   );
  // }
  //
  //
  // retrieveStackingData(sport: string, slateId: number, time: string = null): Observable < any > {
  //   let url = this.appUrl + 'optimizer/stacking?sport=' + sport;
  //   if(slateId != 0) {
  //     url += '&slate_id=' + slateId;
  //   }
  //       if (time) {
  //     url += "&" + time;
  //   }
  //
  //   return this.http.get<any>(url, httpOptions).pipe(
  //     tap((datas: any) => {}),
  //     catchError(this.handleError<any>('retrieveStackingData'))
  //   );
  // }
  //
  // updateAdvFilterValue(filterValue: AdvFilterValue): Observable < any > {
  //   httpOptionsCustom.headers = httpOptionsCustom.headers.set('Authorization', 'Bearer ' + this.authService.getToken());

  //   return this.http.post<any>(this.apiUrl + 'optimizer/settings', filterValue ? filterValue : [], httpOptionsCustom).pipe(
  //     tap((datas: any) => {}),
  //     catchError(this.handleError<any>('updateAdvFilterValue'))
  //   );
  // }
  //
  // retrieveSavedAdvFilterValue(): Observable <any> {
  //   httpOptionsCustom.headers = httpOptionsCustom.headers.set('Authorization', 'Bearer ' + this.authService.getToken());

  //   return this.http.post<any>(this.apiUrl + 'optimizer/settings', httpOptionsCustom).pipe(
  //     tap((datas: any) => {}),
  //     catchError(this.handleError<any>('retrieveSavedAdvFilterValue'))
  //   );
  // }
  //
  // removeAdvFilterValue() {
  //   localStorage.removeItem('advFilterValue');
  // }
  //
  // getBattingOrderByPlayerId(id: number): number {
  //   let order: number = 0;
  //   this.players.forEach(player => {
  //     if (player.PlayerID == id) {
  //       order = player.BattingOrder;
  //       return;
  //     }
  //   });
  //   return order;
  // }
  //
  // getOpponentByPlayerId(id: number): string {
  //   let opponent: string = "";
  //   this.players.forEach(player => {
  //     if (player.PlayerID == id) {
  //       opponent = player.Opponent;
  //       return;
  //     }
  //   });
  //   return opponent;
  // }
  //
  // getHomeTeamByPlayerId(id: number): string {
  //   let team: string = "";
  //   this.players.forEach(player => {
  //     if (player.PlayerID == id) {
  //       team = player.Team;
  //       return;
  //     }
  //   });
  //   return team;
  // }
  //
  // getPlayerValueByPlayerId(id: number): number {
  //   let value: number = 0;
  //   this.players.forEach(player => {
  //     if (player.PlayerID == id) {
  //       value = player.Value;
  //       return;
  //     }
  //   });
  //   return value;
  // }
  //
  // applyFilters(filters: LineupOppFilterCriteria[]) {
  //   console.log("Filters => ", filters);
  //   let filteredPlayers = this.filterPlayers(filters);
  //   this.playersSubject.next(filteredPlayers);
  // }
  //
  // filterPlayers(filters: LineupOppFilterCriteria[] = []): OptimizerPlayer[] {
  //   let players = this.players;
  //   console.log("No Filter Applied => ", players);
  //   filters.forEach(
  //     (currFilter: LineupOppFilterCriteria) => {
  //       switch (currFilter.filterKey) {
  //         case LineupOppFilterConstants.SLATE_ID:
  //           break;
  //         case LineupOppFilterConstants.PLAYER_SALARY:
  //           players = players.filter(
  //             (currPlayer: OptimizerPlayer) => {
  //               if (currPlayer.Salary >= currFilter.minValue && currPlayer.Salary <= currFilter.maxValue) {
  //                 return true;
  //               }
  //             }
  //           );
  //           console.log("Filter Player Salary => ", players);
  //           break;
  //         case LineupOppFilterConstants.PLAYER_VALUE:
  //           players = players.filter(
  //             (currPlayer: OptimizerPlayer) => {
  //               if (currPlayer.Value >= currFilter.minValue && currPlayer.Value <= currFilter.maxValue) {
  //                 return true;
  //               }
  //             }
  //           );
  //           console.log("Filter Player Value => ", players);
  //           break;
  //         case LineupOppFilterConstants.PROJECTION:
  //           players = players.filter(
  //             (currPlayer: OptimizerPlayer) => {
  //               if (currPlayer.Points >= currFilter.minValue && currPlayer.Points <= currFilter.maxValue) {
  //                 return true;
  //               }
  //             }
  //           );
  //           console.log("Filter Player Projection => ", players);
  //           break;
  //         case LineupOppFilterConstants.PLAYER_BATTING_ORDER:
  //           players = players.filter(
  //             (currPlayer: OptimizerPlayer) => {
  //               if (currPlayer.BattingOrder >= currFilter.minValue && currPlayer.BattingOrder <= currFilter.maxValue) {
  //                 return true;
  //               }
  //             }
  //           );
  //           console.log("Filter Player Batting Order => ", players);
  //           break;
  //         case LineupOppFilterConstants.PLAYER_POSITION:
  //           players = players.filter(
  //             (currPlayer: OptimizerPlayer) => {
  //               let isPlayerHasMatchedPosition: boolean = false;
  //               for (let i = 0; i < currFilter.filterValue.length; i++) {
  //                 let currValue = currFilter.filterValue[i];
  //                 if ((currPlayer.Position + '').toLowerCase() == currValue.toLowerCase()) {
  //                   isPlayerHasMatchedPosition = true;
  //                   break;
  //                 }
  //               }
  //               return isPlayerHasMatchedPosition;
  //             }
  //           );
  //           console.log("Filter Player Position => ", players);
  //           break;
  //         case LineupOppFilterConstants.GAME_TYPE:
  //           players = players.filter(
  //             (currPlayer: OptimizerPlayer) => {
  //               let isPlayerInSlate: boolean = false;
  //               for (let i = 0; i < currFilter.filterValue.length; i++) {
  //                 let currValue = currFilter.filterValue[i];
  //                 if (currPlayer.GameID == currValue) {
  //                   isPlayerInSlate = true;
  //                   break;
  //                 }
  //               }
  //               return isPlayerInSlate;
  //             }
  //           );
  //           console.log("Filter Player Game Type => ", players);
  //           break;
  //         default:
  //           break;
  //       }
  //     }
  //   );
  //   return players;
  // }

  private handleError<T>(operation = 'operation', RootObject?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      if (error.error.statusCode == 401) {
        this.authService.logout();
      }else if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(`Backend returned code ${error.status}`);
        // `body was: ${error.error.message}`);
        this.log(error.error);
      }
      // return an observable with a user-facing error message
      return throwError(error.error);
    };
  };
  /** Log a HeroService message with the MessageService */
  private log(message: any) {
    console.table(message);
    // this.messageService.add('api service: ' + message);
  }
}
