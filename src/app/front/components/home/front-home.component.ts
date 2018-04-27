import {Component, AfterViewInit, OnInit} from "@angular/core";
import {FrontService} from "../../services/front.service";
import {ArticleService} from "../../services/article.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../shared/services/auth.service";
import {News} from "../../models/news.model";

/**
 * Created by Hiren on 06-06-2017.
 */

declare var jQuery: any;

@Component({
  selector: "rp-front-home",
  templateUrl: "./front-home.component.html",
  styleUrls: ["./front-home.component.css"]
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
  mmaArticles: any[];
  golfArticles: any[];
  nascarArticles: any[];
  nhlArticles: any[];
  soccerArticles: any[];
  media: Object = {};

  activeSingle: any;
  isStatus: any;
  isSubscribeError: any;
  isLoginError: any;

  constructor(private frontService: FrontService,
              private articleService: ArticleService,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    console.log(this.route.snapshot);
    if (this.route.snapshot.params["redirected"]) {
      this.redirected = this.route.snapshot.params["redirected"];
      this.redirectMessage = this.route.snapshot.params["redirectMessage"];
    }
  }

  ngAfterViewInit() {
    // console.log("here i am");
    this.retrieveSocialFeeds();
    this.retrieveBaseballArticles();
    this.retrieveBasketBallArticles();
    this.retrieveFootballArticles();
    this.retrieveNHLArticles();
    this.retrieveMMAArticles();
    this.retrieveGolfArticles();
    this.retrieveNascarArticles();
    this.retrieveSoccerArticles();
    this.retrieveNews();
    if (jQuery(window).width() > 767) {
      this.initSocialFeed();
      this.initNewsFeed();
    }
    setInterval(() => {
      this.retrieveSocialFeeds();
    }, 60000)
  }

  retrieveSocialFeeds() {
    this.frontService.retrieveTwitterFeeds()
      .subscribe(
        response => {
          if (response.statusCode == 200) {
            console.log(response.data);
            let feeds: Array<any> = response.data;
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
            let feeds: Array<any> = response.data;
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
            let feeds: Array<any> = response.data.data;
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
  }


  renderBaseballArticles() {
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
            items: 2
          }
        }
      });

      jQuery(".midSlider1 .owl-prev").html("<i class=\"icnWrapperS\"><img src=\"../../../../assets/images/blkArowLft.png\" alt=\"\" class=\"img-responsive\"></i><span>Previous</span>");
      jQuery(".midSlider1 .owl-next").html("<i class=\"icnWrapperS\">Next</i><span><img src=\"../../../../assets/images/blkArow.png\" alt=\"\" class=\"img-responsive\"></span>");
    }, 10);
  }

  renderBasketballArticles() {
    setTimeout(() => {
      jQuery(".midSlider3").owlCarousel({
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
            items: 2
          }
        }
      });

      jQuery(".midSlider3 .owl-prev").html("<i class=\"icnWrapperS\"><img src=\"../../../../assets/images/blkArowLft.png\" alt=\"\" class=\"img-responsive\"></i><span>Previous</span>");
      jQuery(".midSlider3 .owl-next").html("<i class=\"icnWrapperS\">Next</i><span><img src=\"../../../../assets/images/blkArow.png\" alt=\"\" class=\"img-responsive\"></span>");
    }, 10);
  }

  renderFootballArticles() {
    setTimeout(() => {
      jQuery(".midSlider2").owlCarousel({
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
            items: 2
          }
        }
      });

      jQuery(".midSlider2 .owl-prev").html("<i class=\"icnWrapperS\"><img src=\"../../../../assets/images/blkArowLft.png\" alt=\"\" class=\"img-responsive\"></i><span>Previous</span>");
      jQuery(".midSlider2 .owl-next").html("<i class=\"icnWrapperS\">Next</i><span><img src=\"../../../../assets/images/blkArow.png\" alt=\"\" class=\"img-responsive\"></span>");
    }, 10);
  }

  retrieveBaseballArticles() {
    this.getArticlesByGameId(17);
  }

  retrieveMMAArticles() {
    this.getArticlesByGameId(4137);
  }

  retrieveGolfArticles() {
    this.getArticlesByGameId(21);
  }

  retrieveNascarArticles() {
    this.getArticlesByGameId(22);
  }
  // 4137

  retrieveBasketBallArticles() {
    this.getArticlesByGameId(19);
  }

  retrieveFootballArticles() {
    this.getArticlesByGameId(16);
  }

  retrieveNHLArticles() {
    this.getArticlesByGameId(18);
  }

  retrieveSoccerArticles(){
    this.getArticlesByGameId(20);
  }

  getArticlesByGameId(id: any) {
    let catid = id;
    let articlesList = [];
    this.articleService.fetchPosts({categories: catid, per_page: 5, offset: 0}).subscribe(
      posts => {
        let mid = [];
        for (let j = 0; j < posts.length; j++) {
          posts[j].extract = this.encodeHtml(posts[j].excerpt.rendered);
          if (posts[j].featured_media)
            mid.push(posts[j].featured_media);
          articlesList.push(posts[j]);
        }

        if (id == 17) {
          this.baseballArticles = articlesList;
          //this.renderBaseballArticles();
          console.log("baseballArticles => ", this.baseballArticles);
        }
        if (id == 19) {
          this.basketballArticles = articlesList;
          //this.renderBasketballArticles();
          console.log("basketballArticles => ", this.basketballArticles);
        }
        if (id == 16) {
          this.footballArticles = articlesList;
          //this.renderFootballArticles();
          console.log("footballArticles => ", this.footballArticles);
        }
        if (id == 18) {
          this.nhlArticles = articlesList;
          //this.renderFootballArticles();
          console.log("nhlArticles => ", this.nhlArticles);
        }
        if (id == 4137) {
          this.mmaArticles = articlesList;
          //this.renderFootballArticles();
          console.log("mmaArticles => ", this.mmaArticles);
        }
        if (id == 22) {
          this.nascarArticles = articlesList;
          //this.renderFootballArticles();
        }
        if (id == 21) {
          this.golfArticles = articlesList;
          //this.renderFootballArticles();
          console.log("golfArticles => ", this.golfArticles);
        }
        if (id == 20) {
          this.soccerArticles = articlesList;
          console.log("soccerArticles => ", this.soccerArticles);
        }
        let mids = mid.join(",");
        if (mids) {
          this.articleService.fetchMedia({include: mids}).subscribe(
            images => {
              for (let k = 0; k < images.length; k++) {
                let image = images[k];
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
    let txt = document.createElement("textarea");
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

  switchToSingle(post, isArticle) {
    if (isArticle) {
      if (!this.authService.isLoggedIn()) {
        this.isStatus = false;
        this.isLoginError = true;
        this.isSubscribeError = false;
      } else if (this.authService.isLoggedIn() && this.authService.isSubscriber(true)) {
        this.isStatus = true;
        this.isLoginError = false;
        this.isSubscribeError = false;
      } else {
        this.isStatus = false;
        this.isLoginError = false;
        this.isSubscribeError = true;
      }
    } else {
      this.isStatus = true;
      this.isLoginError = false;
      this.isSubscribeError = false;
    }
    console.log(this.isStatus);
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
    this.articleService.fetchPosts({categories: 4367, per_page: 10, offset: 0}).subscribe(
      posts => {
        this.allNewsRecords = [];
        let mid = [];
        for (let j = 0; j < posts.length; j++) {
          posts[j].extract = this.encodeHtml(posts[j].excerpt.rendered);
          if (posts[j].featured_media)
            mid.push(posts[j].featured_media);
          this.allNewsRecords.push(posts[j]);
        }
        let mids = mid.join(",");
        if (mids) {
          this.articleService.fetchMedia({include: mids}).subscribe(
            images => {
              for (let k = 0; k < images.length; k++) {
                let image = images[k];
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

  initSocialFeed() {
    // console.log('initSocialFeed')
    let sfDivRef = jQuery(".indexNPrt2Rght");
    let footerRef = jQuery("#footer");
    let sfTop = sfDivRef.offset().top;
    let footerTop = footerRef.offset().top;
    console.log(sfDivRef, footerRef, sfTop, footerTop);
    setTimeout(() => {
      this.updateSFDivPos(sfDivRef, footerRef, sfTop, footerTop);
    }, 1000);
    jQuery(window).scroll(() => {
      this.updateSFDivPos(sfDivRef, footerRef, sfTop, footerTop);
    });
    jQuery(window).resize(() => {
      footerTop = footerRef.offset().top;
      sfTop = sfDivRef.offset().top;
    });
  }

  initNewsFeed() {
    let sfDivRef = jQuery(".indexNPrt2Lft .ylwTpBxInfoWrap");
    let footerRef = jQuery("#footer");
    let sfTop = sfDivRef.offset().top;
    let footerTop = footerRef.offset().top;
    setTimeout(() => {
      this.updateSFDivPos(sfDivRef, footerRef, sfTop, footerTop);
    }, 1000);
    jQuery(window).scroll(() => {
      this.updateSFDivPos(sfDivRef, footerRef, sfTop, footerTop);
    });
    jQuery(window).resize(() => {
      footerTop = footerRef.offset().top;
      sfTop = sfDivRef.offset().top;
    });
  }

  updateSFDivPos(sfDivRef, footerRef, sfTop, footerTop) {
    let midDivHeight = jQuery(".indexNPrt2Mid")[0].clientHeight;
    if (midDivHeight <= sfDivRef[0].clientHeight) {
      return;
    }
    let sfLeft = sfDivRef.offset().left;
    let currPos = sfTop - jQuery(window).scrollTop();
    footerTop = footerRef.offset().top;
    let footerCurrPos = footerTop - jQuery(window).scrollTop();
    if (currPos <= 92) {
      let divWidth = sfDivRef[0].clientWidth;
      sfDivRef.css("width", divWidth + "px");
      sfDivRef.css("position", "fixed");
      sfDivRef.css("left", sfLeft + "px");
      if (footerCurrPos <= $(window).height()) {
        sfDivRef.css("top", 92 - ($(window).height() - footerCurrPos) + "px");
      } else {
        sfDivRef.css("top", "92px");
      }
    } else {
      sfDivRef.removeAttr("style");
    }
  }
}
