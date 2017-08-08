import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {AdminMainComponent} from "./admin-main.component";
import {AdminRoutingModule} from "./admin-routing.module";
import {AdminDashboardService} from "./services/admin-dashboard.service";
import {CouponsService} from "./services/coupons.service";
import {MembershipPlanService} from "./services/membership-plan.service";
import {LeftbarComponent} from "./components/left-bar/left-bar.component";
import {AdminHeaderComponent} from "./components/header/admin-header.component";
import {MembersComponent, AddMemberComponent, UploadMemberComponent} from "./components/members/members.component";
import {ProvidersComponent} from "./components/providers/providers.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {PlansComponent} from "./components/plans/plans.component";
import {AddPlanComponent} from "./components/plans/add-plan/add-plan.component";
import {EditPlanComponent} from "./components/plans/edit-plan/edit-plan.component";
import {SinglePlanComponent} from "./components/plans/single-plan/single-plan.component";
import {DeletePlanAlert} from "./components/plans/delete-plan/delete-plan.component";
import {AddProviderComponent} from "./components/providers/add-provider/add-provider.component";
import {EditProviderComponent} from "./components/providers/edit-provider/edit-provider.component";
import {EditProviderGuard} from "./edit-provider.guard";
import {ExcelComponent} from "./components/excel/excel.component"
/**
 * Created by Hiren on 04-06-2017.
 */

@NgModule({
  imports: [
    AdminRoutingModule,
    SharedModule
  ],
  declarations: [
    AdminMainComponent,
    LeftbarComponent,
    AdminHeaderComponent,
    MembersComponent,
    ProvidersComponent,
    DashboardComponent,
    AddMemberComponent,
    AddProviderComponent,
    EditProviderComponent ,
    UploadMemberComponent,
    PlansComponent,
    AddPlanComponent,
    EditPlanComponent,
    SinglePlanComponent,
    DeletePlanAlert,
    ExcelComponent
  ],
  exports: [
    AdminMainComponent
  ],
  providers: [AdminDashboardService, CouponsService, MembershipPlanService,EditProviderGuard]
})
export class AdminModule {

}
