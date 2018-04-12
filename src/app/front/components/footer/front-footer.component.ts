import {Component, ViewEncapsulation} from "@angular/core";

/**
 * Created by Hiren on 05-06-2017.
 */


@Component({
  selector: 'rp-front-footer',
  templateUrl: './front-footer.component.html',
  styleUrls: ['./front-footer.component.css']
})
export class FrontFooterComponent {
  // 02/21/2018 IG - This variable will hold current year for auto update copyright year
  currYear = Date.now();
}