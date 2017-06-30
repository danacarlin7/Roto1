import {Component} from "@angular/core";
import {NewsTabs, NewsTabConstants} from "../../constants/menu.constants";
import {Router, ActivatedRoute} from "@angular/router";
import {NewsService} from "../../services/news.service";
import {News} from "../../models/news.model";
/**
 * Created by Hiren on 28-06-2017.
 */

@Component({
  selector: 'rp-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent {

  newsTabs = NewsTabs;
  newsTabConstants = NewsTabConstants;

  activeTab:string = this.newsTabConstants.NBA;

  newsRecords:News[] = [];
  isLoading:boolean;

  constructor(private router:Router, private activeRoute:ActivatedRoute, private newsService:NewsService) {
  }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(
      params => {
        if (params.hasOwnProperty('tab')) {
          this.getData(params['tab']);
          this.activeTab = params['tab'];
        }
        else {
          this.router.navigate(['/news'], {queryParams: {tab: this.activeTab}})
        }
      }
    )
  }

  onNewsTabChanged(tabName:{value:string,label:string}) {
    this.activeTab = tabName.value;
    this.router.navigate(['/news'], {queryParams: {tab: tabName.value}})
  }


  getData(tabName:string) {
    this.isLoading = true;
    this.newsService.retrieveNews(tabName)
      .subscribe(
        response => {
          if (response.statusCode == 200) {
            let data:Array<any> = response.data;
            this.newsRecords = data.map(currData => currData['news'][0]);
            console.log("records => ", this.newsRecords);
          } else {
            console.log('response error => ', response);
          }
          this.isLoading = false;
        },
        error => {
          this.isLoading = false;
          console.log('http error => ', error);
        }
      )
  }

}
