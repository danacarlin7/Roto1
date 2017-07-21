import {Component, Output, EventEmitter} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {AuthService} from "../../../shared/services/auth.service";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {environment} from "../../../../environments/environment";
/**
 * Created by Hiren on 07-06-2017.
 */

@Component({
  selector: 'rp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  redirectUrl: String;
  msg: string;

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService, private router: Router) {
    this.activatedRoute.queryParams.subscribe(
      (param: Params) => {
        this.redirectUrl = param['redirect'];
        if (param.hasOwnProperty('info')) {
          if (param['info'] == 'pc') {
            this.msg = 'Your password is successfully updated.'
          }
        }
      }
    )
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      rememberMe: new FormControl()
    })
  }

  createCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; domain=dfsportgod.com; path=/";
  }

  readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  removeCookie(name) {
    document.cookie = name + "=; expires=" + new Date(0).toUTCString() + "; domain=dfsportgod.com; path=/";
  }


  onSignInBtnClick() {
    let data = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };
    this.authService.login(JSON.stringify(data)).subscribe(
      response => {
        if (response.statusCode == 200) {
          console.log("login successful => ", response);
          if (this.loginForm.value.rememberMe) {
            localStorage.setItem('data', JSON.stringify(response.data));
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('role', response.data.role);
          }
          else {
            sessionStorage.setItem('data', JSON.stringify(response.data));
            sessionStorage.setItem('token', response.data.token);
            sessionStorage.setItem('role', response.data.role);
          }

          environment.token = response.data.token;
          environment.role = response.data.role;
          // this.authService.userLoggedInEvent.emit(true);
          // localStorage.setItem('token', JSON.stringify(response.data));
          this.authService.userInfo().subscribe(
            user => {
              console.log("user details => ", user);
              //     localStorage.setItem('user', JSON.stringify(user.data));
              this.authService.loginWP(JSON.stringify(data)).subscribe(
                response => {
                  if (response.uid) {
                    let uid = response.uid;
                    this.removeCookie('dfs_wp_logout');
                    this.createCookie('dfs_wp_user', uid, 1);
                    this.createCookie('dfs_wp_email', user.data.email, 1);
                  } else {
                    console.log(response);
                  }
                }
              );
            }
          );


          console.log('this.redirectUrl => ', this.redirectUrl);
          if (this.redirectUrl && this.redirectUrl.length) {
            this.router.navigate([this.redirectUrl]);
            this.redirectUrl = "";
          }
          else if (response.data.role == 'admin') {
            this.router.navigate(['/admin']);
          } else if (response.data.role == 'user' || response.data.role == 'provider') {
            this.router.navigate(['/user']);
          }
        } else {
          console.log("login error => ", response);
        }
      },
      error => {
        console.log("login error => ", error);
      });
  }
}
