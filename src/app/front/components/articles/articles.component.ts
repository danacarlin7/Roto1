import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from "../../../shared/new-services/auth.service";
import { ArticleService } from "../../new-services/article.service";

import { CategoryData } from "../../models/category-data";
import { PostData } from "../../models/post-data";

declare var jQuery: any;


@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute, private router: Router,
    private articleService: ArticleService
  ) {
    localStorage.setItem('free', "0");
  }

  category: any;
  categories: Array<CategoryData>;
  postsResp: Array<PostData>;
  posts: Object = {};
  media: Object = {};
  hot: Array<any> = [];
  featured: Array<any> = [];
  top: Array<any> = [];
  newest: Array<any> = [];
  recent: Array<any> = [];
  week: Array<any> = [];
  subTrendingTabs: Array<any> = ['week', 'hot', 'featured', 'top', 'recent', 'newest'];
  subTrendingTabsLabels = {
    week: "Article of the Week",
    hot: "Today’s Hot Topics!",
    featured: "Featured",
    top: "Top-Articles",
    recent: "Recent",
    newest: "Newest"
  };
  activeTab: any;
  subActiveTab: any;
  tmpActiveTab: any;
  tmpSubActiveTab: any;
  activeSingle: any = null;
  isLoading: boolean = false;

  related: Object = {};

  isStatus: any;
  isSubscribeError: any;
  isLoginError: any;

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(
      params => {
        if (params.hasOwnProperty('tab')) {
          this.activeTab = params['tab'];
        }
      }
    );

    this.articleService.fetchCategories().subscribe(
      categories => {
        this.categories = categories;
        for (let i = 0; i < this.categories.length; i++) {
          if (this.categories[i].id == 1) {
            this.categories.splice(i, 1);
            break;
          }
        }

        this.categories.push({
          'id': 20,
          'count': 20,
          'description': '',
          'link': 'https://wordpress.rotopros.com/category/soccer/',
          'name': 'Soccer',
          'loaded': 5,
          'meta': [],
          'slug': 'soccer',
          'taxonomy': 'category',
          'parent': 0,
          '_links': {
            "self": [{
              "href": "https:\/\/wordpress.rotopros.com\/wp-json\/wp\/v2\/categories\/20"
            }],
            "collection": [{
              "href": "https:\/\/wordpress.rotopros.com\/wp-json\/wp\/v2\/categories"
            }],
            "about": [{
              "href": "https:\/\/wordpress.rotopros.com\/wp-json\/wp\/v2\/taxonomies\/category"
            }],
            "wp:post_type": [{
              "href": "https:\/\/wordpress.rotopros.com\/wp-json\/wp\/v2\/posts?categories=20"
            }],
            "curies": [{
              "name": "wp",
              "href": "https:\/\/api.w.org\/{rel}",
              "templated": true
            }]
          }
        });

        console.log(this.categories);
        for (let i = 0; i < this.categories.length; i++) {
          this.categories[i]['loaded'] = 0;
          let category = this.categories[i];
          // if(category.id == 20 )
          //   this.categories[i]['loaded'] = 2;
          if (i == 0) {
            this.activeTab = category.id;
            this.subActiveTab = '';
          }
          this.posts[category.id] = [];
          this.fetchPostsByCat(category);
        }
      }
    );
    this.articleService.fetchRelated().subscribe(
      ids => {
        this.related = ids;
        for (let key in ids) {
          this.fetchPostsByType(key);
        }
      }
    );
  }

  private getIndexOfCategory = (catid: number) => {
    return this.categories.findIndex((category, index) => {
      return category.id === catid;
    });
  };


  fetchPostsByCat(category) {
    let catid = category.id;
    this.isLoading = true;
    this.articleService.fetchPosts({ categories: category['id'], per_page: 5, offset: category['loaded'] }).subscribe(
      posts => {
        this.postsResp = posts;
        this.categories[this.getIndexOfCategory(catid)].loaded += this.postsResp.length;
        let mid = [];
        for (let j = 0; j < this.postsResp.length; j++) {
          this.postsResp[j].extract = this.encodeHtml(this.postsResp[j].excerpt.rendered);
          if (this.postsResp[j].featured_media)
            mid.push(this.postsResp[j].featured_media);
          this.posts[catid].push(this.postsResp[j]);
        }
        let mids = mid.join(',');
        if (mids) {
          this.articleService.fetchMedia({ include: mids }).subscribe(
            images => {
              for (let k = 0; k < images.length; k++) {
                let image = images[k];
                this.media[image.id] = image.source_url;
              }
            }
          );
        }
        this.isLoading = false;
      }
    );
  }

  fetchPostsByType(key: string) {
    let cid = this.related[key].join(',');
    this.articleService.fetchPosts({ include: cid }).subscribe(
      posts => {
        let mid = [];

        for (let j = 0; j < posts.length; j++) {
          posts[j].extract = this.encodeHtml(posts[j].excerpt.rendered);
          if (posts[j].featured_media)
            mid.push(posts[j].featured_media);
        }
        this[key] = posts;
        // if(key=='week')
        //   console.log(posts);
        let mids = mid.join(',');
        if (mids) {
          this.articleService.fetchMedia({ include: mids }).subscribe(
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
    extract = extract.replace(/<[^>]+>/gm, '');
    let txt = document.createElement("textarea");
    txt.innerHTML = extract;
    extract = txt.value;
    if (extract.length > 250)
      extract = extract.substring(0, 250) + ' ...';
    return extract;
  }

  hasPosts(id: number) {
    return (this.posts && this.posts[id]);
  }

  findMedia(id: number) {
    if (!id || !this.media) return false;
    return this.media[id];
  }

  onTabChanged(cat) {
    console.log(cat);
    if (cat.slug == "free-article") {
      localStorage.setItem('free', "1");
    } else {
      localStorage.setItem('free', "0");
    }
    if (cat == 'trending' || this.subTrendingTabs.indexOf(cat) != -1) {
      if (cat == 'trending') {
        this.activeTab = cat;
        this.subActiveTab = 'week';
      } else {
        this.activeTab = 'trending';
        this.subActiveTab = cat;
      }
    } else {
      this.activeTab = cat.id;
      this.subActiveTab = '';
    }
    this.activeSingle = null;
  }

  saveTabSetting() {
    this.tmpSubActiveTab = this.subActiveTab;
    this.tmpActiveTab = this.activeTab;
  }

  restoreTabSetting() {
    this.activeTab = this.tmpActiveTab;
    this.subActiveTab = this.tmpSubActiveTab;
  }

  switchToSingle(post) {
    console.log(post);


    if (!this.authService.isLoggedIn()) {
      if (localStorage.getItem('free') == "1") {
        this.isStatus = true;
        this.isLoginError = false;
        this.isSubscribeError = false;
        this.router.navigate(['articles', post.id])
      } else {
        this.isStatus = false;
        this.isLoginError = true;
        this.isSubscribeError = false;
        jQuery("#openModel").click();
      }
    } else if (this.authService.isLoggedIn() && (localStorage.getItem('free') == "1" || this.authService.isSubscriber(true))) {
      this.isStatus = true;
      this.isLoginError = false;
      this.isSubscribeError = false;
      this.router.navigate(['articles', post.id])
    } else {
      this.isStatus = false;
      this.isLoginError = false;
      this.isSubscribeError = true;

      jQuery("#openModel").click();
    }
  }


  goBackToTab() {
    this.activeSingle = null;
  }

  loadMorePosts(category) {
    if (category.loaded < category.count) {
      this.fetchPostsByCat(category);
    }
  }

  onScroll(category) {
    this.loadMorePosts(category);
  }
}
