import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../../../shared/services/auth.service";
import {ArticleService} from "../../services/article.service";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  constructor(private authService:AuthService, private router:Router, private articleService:ArticleService) {
  }

  category:any;
  categories:Array<any>;
  posts:Object = {};
  media:Object = {};
  hot:Array<any> = [];
  featured:Array<any> = [];
  top:Array<any> = [];
  newest:Array<any> = [];
  recent:Array<any> = [];
  week:Array<any> = [];
  subTrendingTabs:Array<any> = ['week', 'hot', 'featured', 'top', 'recent', 'newest'];
  subTrendingTabsLabels = {
    week: "Article of the Week",
    hot: "Today’s Hot Topics!",
    featured: "Featured",
    top: "Top-Articles",
    recent: "Recent",
    newest: "Newest"
  };
  activeTab:any;
  subActiveTab:any;
  tmpActiveTab:any;
  tmpSubActiveTab:any;
  activeSingle:any = null;
  isLoading:boolean = false;

  related:Object = {};

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }

    this.activeTab = 'trending';
    this.subActiveTab = 'week';

    this.articleService.fetchCategories().subscribe(
      categories => {
        this.categories = categories;
        for (var i = 0; i < this.categories.length; i++) {
          this.categories[i]['loaded'] = 0;
          var category = this.categories[i];
          this.posts[category.id] = [];
          this.fetchPostsByCat(category);
        }
      }
    );
    this.articleService.fetchRelated().subscribe(
      ids => {
        this.related = ids;
        for (var key in ids) {
          this.fetchPostsByType(key);
        }
      }
    );
  }

  private getIndexOfCategory = (catid:number) => {
    return this.categories.findIndex(category => {
      return category.id === catid;
    });
  };


  fetchPostsByCat(category) {
    var catid = category.id;
    this.isLoading = true;
    this.articleService.fetchPosts({categories: category['id'], per_page: 5, offset: category['loaded']}).subscribe(
      posts => {
        this.categories[this.getIndexOfCategory(catid)].loaded += posts.length;
        var mid = [];
        for (var j = 0; j < posts.length; j++) {
          posts[j].extract = this.encodeHtml(posts[j].excerpt.rendered);
          if (posts[j].featured_media)
            mid.push(posts[j].featured_media);
          this.posts[catid].push(posts[j]);
        }
        var mids = mid.join(',');
        if (mids) {
          this.articleService.fetchMedia({include: mids}).subscribe(
            images => {
              for (var k = 0; k < images.length; k++) {
                var image = images[k];
                this.media[image.id] = image.source_url;
              }
            }
          );
        }
        this.isLoading = false;
      }
    );
  }

  fetchPostsByType(key:string) {
    var cid = this.related[key].join(',');
    this.articleService.fetchPosts({include: cid}).subscribe(
      posts => {
        var mid = [];
        for (var j = 0; j < posts.length; j++) {
          posts[j].extract = this.encodeHtml(posts[j].excerpt.rendered);
          if (posts[j].featured_media)
            mid.push(posts[j].featured_media);
        }
        this[key] = posts;
        // if(key=='week')
        //   console.log(posts);
        var mids = mid.join(',');
        if (mids) {
          this.articleService.fetchMedia({include: mids}).subscribe(
            images => {
              for (var k = 0; k < images.length; k++) {
                var image = images[k];
                this.media[image.id] = image.source_url;
              }
            }
          );
        }
      }
    );
  }

  encodeHtml(extract:string) {
    var extract = extract.replace(/<[^>]+>/gm, '');
    var txt = document.createElement("textarea");
    txt.innerHTML = extract;
    extract = txt.value;
    if (extract.length > 250)
      extract = extract.substring(0, 250) + ' ...';
    return extract;
  }

  hasPosts(id:number) {
    return (this.posts && this.posts[id]);
  }

  findMedia(id:number) {
    if (!id || !this.media) return false;
    return this.media[id];
  }

  onTabChanged(cat) {
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
    this.activeSingle = post;
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
    //this.loadMorePosts(category);
  }
}
