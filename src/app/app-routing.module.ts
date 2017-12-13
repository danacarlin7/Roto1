import {NgModule} from '@angular/core';
import {Routes, RouterModule, Route, Data} from '@angular/router';
import {AppComponent} from "./app.component";

const routes:Routes = [
  {
    path: '',
    loadChildren: 'app/front/front.module#FrontModule'
  },
  {
    path: 'user',
    loadChildren: 'app/user/user.module#UserModule'
  },
  // {
  //   path: 'admin',
  //   loadChildren: 'app/admin/admin.module#AdminModule'
  // },
  {
    path: 'admin',
    loadChildren: 'app/paper-admin/admin.module#AdminModule'
  },
  // {
  //   path: 'proadmin',
  //   loadChildren: 'app/proAdmin/admin.module#AdminModule'
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
