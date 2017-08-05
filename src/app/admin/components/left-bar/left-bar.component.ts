import {Component, Output, EventEmitter, ElementRef} from "@angular/core";
import {CustomAuthService} from "../../../shared/services/auth.service";
/**
 * Created by Hiren on 23-06-2017.
 */

declare var jQuery:any;

@Component({
  selector: 'left-bar',
  templateUrl: './left-bar.component.html',
  styleUrls: ['./left-bar.component.css']
})
export class LeftbarComponent {
  @Output() checkAdmin:EventEmitter<any> = new EventEmitter();

  constructor(private element:ElementRef, private authService:CustomAuthService) {

  }

  ngOnInit() {
    jQuery('.sidebar .accordion-menu li .sub-menu').slideUp(0);
    jQuery(this.element.nativeElement).find('.accordion-menu .droplink > a').on('click', (e) => {
      jQuery(e).addClass('hello')
    });
    jQuery('.waves-effect.waves-button').click(function (e) {
    });
  }

  collapseMenu() {
    //console.log(jQuery(this).addClass('hello'));
    jQuery(this).addClass('hello')

  }
}
