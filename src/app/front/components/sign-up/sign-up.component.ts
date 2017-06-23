import {Component} from "@angular/core";
import {AuthService} from "../../../shared/services/auth.service";
import {Router} from "@angular/router";
import {FormGroup, FormControl, Validators, AbstractControl} from "@angular/forms";
/**
 * Created by Hiren on 07-06-2017.
 */

@Component({
  selector: 'rp-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  signUpForm:FormGroup;

  username = '';
  username_error = 0;

  constructor(private authService:AuthService, private router:Router) {
    this.signUpForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      fName: new FormControl('', Validators.required),
      lName: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      conformPassword: new FormControl('', Validators.required)
    }, this.passwordValidator)
  }

  ngOnInit() {

  }

  checkUserName() {

  }

  passwordValidator(fc:FormControl) {
    let pwd1:AbstractControl = fc.get('password');
    let pwd2:AbstractControl = fc.get('confirmPassword');
    if (pwd1.dirty && pwd2.dirty && (pwd1.value != pwd2.value)) {
      return {
        passwordValidator: {
          isValid: false
        }
      }
    }
    return null;
  }
}
