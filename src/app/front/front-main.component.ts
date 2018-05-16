/* core */
import { Component } from "@angular/core";
import { Router } from "@angular/router";

/* variables */
declare var jQuery: any;

@Component({
  selector: "rp-front-main",
  templateUrl: "./front-main.component.html",
  styleUrls: ["./front-main.component.css"]
})
export class FrontMainComponent {

  constructor(private router: Router) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.updateScrollTopBtnPos()
    }, 500);
    jQuery(window).scroll(() => {
      this.updateScrollTopBtnPos();
    });
    jQuery(".scroll-top-btn").click(() => {
      let body = jQuery("html, body");
      body.stop().animate({ scrollTop: 0 }, 500, "swing");
    });
  }

  updateScrollTopBtnPos() {
    let btnRef = jQuery(".scroll-top-btn");
    if (jQuery(window).scrollTop() > 100) {
      btnRef.addClass("active");
    } else {
      btnRef.removeClass("active");
    }
  }

  onUserModuleClick() {
    this.router.navigate(["/user"]);
  }

  onAdminModuleClick() {
    this.router.navigate(["/admin"]);
  }
}
