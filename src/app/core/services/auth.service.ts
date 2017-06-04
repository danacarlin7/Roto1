import {Register} from '../forms/register';
import {Injectable, EventEmitter, Output} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/Rx';
import {NotificationsService} from 'angular2-notifications';
import {Router} from '@angular/router';

// Interaces
import {Pages} from '../forms/pages'
import {EditPage} from '../forms/pages'
import {ContestHistory} from "../models/contest";

interface Credentials {
  email:string,
  password:string
}

interface member {
  email:string,
  first_name:string,
  last_name:string,
  password:string,
  is_memberspace:boolean
}


@Injectable()
export class AuthService {

  url = 'https://api.dfsportgod.com/api/';
  urlWithoutAuth = 'https://api.dfsportgod.com/';

  constructor(private http:Http, private _notificationsService:NotificationsService, private router:Router) {
  }

  getHeaders():Headers {
    let headers = new Headers();
    headers.append('content-type', 'application/json');
    if (localStorage.getItem('token')) {
      headers.append('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('token')).token);
    }
    return headers;
  }

  getToken():string {
    let token = "";
    if (localStorage.getItem('token')) {
      token = JSON.parse(localStorage.getItem('token')).token;
    }
    return token;
  }

  @Output() userLoggedInEvent:EventEmitter<boolean> = new EventEmitter<boolean>();
  //Without Auth
  login(data:string):Observable<any> {
    return this.http.post(this.urlWithoutAuth + 'authenticate', data, {headers: this.getHeaders()})
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()))
  }
  loginWP(data:string):Observable<any> {
    return this.http.post('http://forum.dfsportgod.com/dfsauth/nglogin/', data)
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()))
  }

  loggedIn() {
    if (localStorage.getItem('token') != null) {
      var userDetail = JSON.parse(localStorage.getItem('token'));
      if (userDetail) {
        if (userDetail.role == 'admin') {
          this.userLoggedInEvent.emit(true);
          return userDetail.token;
        }
      }
    }

  }

  logout() {
    localStorage.clear();
    window.location.href = '';
    //this.userLoggedInEvent.emit(false);
  }

  verifyToken(token) {
    return this.http.post(this.urlWithoutAuth + 'verifyToken', {token: token}).map(
      (response:Response) => {
        return response.json()
      }
    )
      .catch(error => Observable.throw(error.json()));
  }

  register(Register) {
    return this.http.post(this.urlWithoutAuth + 'signup', {
      user_name: Register.user_name,
      phone_number: Register.phone_number,
      email: Register.email,
      password: Register.password,
      first_name: Register.first_name,
      last_name: Register.last_name
    })
      .map(
        (response:Response) => {
          localStorage.setItem('token', response.json().token);
          localStorage.setItem('user', JSON.stringify(response.json()));
        }
      )
  }

  checkUserName(username) {
    return this.http.post(this.urlWithoutAuth + 'checkUsername', {
      user_name: username
    }).map( response => response.json());
  }

  registerWP(Register) {
    var data = JSON.stringify(Register);
    return this.http.post('http://forum.dfsportgod.com/dfsauth/register/', data)
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()))
  }

  userLoggedIn() {
    if (localStorage.getItem('token') === null) {
      return false
    } else {
      var userDetail = JSON.parse(localStorage.getItem('token'));
      if (userDetail) {
        this.userLoggedInEvent.emit(true);
        return userDetail.token;
      }
    }
  }

  saveMember(member) {
    return this.http.post(this.url + 'member', JSON.stringify(member), {headers: this.getHeaders()}).map(
      (response:Response) => {
        if (response.json().success == false) {
          this._notificationsService.error(
            'Error',
            response.json().msg,
            {
              timeOut: 5000,
              showProgressBar: true,
              pauseOnHover: false,
              clickToClose: false
            }
          )
        } else {
          this._notificationsService.success(
            'Success',
            response.json().msg,
            {
              timeOut: 5000,
              showProgressBar: true,
              pauseOnHover: false,
              clickToClose: false
            }
          );
          //this.router.navigate(['/admin/members']);
        }
      }
    );
  }


  verifyEmail(email) {
    return this.http.post(this.urlWithoutAuth + 'getToken', {email: email})
      .map(res => res.json())
      .catch(error => Observable.throw(error.json()));
  }

  changePassword(data) {
    return this.http.post(this.urlWithoutAuth + 'verifyToken', {
      token: data.token,
      password: data.password,
      is_tool: true
    })
      .map((response:Response) => {
        return response.json()
      })
      .catch(error => Observable.throw(error.json()));
  }

  changeMemberStatus(id) {
    return this.http.put(this.url + 'member/' + id, '', {headers: new Headers({'Authorization': 'Bearer ' + this.getToken()})}).map(
      (response:Response) => {
        return response.json()
      }
    )
  }

  /* End Without Auth */

  /*User Info */
  subscribePlan(token, plan_id) {
    return this.http.post(this.url + 'subscribe', {token, plan_id}, {headers: this.getHeaders()})
      .map((response: Response) => response.json());
  }
  unsubscribePlan(subscribe_id, at_period_end) {
    return this.http.put(this.url + 'unsubscribe/' + subscribe_id, {at_period_end: at_period_end}, {headers: this.getHeaders()})
      .map((response: Response) => response.json());
  }

  checkuser() {
    return this.http.get(this.url + 'memberinfo', {headers: new Headers({'Authorization': 'Bearer ' + localStorage.getItem('token')})}).map(
      response => {
        return response.json()
      }
    )
  }

  userInfo() {
    return this.http.get(this.url + 'memberinfo', {headers: this.getHeaders()})
      .map((response:Response) => response.json());
  }

  /*For Admin */

  getMlbTeams() {
    return this.http.get(this.url + 'mlbTeams', {headers: new Headers({'Authorization': 'Bearer ' + this.userLoggedIn()})}).map(
      (response:Response) => {
        return response.json();
      });
  }

  getMlbPlayers() {
    return this.http.get(this.url + 'mlbPlayers', {headers: new Headers({'Authorization': 'Bearer ' + this.userLoggedIn()})}).map(
      (response:Response) => {
        return response.json();
      });
  }

  getMembers() {
    return this.http.get(this.url + 'getMembers', {headers: new Headers({'Authorization': 'Bearer ' + this.getToken()})}).map(
      (response:Response) => {
        return response.json();
      });
  }


  deleteMember(id) {
    return this.http.delete(this.url + 'member/' + id, {headers: new Headers({'Authorization': 'Bearer ' + this.getToken()})}).map(
      (response:Response) => {
        console.log(response);
      }
    )
  }

  editMember(member) {
    return this.http.post(this.url + 'editMember', member, {headers: new Headers({'Authorization': 'Bearer ' + this.getToken()})}).map(
      (response:Response) => {
        console.log(response);
      }
    )
  }

  addPage(Pages) {
    return this.http.post(this.url + 'addPage', Pages, {headers: new Headers({'Authorization': 'Bearer ' + this.userLoggedIn()})}).map(
      (response:Response) => {
        this.router.navigate(['/admin/pages']);
      }
    )
  }

  getPages() {
    return this.http.get(this.url + 'getPages', {headers: new Headers({'Authorization': 'Bearer ' + this.userLoggedIn()})}).map(
      (response:Response) => {
        return response.json();
      }
    )
  }

  getPage(id) {
    return this.http.get(this.url + 'getPage/' + id, {headers: new Headers({'Authorization': 'Bearer ' + this.userLoggedIn()})}).map(
      (response:Response) => {
        return response.json();
      }
    )
  }

  editPage(EditPage) {
    return this.http.post(this.url + 'addPage', EditPage, {headers: new Headers({'Authorization': 'Bearer ' + this.userLoggedIn()})}).map(
      (response:Response) => {
        this.router.navigate(['/admin/pages']);
      }
    )
  }

  deletePage(id) {
    return this.http.post(this.url + 'deletePage', {id: id}, {headers: new Headers({'Authorization': 'Bearer ' + this.userLoggedIn()})}).map(
      (response:Response) => {
        console.log(response);
      }
    )
  }

  getcontests() {
    return this.http.get(this.url + 'contests', {headers: new Headers({'Authorization': 'Bearer ' + this.userLoggedIn()})}).map(
      (response:Response) => {
        return response.json();
      }
    )
  }

  getcontestTypes() {
    return this.http.get(this.url + 'contestsType', {headers: new Headers({'Authorization': 'Bearer ' + this.userLoggedIn()})}).map(
      (response:Response) => {
        return response.json();
      }
    )
  }

  /*ENd Admin */

  /*Bankroll*/
  getUserContests() {
    return this.http.get(this.url + 'contestsHistory', {headers: new Headers({'Authorization': 'Bearer ' + this.userLoggedIn()})}).map(
      (res:Response) => {
        return res.json();
      }
    )
  }

  uploadContests(fileList) {
    let file:File = fileList[0];
    let formData:FormData = new FormData();
    formData.append('uploadFile', file, file.name);
    return this.http.post(this.url + 'uploadContest', formData, {
      headers: new Headers({
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.userLoggedIn()
      })
    })
      .map(res => res.json());

  }

  downloadFile(contestHistory:ContestHistory) {
    return this.http.get(this.urlWithoutAuth + 'uploads/' + contestHistory.generated_name)
      .map(res => res);

  }

  getUploads() {
    return this.http.get(this.url + 'contest/history', {headers: new Headers({'Authorization': 'Bearer ' + this.getToken()})})
      .map(res => res.json());

  }

  deleteUpload(contestHistory:ContestHistory) {
    return this.http.delete(this.url + 'contest/history/' + contestHistory._id, {headers: new Headers({'Authorization': 'Bearer ' + this.getToken()})})
      .map(res => res.json());
  }


  filterContests(data) {
    return this.http.post(this.url + 'getContests', data, {headers: new Headers({'Authorization': 'Bearer ' + this.getToken()})})
      .map(res => res.json());
  }

  filterOpponents(data) {
    return this.http.post(this.url + 'getOpponents', data, {headers: new Headers({'Authorization': 'Bearer ' + this.getToken()})})
      .map(res => res.json());
  }

  release() {
    return this.http.get(this.url + 'mail', {headers: new Headers({'Authorization': 'Bearer ' + this.getToken()})})
      .map(res => res.json());
  }

  getUserEmail() {
    return JSON.parse(localStorage.getItem('user')).email;
  }

  getUserData() {
    return JSON.parse(localStorage.getItem('user'));
  }

}
