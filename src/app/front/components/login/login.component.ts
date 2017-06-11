import {Component} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {AuthService} from "../../../shared/services/auth.service";
import {Router} from "@angular/router";
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
      password: new FormControl('', Validators.required)
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
          localStorage.setItem('token', JSON.stringify(response.data));
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
