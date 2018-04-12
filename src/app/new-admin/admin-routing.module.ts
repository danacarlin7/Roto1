import { RouterModule, Routes } from "@angular/router";

import { DashboardComponent }   from "./components/dashboard/dashboard.component";
import { UserComponent }   from "./components/user/user.component";
import { TableComponent }   from "./components/table/table.component";
import { TypographyComponent }   from "./components/typography/typography.component";
import { IconsComponent }   from "./components/icons/icons.component";
import { MapsComponent }   from "./components/maps/maps.component";
import { NotificationsComponent }   from "./components/notifications/notifications.component";
import { UpgradeComponent }   from "./components/upgrade/upgrade.component";
import { NgModule } from "@angular/core";
import { AdminComponent } from "./admin.component";
import { MembersAdminComponent } from "./members-admin/members-admin.component";
import { MembersDetailComponent } from "./members-detail/members-detail.component";
import { MembersLoadedResolver } from "./services/members-loaded-resolver.service";
import { PromotionsComponent } from "./promotions/promotions.component";

export const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    children: [
      {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full",
      },
      {
        path: "dashboard",
        component: DashboardComponent
      },
      {
        path: "members",
        children: [
          {
            path: "",
            component: MembersAdminComponent
          },
          {
            path: ":id",
            component: MembersDetailComponent,
            resolve: { member: MembersLoadedResolver }
          }
        ]
      },
      {
        path: "promotions",
        component: PromotionsComponent
      },
      {
        path: "user",
        component: UserComponent
      },
      {
        path: "table",
        component: TableComponent
      },
      {
        path: "typography",
        component: TypographyComponent
      },
      {
        path: "icons",
        component: IconsComponent
      },
      {
        path: "maps",
        component: MapsComponent
      },
      {
        path: "notifications",
        component: NotificationsComponent
      },
      {
        path: "upgrade",
        component: UpgradeComponent
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
export class AdminRoutingModule {}

