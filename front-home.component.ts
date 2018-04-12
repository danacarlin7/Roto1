import { Component, AfterViewInit, OnInit, ViewEncapsulation } from "@angular/core";
import {FrontService} from "../../services/front.service";
import {ArticleService} from "../../services/article.service";
import { ActivatedRoute, Router } from "@angular/router";
import {AuthService} from "../../../shared/services/auth.service";
import {News} from "../../models/news.model";

/**
 * Created by Hiren on 06-06-2017.
 */

declare var jQuery: any;

@Component({
  selector: "rp-front-home",
  templateUrl: "./front-home.component.html",
  styleUrls: ["./front-home.component.css"]//,
  // encapsulation: ViewEncapsulation.Emulated
})
export class FrontHomeComponent implements AfterViewInit, OnInit {
  redirected: boolean;
  redirectMessage: String;

  twitterFeeds: Array<any>;
  facebookFeeds: Array<any>;
  instagramFeeds: Array<any>;

  footballArticles: any[];
  basketballArticles: any[];
  baseballArticles: any[];
  hockeyArticles: any[];
  soccerArticles: any[];
  golfArticles: any[];
  mmaArticles: any[];
  nascarArticles: any[];
  media: Object = {};

  constructor(private frontService: FrontService,
              private articleService: ArticleService,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    console.log(this.route.snapshot);
    if (this.route.snapshot.params["redirected"]) {
      this.redirected = this.route.snapshot.params["redirected"];
      this.redirectMessage = this.route.snapshot.params["redirectMessage"];
      window.scrollTo(0, 0);
    }
  }

  ngAfterViewInit() {
    this.frontService.retrieveTwitterFeeds()
      .subscribe(
        response => {
          if (response.statusCode == 200) {
            console.log(response.data);
            const feeds: Array<any> = response.data;
            if (feeds && feeds.length) {
              this.twitterFeeds = feeds.splice(0, Math.min(5, feeds.length));
              console.log("tweets => ", this.twitterFeeds);
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
            const feeds: Array<any> = response.data;
            if (feeds && feeds.length) {
              this.facebookFeeds = feeds.splice(0, Math.min(5, feeds.length));
              console.log("fb posts => ", this.facebookFeeds);
            }
          }
        },
        error => {
          console.log("http error => ", error);
        }
      );

    this.frontService.retrieveInstaFeeds()
      .subscribe(
        response => {
          if (response.statusCode == 200) {
            const feeds: Array<any> = response.data.data;
            if (feeds && feeds.length) {
              this.instagramFeeds = feeds.splice(0, Math.min(5, feeds.length));
              console.log("instagram posts => ", this.instagramFeeds);
            }
          }
        },
        error => {
          console.log("http error => ", error);
        }
      );


    this.retrieveBaseballArticles();
    this.retrieveBasketBallArticles();
    this.retrieveFootballArticles();
    this.retrieveHockeyArticles();
    this.retrieveSoccerArticles();
    this.retrieveGolfArticles();
    this.retrieveMmaArticles();
    this.retrieveNascarArticles();
    this.retrieveNews();
  }


  renderBaseballArticles() {
    setTimeout(() => {
      jQuery(".midSlider1").owlCarousel({
        items: 1,
        margin: 20,
        nav: false,
        loop: false,
        autoplay: false,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        responsive: {
          0: {
            items: 1
          },
          600: {
            items: 1
          }
        }
      });

      jQuery(".midSlider1 .owl-prev").html("<i class=\"icnWrapperS\"><img src=\"../../../../assets/images/blkArowLft.png\" alt=\"\" class=\"img-responsive\"></i><span>Previous</span>");
      jQuery(".midSlider1 .owl-next").html("<i class=\"icnWrapperS\">Next</i><span><img src=\"../../../../assets/images/blkArow.png\" alt=\"\" class=\"img-responsive\"></span>");
    }, 10);
  }

  renderBasketballArticles() {
    setTimeout(() => {
      jQuery(".midSlider1").owlCarousel({
        items: 1,
        margin: 20,
        nav: false,
        loop: false,
        autoplay: false,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        responsive: {
          0: {
            items: 1
          },
          600: {
            items: 1
          }
        }
      });

      jQuery(".midSlider1 .owl-prev").html("<i class=\"icnWrapperS\"><img src=\"../../../../assets/images/blkArowLft.png\" alt=\"\" class=\"img-responsive\"></i><span>Previous</span>");
      jQuery(".midSlider1 .owl-next").html("<i class=\"icnWrapperS\">Next</i><span><img src=\"../../../../assets/images/blkArow.png\" alt=\"\" class=\"img-responsive\"></span>");
    }, 10);
  }

  renderFootballArticles() {
    setTimeout(() => {
      jQuery(".midSlider1").owlCarousel({
        items: 1,
        margin: 20,
        nav: false,
        loop: false,
        autoplay: false,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        responsive: {
          0: {
            items: 1
          },
          600: {
            items: 1
          }
        }
      });

      jQuery(".midSlider1 .owl-prev").html("<i class=\"icnWrapperS\"><img src=\"../../../../assets/images/blkArowLft.png\" alt=\"\" class=\"img-responsive\"></i><span>Previous</span>");
      jQuery(".midSlider1 .owl-next").html("<i class=\"icnWrapperS\">Next</i><span><img src=\"../../../../assets/images/blkArow.png\" alt=\"\" class=\"img-responsive\"></span>");
    }, 10);
  }

  renderHockeyArticles() {
    setTimeout(() => {
      jQuery(".midSlider1").owlCarousel({
        items: 1,
        margin: 20,
        nav: false,
        loop: false,
        autoplay: false,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        responsive: {
          0: {
            items: 1
          },
          600: {
            items: 1
          }
        }
      });

      jQuery(".midSlider1 .owl-prev").html("<i class=\"icnWrapperS\"><img src=\"../../../../assets/images/blkArowLft.png\" alt=\"\" class=\"img-responsive\"></i><span>Previous</span>");
      jQuery(".midSlider1 .owl-next").html("<i class=\"icnWrapperS\">Next</i><span><img src=\"../../../../assets/images/blkArow.png\" alt=\"\" class=\"img-responsive\"></span>");
    }, 10);
  }
  renderSoccerArticles() {
    setTimeout(() => {
      jQuery(".midSlider1").owlCarousel({
        items: 1,
        margin: 20,
        nav: false,
        loop: false,
        autoplay: false,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        responsive: {
          0: {
            items: 1
          },
          600: {
            items: 1
          }
        }
      });

      jQuery(".midSlider1 .owl-prev").html("<i class=\"icnWrapperS\"><img src=\"../../../../assets/images/blkArowLft.png\" alt=\"\" class=\"img-responsive\"></i><span>Previous</span>");
      jQuery(".midSlider1 .owl-next").html("<i class=\"icnWrapperS\">Next</i><span><img src=\"../../../../assets/images/blkArow.png\" alt=\"\" class=\"img-responsive\"></span>");
    }, 10);
  }
  renderGolfArticles() {
    setTimeout(() => {
      jQuery(".midSlider1").owlCarousel({
        items: 1,
        margin: 20,
        nav: false,
        loop: false,
        autoplay: false,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        responsive: {
          0: {
            items: 1
          },
          600: {
            items: 1
          }
        }
      });

      jQuery(".midSlider1 .owl-prev").html("<i class=\"icnWrapperS\"><img src=\"../../../../assets/images/blkArowLft.png\" alt=\"\" class=\"img-responsive\"></i><span>Previous</span>");
      jQuery(".midSlider1 .owl-next").html("<i class=\"icnWrapperS\">Next</i><span><img src=\"../../../../assets/images/blkArow.png\" alt=\"\" class=\"img-responsive\"></span>");
    }, 10);
  }
  renderMmaArticles() {
    setTimeout(() => {
      jQuery(".midSlider1").owlCarousel({
        items: 1,
        margin: 20,
        nav: true,
        loop: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        responsive: {
          0: {
            items: 1
          },
          600: {
            items: 1
          }
        }
      });

      jQuery(".midSlider1 .owl-prev").html("<i class=\"icnWrapperS\"><img src=\"../../../../assets/images/blkArowLft.png\" alt=\"\" class=\"img-responsive\"></i><span>Previous</span>");
      jQuery(".midSlider1 .owl-next").html("<i class=\"icnWrapperS\">Next</i><span><img src=\"../../../../assets/images/blkArow.png\" alt=\"\" class=\"img-responsive\"></span>");
    }, 10);
  }
  renderNascarArticles() {
    setTimeout(() => {
      jQuery(".midSlider1").owlCarousel({
        items: 1,
        margin:20,
        responsive: {
          0: {
            items: 1
          },
          600: {
            items: 1
          }
        }
      });

      jQuery(".midSlider1 .owl-prev").html("<i class=\"icnWrapperS\"><img src=\"../../../../assets/images/blkArowLft.png\" alt=\"\" class=\"img-responsive\"></i><span>Previous</span>");
      jQuery(".midSlider1 .owl-next").html("<i class=\"icnWrapperS\">Next</i><span><img src=\"../../../../assets/images/blkArow.png\" alt=\"\" class=\"img-responsive\"></span>");
    }, 10);
  }

  retrieveBaseballArticles() {
    this.getArticlesByGameId(17);
  }

  retrieveBasketBallArticles() {
    this.getArticlesByGameId(19);
  }

  retrieveFootballArticles() {
    this.getArticlesByGameId(16);
  }
  retrieveHockeyArticles() {
    this.getArticlesByGameId(18);
  }
  retrieveGolfArticles() {
    this.getArticlesByGameId(21);
  }
  retrieveSoccerArticles() {
    this.getArticlesByGameId(20);
  }
  retrieveMmaArticles() {
    this.getArticlesByGameId(4137);
  }
  retrieveNascarArticles() {
    this.getArticlesByGameId(22);
  }

  getArticlesByGameId(id: any) {
    const catid = id;
    const articlesList = [];
    this.articleService.fetchPosts({categories: catid, per_page: 1, offset: 1}).subscribe(
      posts => {
        const mid = [];
        for (let j = 0; j < posts.length; j++) {
          posts[j].extract = this.encodeHtml(posts[j].excerpt.rendered);
          if (posts[j].featured_media)
            mid.push(posts[j].featured_media);
          articlesList.push(posts[j]);
        }

        if (id == 17) {
          this.baseballArticles = articlesList;
          this.renderBaseballArticles();
          console.log("baseballArticles => ", this.baseballArticles);
        }
        if (id == 18) {
          this.hockeyArticles = articlesList;
          this.renderHockeyArticles();
          console.log("hockeyArticles => ", this.hockeyArticles);
        }
        if (id == 19) {
          this.basketballArticles = articlesList;
          this.renderBasketballArticles();
          console.log("basketballArticles => ", this.basketballArticles);
        }
        if (id == 16) {
          this.footballArticles = articlesList;
          this.renderFootballArticles();
          console.log("footballArticles => ", this.footballArticles);
        }
        if (id == 20) {
          this.soccerArticles = articlesList;
          this.renderSoccerArticles();
          console.log("soccerArticles => ", this.soccerArticles);
        }
        if (id == 21) {
          this.golfArticles = articlesList;
          this.renderGolfArticles();
          console.log("golfArticles => ", this.golfArticles);
        }
        if (id == 4137) {
          this.mmaArticles = articlesList;
          this.renderMmaArticles();
          console.log("mmaArticles => ", this.mmaArticles);
        }
        if (id == 22) {
          this.nascarArticles = articlesList;
          this.renderNascarArticles();
          console.log("nascarArticles => ", this.nascarArticles);
        }

        const mids = mid.join(",");
        if (mids) {
          this.articleService.fetchMedia({include: mids}).subscribe(
            images => {
              for (let k = 0; k < images.length; k++) {
                const image = images[k];
                this.media[image.id] = image.source_url;
              }
            }
          );
        }
      }
    );
  }



  encodeHtml(extract: string) {
    extract = extract.replace(/<[^>]+>/gm, "");
    const txt = document.createElement("textarea");
    txt.innerHTML = extract;
    extract = txt.value;
    if (extract.length > 250)
      extract = extract.substring(0, 250) + " ...";
    return extract;
  }

  findMedia(id: number) {
    if (!id || !this.media) return false;
    return this.media[id];
  }

  navigateToArticles(id) {
    this.router.navigate(["/articles"], {queryParams: {tab: id}});
  }

  activeSingle: any;

  switchToSingle(post) {
    this.activeSingle = post;
  }

  allNewsRecords: News[] = [];

  retrieveNews() {
   /* this.frontService.retrieveHomepageNews()
      .subscribe(
        response => {
          if (response.statusCode == 200) {
            let data:Array<any> = response.data;
            let tempNews = data.map(currData => currData['news'][0]);
            this.allNewsRecords = tempNews.slice(0, Math.max(this.allNewsRecords.length, 5));
            //this.renderNews();
          } else {
            console.log('response error => ', response);
          }
        },
        error => {
          console.log('http error => ', error);
        }
      )*/
    this.articleService.fetchPosts({categories: 4367, per_page: 5, offset: 0}).subscribe(
      posts => {
        this.allNewsRecords = [];
        const mid = [];
        for (let j = 0; j < posts.length; j++) {
          posts[j].extract = this.encodeHtml(posts[j].excerpt.rendered);
          if (posts[j].featured_media)
            mid.push(posts[j].featured_media);
          this.allNewsRecords.push(posts[j]);
        }
        const mids = mid.join(",");
        if (mids) {
          this.articleService.fetchMedia({include: mids}).subscribe(
            images => {
              for (let k = 0; k < images.length; k++) {
                const image = images[k];
                this.media[image.id] = image.source_url;
              }
            }
          );
        }
      }
    );
  }


  renderNews() {
    setTimeout(() => {
      jQuery(".nSlider1").owlCarousel({
        items: 1,
        margin: 0,
        nav: true,
        loop: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true
      });

      jQuery(".nSlider1 .owl-prev").html("<i class=\"icnWrapperS\"><img src=\"../../../../assets/images/blkArowLft.png\" alt=\"\" class=\"img-responsive\"></i><span>Previous</span>");
      jQuery(".nSlider1 .owl-next").html("<i class=\"icnWrapperS\">Next</i><span><img src=\"../../../../assets/images/blkArow.png\" alt=\"\" class=\"img-responsive\"></span>");
    }, 10);
  }
  scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.getElementById("myBtn").style.display = "block";
    } else {
      document.getElementById("myBtn").style.display = "none";
    }

  }

// When the user clicks on the button, scroll to the top of the document
  topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

}
