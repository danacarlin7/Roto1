import {Component} from "@angular/core";
import {AuthService} from "../../../shared/services/auth.service";
/**
 * Created by Hiren on 05-06-2017.
 */

@Component({
  selector: 'rp-front-header',
  templateUrl: './front-header.component.html',
  styleUrls: ['./front-header.component.css']
})
export class FrontHeaderComponent {

  isLoggedIn:boolean;

  constructor(private authService:AuthService) {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

}
