import {NgModule} from "@angular/core";
import {RouterModule, Routes, Route} from "@angular/router";
import {AdminMainComponent} from "./admin-main.component";
/**
 * Created by Hiren on 05-06-2017.
 */

const routes:Routes = [
  <Route>{path: '', component: AdminMainComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule {

}
