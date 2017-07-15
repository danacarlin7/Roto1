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
import {LineupOptimizerService} from "./services/lineup-optimizer.service";
import {ForgotPasswordComponent} from "./components/forgot-password/forgot-password.component";
import {DFSBasicsComponent} from "./components/dfs-basics/dfs-basics.component";
import {ExcelToolComponent} from "./components/excel-tool/excel-tool.component";
import {FAQComponent} from "./components/faq/faq.component";
import {AdvFilterComponent} from "./components/lineup-optimizer/adv-filter/adv-filter.component";
import {LineupPlayerFilter} from "./ng-pipes/lineup-opp-filter.pipe";

import {PlayerGetService} from './services/fetchPlayers';
import {CompGetService} from './services/fetchCompositions';
import {LineupPostService} from './services/postLineups';
import {ProviderComponent} from "./components/provider/provider.component";

/**
 * Created by Hiren on 04-06-2017.
 */

@NgModule({
  imports: [
    FrontRoutingModule,
    InfiniteScrollModule,
    SharedModule,
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
    ArticlesComponent,
    ForgotPasswordComponent,
    DFSBasicsComponent,
    ExcelToolComponent,
    FAQComponent,
    AdvFilterComponent,
    LineupPlayerFilter, 
    ProviderComponent
  ],
  exports: [
    ProviderComponent,
    FrontMainComponent
  ],
  providers: [FrontService,ArticleService,LineupOptimizerService, PlayerGetService, CompGetService, LineupPostService]
})
export class FrontModule {

}
