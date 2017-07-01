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
      <Route>{path: 'test', component: TestComponent},
      <Route>{path: 'news', component: NewsComponent},
      <Route>{path: 'lineups', component: DailyLineupComponent},
      <Route>{path: 'articles', component: ArticlesComponent}
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
