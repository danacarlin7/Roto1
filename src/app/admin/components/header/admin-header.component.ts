import {Component} from "@angular/core";
import {CustomAuthService} from "../../../shared/services/auth.service";
/**
 * Created by Hiren on 23-06-2017.
 */

@Component({
  selector: 'admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent {
  constructor(private authService:CustomAuthService) {
  }

  isReleasePopupVisible:boolean;

  ngOnInit() {
  }

  onReleaseOptionClicked() {
    this.isReleasePopupVisible = true;
  }

  release() {
  }

  releaseResponseClicked(choice:boolean) {
    if (choice) {
      console.log("choice", choice);
      this.release();
    }
    else {
      console.log("choice", choice);
    }
    this.isReleasePopupVisible = false;
  }

  logoutUser() {
    this.authService.logout();
  }
}
