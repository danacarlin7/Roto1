import {NgModule} from "@angular/core";
import {RouterModule, Routes, Route} from "@angular/router";
import {FrontMainComponent} from "./front-main.component";
import {FrontHomeComponent} from "./components/home/front-home.component";
import {LoginComponent} from "./components/login/login.component";
import {SignUpComponent} from "./components/sign-up/sign-up.component";
import {NewsComponent} from "./components/news/news.component";
import {TestComponent} from "./components/test/test.component";
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
      <Route>{path: 'login', component: LoginComponent},
      <Route>{path: 'signup', component: SignUpComponent},
      <Route>{path: 'forgot-password', component: ForgotPasswordComponent},
      <Route>{path: 'test', component: TestComponent},
      <Route>{path: 'news', component: NewsComponent},
      <Route>{path: 'lineups', component: DailyLineupComponent},
      <Route>{path: 'articles', component: ArticlesComponent},
      <Route>{path: 'basics', component: DFSBasicsComponent},
      <Route>{path: 'excel-tool', component: ExcelToolComponent},
      <Route>{path: 'faq', component: FAQComponent},
      <Route>{path: 'lineup-optimizer', canActivate: [AuthGuard], component: LineupOptimizerComponent},
      <Route>{path: 'provider-lineups', canActivate: [AuthGuard], component: ProviderComponent},
      <Route>{path: 'provider-public-lineups', canActivate: [AuthGuard], component: ProviderPublicComponent}
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
