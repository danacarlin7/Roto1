import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {UserMainComponent} from "./user-main.component";
import {UserRoutingModule} from "./user-routing.module";
import {UserHeaderComponent} from "./components/header/user-header.component";
import {UserFooterComponent} from "./components/footer/user-footer.component";
import {UserDashboardComponent} from "./components/dashboard/user-dashboard.component";
import {OverviewComponent} from "./components/overview/overview.component";
import {FilterComponent} from "./components/filters/filter.component";
import {AppliedFiltersComponent} from "./components/filters/applied-filters/applied-filter.component";
import {UserDashboardServices} from "./services/user-dashboard.service";
import {FilterService} from "./services/filter.service";
import {OverviewlistComponent} from "./components/overview/overview-list/overview-list.component";
import {AuthService} from "../shared/services/auth.service";
import {TabViewComponent} from "./components/common/tab-view/tab-view.component";
import {CohortComponent} from './components/cohort/cohort.component';
import {CohortListComponent} from './components/cohort/cohort-list/cohort-list.component';
import {ContestComponent} from "./components/contest/contest.component";
import {ContestListComponent} from "./components/contest/contest-list/contest-list.component";
import {OpponentComponent} from "./components/opponent/opponent.component";
import {OpponentListComponent} from "./components/opponent/opponents-list/opponents-list.component";
/**
 * Created by Hiren on 04-06-2017.
 */

@NgModule({
  imports: [
    UserRoutingModule,
    SharedModule
  ],
  declarations: [
    UserMainComponent,
    UserHeaderComponent,
    UserFooterComponent,
    UserDashboardComponent,
    OverviewComponent,
    FilterComponent,
    AppliedFiltersComponent,
    OverviewlistComponent,
    TabViewComponent,
    OverviewlistComponent,
    CohortComponent,
    CohortListComponent,
    ContestComponent,
    ContestListComponent,
    OpponentComponent,
    OpponentListComponent
  ],
  exports: [
    UserMainComponent
  ],
  providers: [UserDashboardServices, FilterService]
})
export class UserModule {

}
