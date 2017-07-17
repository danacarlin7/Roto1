import {Component} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
/**
 * Created by Hiren on 15-07-2017.
 */

@Component({
  selector: 'rp-verify-token',
  template: `<h2>redirecting....</h2>`
})
export class VerifyTokenComponent {

  token:string;

  constructor(private router:Router, private activatedRoute:ActivatedRoute) {

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      param => {
        this.token = param['token'];
        let checkNoPassword = this.token.split('_');
        if (checkNoPassword[0] == 'pass') {
          this.router.navigate([checkNoPassword[1] + '/change-password']);
        } else {
          /*this.services.verifyToken(this.token).subscribe(
            success => {
              this.router.navigate(['/login', {'token': 'abcs'}]);
            },
            error => {
              console.log("http error => ", error);
            }
          )*/
        }
      }
    )
  }

}
