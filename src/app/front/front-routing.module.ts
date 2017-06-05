import {NgModule} from "@angular/core";
import {RouterModule, Routes, Route} from "@angular/router";
import {FrontMainComponent} from "./front-main.component";
/**
 * Created by Hiren on 05-06-2017.
 */
const routes:Routes = [
  <Route>{
    path: '',
    component: FrontMainComponent,
    data: {title: 'RotoPose - Home'}
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
