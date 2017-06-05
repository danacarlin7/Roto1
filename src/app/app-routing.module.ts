import {NgModule} from '@angular/core';
import {Routes, RouterModule, Route, Data} from '@angular/router';
import {AppComponent} from "./app.component";

const routes:Routes = [
  <Route>{
    path: '',
    loadChildren: 'app/front/front.module#FrontModule'
  },
  <Route>{
    path: 'user',
    loadChildren: 'app/user/user.module#UserModule'
  },
  <Route>{
    path: 'admin',
    loadChildren: 'app/admin/admin.module#AdminModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
