import { Component } from "@angular/core";
import { NewsTabs, NewsTabConstants } from "../../constants/menu.constants";
import { Router, ActivatedRoute } from "@angular/router";
import { FrontService } from "../../services/front.service";
import { News } from "../../models/news.model";
import { FrontHomeComponent } from "../home/front-home.component";

/**
 * Created by Hiren on 28-06-2017.
 */

@Component({
  selector: "rp-news",
  templateUrl: "./news.component.html",
  styleUrls: ["./news.component.css"]
})
export class NewsComponent {

  PRIORITY_ALL = 0;
  PRIORITY_URGENT = 1;
  PRIORITY_VERY_URGENT = 2;
  PRIORITY_IMPORTANT = 3;
  PRIORITY_VERY_IMPORTANT = 4;
  PRIORITY_NOTE_WORTHY = 5;

  newsTabs = NewsTabs;
  newsTabConstants = NewsTabConstants;
  currentPage: number;
  activeTab: string = this.newsTabConstants.MMA;
  newsPriority = 0;
  allNewsRecords: News[] = [];
  newsRecords: News[] = [];
  isLoading: boolean;

  constructor(private router: Router, private activeRoute: ActivatedRoute, private newsService: FrontService) {
  }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(
      params => {
        if (params.hasOwnProperty("tab")) {
          // this.getData(params["tab"]);
          this.activeTab = params["tab"];
          let activeTabID;
          if (this.activeTab === "MMA") {
            activeTabID = 3756;
          } else {
            activeTabID = 3756;
          }
          this.getData(activeTabID);
        } else {
          this.router.navigate(["/news"], { queryParams: { tab: this.activeTab } });
        }
      }
    );
  }

  onNewsTabChanged(tabName: { value: string, label: string }) {
    this.activeTab = tabName.value;
    let tapID: number;
    if (this.activeTab === "NBA") {
      tapID = 37;
    }
   else if (this.activeTab === "MLB") {
        tapID = 152;

      }
      else if (this.activeTab === "MMA") {
        tapID = 3756;

      }
      else if (this.activeTab === "SOCCER") {
        tapID = 3738;

      }
      else if (this.activeTab === "NFL") {
        tapID = 24;

      }
      else if (this.activeTab === "NASCAR") {
        tapID = 25;

      }
    else if (this.activeTab === "NHL") {
      tapID = 134;

    }
    else if (this.activeTab === "PGA") {
      tapID = 172;

    }

      /*else {
        tapID = 69;
      }*/
      debugger;

    this.getData(tapID);
    console.log(this.activeTab);
    // this.router.navigate(["/tags"], {queryParams: {tab: tabName.value}});
  }

  onNewsPriorityChanged(priority: number) {
    this.filterNews(priority);
  }


  filterNews(priority: number) {
    switch (priority) {
      case this.PRIORITY_ALL:
        this.newsRecords = this.allNewsRecords;
        break;
      case this.PRIORITY_URGENT:
      case this.PRIORITY_VERY_URGENT:
        this.newsRecords = this.allNewsRecords.filter(currNews => {
          if (currNews.news_priority == this.PRIORITY_URGENT || currNews.news_priority == this.PRIORITY_VERY_URGENT) {
            return true;
          }
        });
        break;
      case this.PRIORITY_IMPORTANT:
      case this.PRIORITY_VERY_IMPORTANT:
        this.newsRecords = this.allNewsRecords.filter(currNews => {
          if (currNews.news_priority == this.PRIORITY_IMPORTANT || currNews.news_priority == this.PRIORITY_VERY_IMPORTANT) {
            return true;
          }
        });
        break;
      default:
        this.newsRecords = this.allNewsRecords;
    }
  }

  getData(tabName) {
    this.isLoading = true;
    this.newsService.retrieveSpecificNews(tabName)
      .subscribe(
      response => {
        console.log(response);
        this.newsRecords = response.json();
        // if (response.statusCode == 200) {
        //   const data: Array<any> = response.data;
        //   this.allNewsRecords = data.map(currData => currData["news"][2]);
        //   this.filterNews(this.newsPriority);
        //   console.log("records => ", this.newsRecords);
        // } else {
        //   console.log("response error => ", response);
        // }
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
        console.log("http error => ", error);
      }
      );
  }

}
