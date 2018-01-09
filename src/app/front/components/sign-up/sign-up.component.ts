import {Component, ViewChild, ElementRef, Renderer2} from "@angular/core";
import {AuthService} from "../../../shared/services/auth.service";
import {Router} from "@angular/router";
import {FormGroup, FormControl, Validators, AbstractControl} from "@angular/forms";
import {UserDashboardServices} from "../../../user/services/user-dashboard.service";
import {environment} from "../../../../environments/environment";
import {FrontService} from "../../services/front.service";
/**
 * Created by Hiren on 07-06-2017.
 */

@Component({
  selector: 'rp-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  signUpForm: FormGroup;
  signUpErrors: string;
  username = '';
  username_error = 0;
  isUserExist: number = 0;
  checkingUserName: boolean;

  @ViewChild('signUpError') signUpErrorRef: ElementRef;

  constructor(
    private authService: AuthService,
    private router: Router,
    private renderer: Renderer2,
    private dashboardService: UserDashboardServices,
    private frontService: FrontService
  ) {
    this.signUpForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      fName: new FormControl('', Validators.required),
      lName: new FormControl('', Validators.required),
      phone: new FormControl(''),
      email: new FormControl('', [Validators.required, this.mailFormat]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
      tnc: new FormControl('', Validators.required)
    }, this.passwordValidator)
  }

  ngOnInit() {

  }


  onTxtUserNameBlur() {
    if (this.username == this.signUpForm.value['userName']) {
      console.log('usrname => ', this.username);
      console.log('usrname2 => ', this.signUpForm.value['userName']);
      return;
    }
    this.username = this.signUpForm.value['userName'];
    if (this.username && this.username.trim().length) {
      this.checkUserName(this.username);
    } else {
      this.isUserExist = 0;
    }
  }

  checkUserName(name:string) {
    this.checkingUserName = true;
    this.dashboardService.checkUserName(name)
      .subscribe(
        response => {
          this.checkingUserName = false;
          if (response.statusCode == 200) {
            if (response.data) {
              this.isUserExist = 2;
            } else {
              this.isUserExist = 1;
            }
          }
        },
        error => {
          this.checkingUserName = false;
          console.log('username check error => ', error);
        }
      )
  }

  mailFormat(control:AbstractControl) {

    const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    if (control.value != '' && (control.value.length <= 5 || !EMAIL_REGEXP.test(control.value))) {
      return {'incorrectMailFormat': true};
    }

    return null;
  }

  passwordValidator(fc: AbstractControl) {
    const pwd1: AbstractControl = fc.get('password');
    const pwd2: AbstractControl = fc.get('confirmPassword');
    if (pwd1.dirty && pwd2.dirty && (pwd1.value != pwd2.value)) {
      return {
        passwordValidator: {
          isValid: false
        }
      }
    }
    return null;
  }

  onBtnSignUpClicked() {
    const formValue = this.signUpForm.value;
    const data = {
      user_name: formValue.userName,
      phone_number: formValue.phone,
      email: formValue.email.toLowerCase(),
      password: formValue.password,
      first_name: formValue.fName,
      last_name: formValue.lName
    };
    console.log(data);

    this.authService.registerNewUser(data)
      .subscribe(
        response => {
          if (response.statusCode == 200) {
            console.log('sign up successful => ', response);
            this.authService.registerWP(JSON.stringify(data)).subscribe(
              success => {
                console.log('WP user registered.');
              },
              error => {
                console.log('WP Error => ', error);
              }
            );
            this.router.navigate(['/login'],{queryParams:{info:'signup_success'}});
          }
        },
        error => {
          this.signUpErrors = error.message;
          this.signUpErrorRef.nativeElement.scrollIntoView();
          console.log("sign up error => ", error);
        })
  }
}
