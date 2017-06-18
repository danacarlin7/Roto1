import {NgModule} from "@angular/core";
import {RouterModule, Routes, Route} from "@angular/router";
import {UserMainComponent} from "./user-main.component";
import {UserDashboardComponent} from "./components/dashboard/user-dashboard.component";
import {OverviewComponent} from "./components/overview/overview.component";
import {CohortComponent} from "./components/cohort/cohort.component";
import {ContestComponent} from "./components/contest/contest.component";
import {OpponentComponent} from "./components/opponent/opponent.component";
import {AuthGuard} from "../shared/services/auth.guard";
import {GraphComponent} from "./components/graph/graph.component";
import {UploadsComponent} from "./components/uploads/uploads.component";
/**
 * Created by Hiren on 05-06-2017.
 */

const routes:Routes = [
  <Route>{
    path: '',
    canActivate: [AuthGuard],
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
      <Route>{
        path: 'cohort',
        component: CohortComponent
      },
      <Route>{
        path: 'contests',
        component: ContestComponent
      },
      <Route>{
        path: 'opponent',
        component: OpponentComponent
      },
      <Route>{
        path: 'graphs',
        component: GraphComponent
      },
      <Route>{
        path:'uploads',
        component:UploadsComponent
      }
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
