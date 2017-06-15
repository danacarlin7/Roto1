import {Component} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {AuthService} from "../../../shared/services/auth.service";
import {Router} from "@angular/router";
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

  loginForm:FormGroup;

  constructor(private authService:AuthService, private router:Router) {

  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      rememberMe: new FormControl()
    })
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

          if (response.data.role == 'admin') {
            this.router.navigate(['/admin']);
          } else if (response.data.role == 'user') {
            this.router.navigate(['/user']);
          }
        } else {
          console.log("login error => ", response);
        }
      },
      error => {
        console.log("login error => ", error);
      })
  }
}
