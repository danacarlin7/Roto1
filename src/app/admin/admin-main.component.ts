import {Component, ViewEncapsulation} from "@angular/core";
import {CustomAuthService} from "../shared/services/auth.service";
/**
 * Created by Hiren on 04-06-2017.
 */

@Component({
  selector: 'rp-admin-main',
  templateUrl: './admin-main.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./admin-main.component.css', '../../assets/css/green.css', '../../assets/css/modern.css']
})
export class AdminMainComponent {

  constructor(private authService:CustomAuthService) {

  }

}
