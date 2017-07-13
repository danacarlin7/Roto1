import {NgModule} from "@angular/core";
import {RouterModule, Routes, Route} from "@angular/router";
import {AdminMainComponent} from "./admin-main.component";
import {AuthGuard} from "../shared/services/auth.guard";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {MembersComponent, AddMemberComponent, UploadMemberComponent} from "./components/members/members.component";
import {ProvidersComponent, AddProviderComponent } from "./components/providers/providers.component";
import {PlansComponent} from "./components/plans/plans.component";
import {AddPlanComponent} from "./components/plans/add-plan/add-plan.component";
import {EditPlanComponent} from "./components/plans/edit-plan/edit-plan.component";
/**
 * Created by Hiren on 05-06-2017.
 */

const routes:Routes = [
  <Route>{
    path: '',
    canActivate: [AuthGuard],
    component: AdminMainComponent,
    children: [
      <Route>{path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      <Route>{
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        data: {title: "Dashboard", type: "admin"}
      },
      <Route>{
        path: 'members',
        component: MembersComponent,
        canActivate: [AuthGuard],
        data: {title: "Members", type: "admin"}
      },
      {
        path: 'addmember',
        component: AddMemberComponent,
        canActivate: [AuthGuard],
        data: {title: "Add Member", type: "admin"}
      },
      {
        path: 'uploadmember',
        component: UploadMemberComponent,
        canActivate: [AuthGuard],
        data: {title: "Upload Member", type: "admin"}
      },
      <Route>{
        path: 'providers',
        component: ProvidersComponent,
        canActivate: [AuthGuard],
        data: {title: "Providers", type: "admin"}
      },
      {
        path: 'addprovider',
        component: AddProviderComponent,
        canActivate: [AuthGuard],
        data: {title: "Add provider", type: "admin"}
      },
      {
        path: 'plans',
        component: PlansComponent,
        canActivate: [AuthGuard],
        data: {title: "Plans", type: "admin"}
      },
      {
        path: 'plans/add',
        component: AddPlanComponent,
        canActivate: [AuthGuard],
        data: {title: "Add new plan", type: "admin"}
      },
      {
        path: 'plans/edit',
        component: EditPlanComponent,
        canActivate: [AuthGuard],
        data: {title: "Add new plan", type: "admin"}
      },
    ]
    /* children:[
     { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard],data:{title:"Dashboard",type:"admin"}},
     { path: 'mlb', component: MlbComponent,canActivate: [AuthGuard],data:{title:"MLB Players",type:"admin"}},
     { path: 'mlbplayers', component: MlbPlayerComponent,canActivate: [AuthGuard],data:{title:"MLB Players",type:"admin"}},
     { path: 'members', component: MembersComponent,canActivate: [AuthGuard],data:{title:"Members",type:"admin"}},
     { path: 'addmember', component: AddMemberComponent,canActivate: [AuthGuard],data:{title:"Add Member",type:"admin"}},
     { path: 'uploadmember', component: UploadMemberComponent,canActivate: [AuthGuard],data:{title:"Upload Member",type:"admin"}},
     { path: 'addpage', component: AddCmsComponent,canActivate: [AuthGuard],data:{title:"Add Page",type:"admin"}},
     { path: 'editpage/:id', component: EditCmsComponent,canActivate: [AuthGuard],data:{title:"Edit Page",type:"admin"}},
     { path: 'pages', component: CmsComponent,canActivate: [AuthGuard],data:{title:"Pages",type:"admin"}},
     { path: 'contests', component: ContestsComponent,canActivate: [AuthGuard],data:{title:"Contests",type:"admin"}},
     { path: 'plans', component: PlansComponent,canActivate: [AuthGuard],data:{title:"Plans",type:"admin"}},
     { path: 'plans/add', component: AddPlanComponent,canActivate: [AuthGuard],data:{title:"Add new plan",type:"admin"}},
     { path: 'plans/edit', component: EditPlanComponent,canActivate: [AuthGuard],data:{title:"Add new plan",type:"admin"}},
     { path: 'coupons', component: CouponsComponent,canActivate: [AuthGuard],data:{title:"Coupons",type:"admin"}},
     { path: 'coupons/add', component: AddCouponComponent,canActivate: [AuthGuard],data:{title:"Add new coupon",type:"admin"}},
     { path: 'coupons/edit', component: AddCouponComponent,canActivate: [AuthGuard],data:{title:"Edit new coupon",type:"admin"}},
     { path: 'logout', component: LogoutComponent }
     ]*/
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
export class AdminRoutingModule {

}
