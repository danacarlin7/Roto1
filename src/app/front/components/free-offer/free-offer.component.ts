import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {FrontService} from "../../services/front.service";
import {AuthService} from "../../../shared/services/auth.service";
@Component({
  selector: 'app-free-offer',
  templateUrl: './free-offer.component.html',
  styleUrls: ['./free-offer.component.css']
})
export class FreeOfferComponent {

  constructor(private router: Router, private frontService: FrontService, private authService: AuthService) { }

  onBtnSubscribeClick() {
    this.router.navigate(["/signup"]);
  }

}
