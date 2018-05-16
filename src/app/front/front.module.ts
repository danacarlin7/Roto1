/* core */
import { NgModel } from "@angular/forms/forms";
import { NgModule } from "@angular/core";

/* libs */
import { InfiniteScrollModule } from "ngx-infinite-scroll";

/* modules */
import { SharedModule } from "../shared/shared.module";
import { FrontMainComponent } from "./front-main.component";

/* routing */
import { FrontRoutingModule } from "./front-routing.module";

/* pipes */
import { LineupPlayerFilter } from "./ng-pipes/lineup-opp-filter.pipe";
import { SortGridPipe } from "./ng-pipes/custom-filter.pipe";


/* components */
import { FrontFooterComponent } from "./components/footer/front-footer.component";
import { FrontHeaderComponent } from "./components/header/front-header.component";
import { FrontHomeComponent } from "./components/home/front-home.component";
import { LoginComponent } from "./components/login/login.component";
import { SignUpComponent } from "./components/sign-up/sign-up.component";
import { ArticlesComponent } from "./components/articles/articles.component";
import { DailyLineupComponent } from "./components/daily-lineup/daily-lineup.component";
import { ArticleComponent } from "./components/article/article.component";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
import { DFSBasicsComponent } from "./components/dfs-basics/dfs-basics.component";
import { FAQComponent } from "./components/faq/faq.component";
import { ChangePasswordComponent } from "./components/change-password/change-password.component";
import { SubscribeComponent } from "./components/subscribe/subscribe.component";
import { VerifyAccComponent } from "./components/forgot-password/verify-acc.component";
import { PodcastComponent } from "./components/podcast/podcast.component";
import { PlanComponent } from "./components/plan/plan.component";
import { VideoComponent } from "./components/video/video.component";

/* Not in USE */
// import {FrontService} from "./services/front.service";
// import {NewsComponent} from "./components/news/news.component";
// import {TestComponent} from "./components/test/test.component";
// import {ProviderLineupComponent} from "./components/provider-lineup/provider-lineup.component";
// import {LineupOptimizerComponent} from "./components/lineup-optimizer/lineup-optimizer.component";
// import {ArticleService} from "./services/article.service";
// import {InfiniteScrollModule} from "angular2-infinite-scroll/angular2-infinite-scroll";
// import {LineupOptimizerService} from "./services/lineup-optimizer.service";
// import {ExcelToolComponent} from "./components/excel-tool/excel-tool.component";
// import {AdvFilterComponent} from "./components/lineup-optimizer/adv-filter/adv-filter.component";
// import {PlayerGetService} from './services/fetchPlayers';
// import {CompGetService} from './services/fetchCompositions';
// import {LineupPostService} from './services/postLineups';
// import {ProviderComponent} from "./components/provider/provider.component";
// import {ProviderPublicComponent} from "./components/provider-public/public.component";
// import {InjuriesComponent} from "./components/injuries/injuries.component";
// import {GeneratedLineupsComponent} from "./components/lineup-optimizer/generated-lineups/generated-lineups.component";
// import {MarketPlaceComponent} from "./components/market-place/market-place.component";
// import {ExtensionsComponent} from "./components/extensions/extensions.component";
// import {StackingDataFilter} from "./components/lineup-optimizer/adv-filter/stacking-data.pipe";
// import {NFLLineupOptimizerComponent} from "./components/nfl-lineup-optimizer/nfl-lineup-optimizer.component";
// import {NFLAdvFilterComponent} from "./components/nfl-lineup-optimizer/nfl-filters/nfl-filters.component";
// import {ContactAnalyzerComponent} from "./components/contact-analyzer/contact-analyzer.component";
// import {GeneratedNFLLineupsComponent} from "./components/nfl-lineup-optimizer/generated-nfl-lineups/generated-nfl-lineups.component";
// import {NFLExcelToolComponent} from "./components/excel-tool-nfl/nfl-excel-tool.component";
// import {NBALineupOptimizerComponent} from "./components/nba-lineup-optimizer/nba-lineup-optimizer.component";
// import {NBAFilterComponent} from "./components/nba-lineup-optimizer/nba-filter/nba-filter.component";
// import {GeneratedNBALineupsComponent} from "./components/nba-lineup-optimizer/generated-nba-linups/generated-nba-lineups.component";
// import {VgCoreModule} from 'videogular2/core';
// import {VgControlsModule} from 'videogular2/controls';
// import {VgOverlayPlayModule} from 'videogular2/overlay-play';
// import {VgBufferingModule} from 'videogular2/buffering';

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
    ArticlesComponent,
    DailyLineupComponent,
    ArticleComponent,
    ArticlesComponent,
    ForgotPasswordComponent,
    DFSBasicsComponent,
    FAQComponent,
    LineupPlayerFilter,
    SortGridPipe,
    ChangePasswordComponent,
    SubscribeComponent,
    VerifyAccComponent,
    PodcastComponent,
    PlanComponent,
    VideoComponent
  ],
  exports: [
    FrontMainComponent
  ],
  providers: []
})

export class FrontModule {}
