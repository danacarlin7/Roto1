import {NgModel} from "@angular/forms/forms";
import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {FrontMainComponent} from "./front-main.component";
import {FrontRoutingModule} from "./front-routing.module";
import {FrontFooterComponent} from "./components/footer/front-footer.component";
import {FrontHeaderComponent} from "./components/header/front-header.component";
import {FrontHomeComponent} from "./components/home/front-home.component";
import {LoginComponent} from "./components/login/login.component";
import {SignUpComponent} from "./components/sign-up/sign-up.component";
import {FrontService} from "./services/front.service";
import {NewsComponent} from "./components/news/news.component";
import {TestComponent} from "./components/test/test.component";
import {ArticlesComponent} from "./components/articles/articles.component";
import {DailyLineupComponent} from "./components/daily-lineup/daily-lineup.component";
import {LineupOptimizerComponent} from "./components/lineup-optimizer/lineup-optimizer.component";
import {ArticleService} from "./services/article.service";
import {ArticleComponent} from "./components/article/article.component";
import {InfiniteScrollModule} from "angular2-infinite-scroll/angular2-infinite-scroll";
/**
 * Created by Hiren on 04-06-2017.
 */

@NgModule({
  imports: [
    FrontRoutingModule,
    InfiniteScrollModule,
    SharedModule
  ],
  declarations: [
    FrontMainComponent,
    FrontFooterComponent,
    FrontHeaderComponent,
    FrontHomeComponent,
    LoginComponent,
    SignUpComponent,
    TestComponent,
    NewsComponent,
    ArticlesComponent,
    DailyLineupComponent,
    LineupOptimizerComponent,
    ArticleComponent,
    ArticlesComponent
  ],
  exports: [
    FrontMainComponent
  ],
  providers: [FrontService,ArticleService]
})
export class FrontModule {

}
