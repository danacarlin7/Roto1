/* core */
import { NgModel } from "@angular/forms/forms";
import { NgModule } from "@angular/core";
import { RouterModule, Routes, Route } from "@angular/router";

/* services */
import { AuthGuard } from "../shared/new-services/auth.guard";

/* components */
import { UserMainComponent } from "./user-main.component";
import { UserDashboardComponent } from "./components/dashboard/user-dashboard.component";
import { OverviewComponent } from "./components/overview/overview.component";
import { CohortComponent } from "./components/cohort/cohort.component";
import { ContestComponent } from "./components/contest/contest.component";
import { OpponentComponent } from "./components/opponent/opponent.component";
import { UploadsComponent } from "./components/uploads/uploads.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { UpdatePasswordComponent } from "./components/settings/update-password/update-password.component";
import { UserProfileComponent } from "./components/settings/user-profile/user-profile.component";
import { SubscriptionsComponent } from "./components/settings/subscriptions/subscriptions.component";
import { SavedCardsComponent } from "./components/settings/saved-cards/saved-cards.component";
import { ProfilePictureComponent } from "./components/settings/profile-picture/profile-picture.component";


/* Not in USE */
// import {GraphComponent} from "./components/graph/graph.component";


const routes: Routes = [
  {
    path: "",
    canActivate: [AuthGuard],
    component: UserMainComponent,
    data: { title: 'RotoPose - Dashboard' },
    children: [
      { path: "", component: UserDashboardComponent },
      { path: 'overview', component: OverviewComponent },
      { path: "cohort", component: CohortComponent },
      { path: "contests", component: ContestComponent },
      { path: "opponent", component: OpponentComponent },
      { path: "uploads", component: UploadsComponent },
      {
        path: "settings",
        component: SettingsComponent,
        children: [
          { path: "", pathMatch: 'full', redirectTo: 'profile-picture' },
          { path: "change-password", component: UpdatePasswordComponent },
          { path: "profile", component: UserProfileComponent },
          { path: "subscriptions", component: SubscriptionsComponent },
          { path: "saved-cards", component: SavedCardsComponent },
          { path: "profile-picture", component: ProfilePictureComponent }
        ]
      },

      /* Not in USE */
      // { path: "graphs", component: GraphComponent },
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
