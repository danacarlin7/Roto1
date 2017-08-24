import {NgModule} from "@angular/core";
import {RouterModule, Routes, Route} from "@angular/router";
import {FrontMainComponent} from "./front-main.component";
import {FrontHomeComponent} from "./components/home/front-home.component";
import {LoginComponent} from "./components/login/login.component";
import {SignUpComponent} from "./components/sign-up/sign-up.component";
import {NewsComponent} from "./components/news/news.component";
import {TestComponent} from "./components/test/test.component";
import {ProviderLineupComponent} from "./components/provider-lineup/provider-lineup.component";
import {DailyLineupComponent} from "./components/daily-lineup/daily-lineup.component";
import {ArticlesComponent} from "./components/articles/articles.component";
import {LineupOptimizerComponent} from "./components/lineup-optimizer/lineup-optimizer.component";
import {AuthGuard} from "../shared/services/auth.guard";
import {ForgotPasswordComponent} from "./components/forgot-password/forgot-password.component";
import {DFSBasicsComponent} from "./components/dfs-basics/dfs-basics.component";
import {ExcelToolComponent} from "./components/excel-tool/excel-tool.component";
import {FAQComponent} from "./components/faq/faq.component";

import {ProviderComponent} from "./components/provider/provider.component";
import {ProviderPublicComponent} from "./components/provider-public/public.component";

import {InjuriesComponent} from "./components/injuries/injuries.component";
import {ChangePasswordComponent} from "./components/change-password/change-password.component";
import {ArticleComponent} from "./components/article/article.component";
import {GeneratedLineupsComponent} from "./components/lineup-optimizer/generated-lineups/generated-lineups.component";
import {SubscribeComponent} from "./components/subscribe/subscribe.component";
import {VerifyAccComponent} from "./components/forgot-password/verify-acc.component";
import {MarketPlaceComponent} from "./components/market-place/market-place.component";
import {ExtensionsComponent} from "./components/extensions/extensions.component";
import {NFLLineupOptimizerComponent} from "./components/nfl-lineup-optimizer/nfl-lineup-optimizer.component";
/**
 * Created by Hiren on 05-06-2017.
 */
const routes:Routes = [
  <Route>{
    path: '',
    component: FrontMainComponent,
    data: {title: 'RotoPose - Home'},
    children: [
      <Route>{path: '', component: FrontHomeComponent},
      <Route>{path: ':token/verify', component: VerifyAccComponent},
      <Route>{path: ':token/change-password', component: ChangePasswordComponent},
      <Route>{path: 'login', component: LoginComponent},
      <Route>{path: 'signup', component: SignUpComponent},
      <Route>{path: 'forgot-password', component: ForgotPasswordComponent},
      <Route>{path: 'provider-lineup', canActivate: [AuthGuard], component: ProviderLineupComponent},
      <Route>{path: 'news', component: NewsComponent},
      <Route>{path: 'market-place', component: MarketPlaceComponent},
      <Route>{path: 'extensions', component: ExtensionsComponent},
      <Route>{path: 'lineups', component: DailyLineupComponent},
      <Route>{path: 'articles/:id', component: ArticleComponent},
      <Route>{path: 'articles', component: ArticlesComponent},
      <Route>{path: 'basics', component: DFSBasicsComponent},
      <Route>{path: 'excel-tool', component: ExcelToolComponent},
      <Route>{path: 'faq', component: FAQComponent},
      <Route>{path: 'provider-lineups', canActivate: [AuthGuard], component: ProviderComponent},
      <Route>{path: 'provider-public-lineups', component: ProviderPublicComponent},
      <Route>{path: 'lineup-optimizer', component: LineupOptimizerComponent},
      <Route>{path: 'lineup-optimizer/mlb', component: LineupOptimizerComponent},
      <Route>{path: 'lineup-optimizer/nfl', component: NFLLineupOptimizerComponent},
      <Route>{path: 'generated-lineups', component: GeneratedLineupsComponent},
      <Route>{path: 'injuries', component: InjuriesComponent},
      <Route>{path: 'subscribe', component: SubscribeComponent},
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class FrontRoutingModule {

}
