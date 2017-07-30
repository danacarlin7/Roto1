import {Component, AfterViewInit} from "@angular/core";
import {FrontService} from "../../services/front.service";
/**
 * Created by Hiren on 06-06-2017.
 */

declare var jQuery:any;

@Component({
  selector: 'rp-front-home',
  templateUrl: './front-home.component.html',
  styleUrls: ['./front-home.component.css']
})
export class FrontHomeComponent implements AfterViewInit {

  twitterFeeds:Array<any>;
  facebookFeeds:Array<any>;

  constructor(private frontService:FrontService) {

  }

  ngAfterViewInit() {
    this.frontService.retrieveTwitterFeeds()
      .subscribe(
        response => {
          if (response.statusCode == 200) {
            let feeds:Array<any> = response.data.statuses;
            if (feeds && feeds.length) {
              this.twitterFeeds = feeds.splice(0, Math.min(10, feeds.length));
              console.log("tweets => ", this.twitterFeeds);
              this.renderTwitterFeeds();
            }
          }
        },
        error => {
          console.log("http error => ", error);
        }
      );

    this.frontService.retrieveFBFeeds()
      .subscribe(
        response => {
          if (response.statusCode == 200) {
            let feeds:Array<any> = response.data;
            if (feeds && feeds.length) {
              this.facebookFeeds = feeds.splice(0, Math.min(10, feeds.length));
              console.log("fb posts => ", this.facebookFeeds);
              this.renderFacebookFeeds();
            }
          }
        },
        error => {
          console.log("http error => ", error);
        }
      )
  }


  renderTwitterFeeds() {
    setTimeout(() => {
      jQuery('.socialDetailsSlider').owlCarousel({
        items: 1,
        margin: 0,
        nav: true,
        loop: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true
      });
      jQuery(".socialDetailsSlider .owl-prev").html('<img src="../../../../assets/images/social_slider_top_arow.png" alt="" />');
      jQuery(".socialDetailsSlider .owl-next").html('<img src="../../../../assets/images/social_slider_bottom_arow.png" alt="" />');
    }, 10);
  }

  renderFacebookFeeds() {
    setTimeout(() => {
      jQuery('.fbDetailsSlider').owlCarousel({
        items: 1,
        margin: 0,
        nav: true,
        loop: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true
      });
      jQuery(".socialDetailsSlider .owl-prev").html('<img src="../../../../assets/images/social_slider_top_arow.png" alt="" />');
      jQuery(".socialDetailsSlider .owl-next").html('<img src="../../../../assets/images/social_slider_bottom_arow.png" alt="" />');
    }, 10);
  }
}
