import {NgModule} from "@angular/core";
import {RouterModule, Routes, Route} from "@angular/router";
import {UserMainComponent} from "./user-main.component";
import {UserDashboardComponent} from "./components/dashboard/user-dashboard.component";
import {OverviewComponent} from "./components/overview/overview.component";
/**
 * Created by Hiren on 05-06-2017.
 */

const routes:Routes = [
  <Route>{
    path: '',
    component: UserMainComponent,
    data: {title: 'RotoPose - Dashboard'},
    children: [
      <Route>{
        path: '',
        component: UserDashboardComponent
      },
      <Route>{
        path: 'overview',
        component: OverviewComponent
      },
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
export class UserRoutingModule {

}
