import {Component, AfterViewInit} from "@angular/core";
import {FrontService} from "../../services/front.service";
import {ArticleService} from "../../services/article.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../shared/services/auth.service";
import {News} from "../../models/news.model";
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
  redirected: boolean;
  redirectedMessage: String;

  twitterFeeds:Array<any>;
  facebookFeeds:Array<any>;
  instagramFeeds:Array<any>;

  footballArticles:any[];
  basketballArticles:any[];
  baseballArticles:any[];
  media:Object = {};

  constructor(private frontService: FrontService,
              private articleService: ArticleService,
              private authService: AuthService,
              private router: Router) {}

  ngAfterViewInit() {
    this.frontService.retrieveTwitterFeeds()
      .subscribe(
        response => {
          if (response.statusCode == 200) {
            console.log(response.data);
            let feeds:Array<any> = response.data;
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
            let feeds:Array<any> = response.data;
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
            let feeds:Array<any> = response.data.data;
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
    this.retrieveNews();
  }


  renderBaseballArticles() {
    setTimeout(() => {
      jQuery('.midSlider1').owlCarousel({
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

      jQuery(".midSlider1 .owl-prev").html('<i class="icnWrapperS"><img src="../../../../assets/images/blkArowLft.png" alt="" class="img-responsive"></i><span>Previous</span>');
      jQuery(".midSlider1 .owl-next").html('<i class="icnWrapperS">Next</i><span><img src="../../../../assets/images/blkArow.png" alt="" class="img-responsive"></span>');
    }, 10);
  }

  renderBasketballArticles() {
    setTimeout(() => {
      jQuery('.midSlider3').owlCarousel({
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

      jQuery(".midSlider3 .owl-prev").html('<i class="icnWrapperS"><img src="../../../../assets/images/blkArowLft.png" alt="" class="img-responsive"></i><span>Previous</span>');
      jQuery(".midSlider3 .owl-next").html('<i class="icnWrapperS">Next</i><span><img src="../../../../assets/images/blkArow.png" alt="" class="img-responsive"></span>');
    }, 10);
  }

  renderFootballArticles() {
    setTimeout(() => {
      jQuery('.midSlider2').owlCarousel({
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

      jQuery(".midSlider2 .owl-prev").html('<i class="icnWrapperS"><img src="../../../../assets/images/blkArowLft.png" alt="" class="img-responsive"></i><span>Previous</span>');
      jQuery(".midSlider2 .owl-next").html('<i class="icnWrapperS">Next</i><span><img src="../../../../assets/images/blkArow.png" alt="" class="img-responsive"></span>');
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

  getArticlesByGameId(id:any) {
    let catid = id;
    let articlesList = [];
    this.articleService.fetchPosts({categories: catid, per_page: 10, offset: 0}).subscribe(
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
          this.renderBaseballArticles();
          console.log("baseballArticles => ", this.baseballArticles);
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
        let mids = mid.join(',');
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

  encodeHtml(extract:string) {
    extract = extract.replace(/<[^>]+>/gm, '');
    let txt = document.createElement("textarea");
    txt.innerHTML = extract;
    extract = txt.value;
    if (extract.length > 250)
      extract = extract.substring(0, 250) + ' ...';
    return extract;
  }

  findMedia(id:number) {
    if (!id || !this.media) return false;
    return this.media[id];
  }

  navigateToArticles(id) {
    this.router.navigate(['/articles'], {queryParams: {tab: id}});
  }

  activeSingle:any;

  switchToSingle(post) {
    this.activeSingle = post;
  }

  allNewsRecords:News[] = [];

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
        let mid = [];
        for (let j = 0; j < posts.length; j++) {
          posts[j].extract = this.encodeHtml(posts[j].excerpt.rendered);
          if (posts[j].featured_media)
            mid.push(posts[j].featured_media);
          this.allNewsRecords.push(posts[j]);
        }
        let mids = mid.join(',');
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
      jQuery('.nSlider1').owlCarousel({
        items: 1,
        margin: 0,
        nav: true,
        loop: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true
      });

      jQuery(".nSlider1 .owl-prev").html('<i class="icnWrapperS"><img src="../../../../assets/images/blkArowLft.png" alt="" class="img-responsive"></i><span>Previous</span>');
      jQuery(".nSlider1 .owl-next").html('<i class="icnWrapperS">Next</i><span><img src="../../../../assets/images/blkArow.png" alt="" class="img-responsive"></span>');
    }, 10);
  }

}
