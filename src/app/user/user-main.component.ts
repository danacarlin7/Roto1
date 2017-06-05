import {Component} from "@angular/core";
import {AuthService} from "../shared/services/auth.service";
/**
 * Created by Hiren on 04-06-2017.
 */

@Component({
  selector: 'rp-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.css']
})
export class UserMainComponent {

  constructor(private authService:AuthService) {
    console.log("User Component => ", this.authService.counter);
  }

}
