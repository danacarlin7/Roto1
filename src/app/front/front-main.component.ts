import {Component} from "@angular/core";
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";
/**
 * Created by Hiren on 04-06-2017.
 */

@Component({
  selector: 'rp-front-main',
  templateUrl: './front-main.component.html',
  styleUrls: ['./front-main.component.css']
})
export class FrontMainComponent {

  constructor(private authService:AuthService, private router:Router) {
    console.log("Front Component => ", this.authService.counter)
  }

  onUserModuleClick() {
    this.router.navigate(['/user']);
  }

  onAdminModuleClick() {
    this.router.navigate(['/admin']);
  }
}
