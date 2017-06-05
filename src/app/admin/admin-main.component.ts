import {Component} from "@angular/core";
import {AuthService} from "../shared/services/auth.service";
/**
 * Created by Hiren on 04-06-2017.
 */

@Component({
  selector: 'rp-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent {

  constructor(private authService:AuthService) {
    console.log("Admin Component => ", this.authService.counter)
  }

}
