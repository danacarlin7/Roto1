import {NgModule} from "@angular/core";
import {RouterModule, Routes, Route} from "@angular/router";
import {UserMainComponent} from "./user-main.component";
/**
 * Created by Hiren on 05-06-2017.
 */

const routes:Routes = [
  <Route>{
    path: '',
    component: UserMainComponent,
    data: {title: 'RotoPose - Dashboard'}
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
