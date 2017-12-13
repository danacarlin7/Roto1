import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from "@angular/core";
import { AdminDashboardService } from "../services/admin-dashboard.service";
import { Overlay } from "angular2-modal";
import { overlayConfigFactory } from "angular2-modal";
import { Modal, BSModalContext } from "angular2-modal/plugins/bootstrap";
import { MembershipPlanService } from "../services/membership-plan.service";
import * as moment from "moment";
import "../../../assets/newAdmin/js/datetime-moment.js";

declare var $: any;

@Component({
  selector: "app-members-admin",
  templateUrl: "./members-admin.component.html",
  styleUrls: ["./members-admin.component.css"]
})
export class MembersAdminComponent implements OnInit {
  @ViewChild("subscribeTemplateRef") private subscribeTemplateRef: TemplateRef<any>;
  @ViewChild("unsubscribeTemplateRef") private unsubscribeTemplateRef: TemplateRef<any>;
  @ViewChild("deleteTemplateRef") private deleteTemplateRef: TemplateRef<any>;

  public headerRow = ["Name", "Email", "Is Subscribed", "Created On", "Last Subscription", "Actions"];
  public allMembers: Object[];

  private modalData;
  private dialogRef;
  private table;
  private subscriptionPlans: Object[];

  constructor(
    private adminDashboardService: AdminDashboardService,
    private membershipPlanService: MembershipPlanService,
    private modal: Modal,
    private vcRef: ViewContainerRef,
    private overlay: Overlay
  ) {
    modal.overlay.defaultViewContainer = vcRef;
  }

  ngOnInit() {
    this.adminDashboardService.getMembers().subscribe(
      members => {
        this.allMembers = members.data.map(member => {
          let last_active = null;

          const created_at = moment(member.created_at).format("MMM D YYYY");
          if (member.last_active) {
            last_active = moment(member.last_active).format("MMM D YYYY");
          }

          return {
            name: member.first_name + " " + member.last_name,
            email: member.email,
            isSubscribe: member.is_subscribe,
            createdAt: created_at,
            lastSubscription: last_active,
            id: member._id,
            subscriptions: member.subscriptions.filter(subscription => subscription.is_plan_active === true)
          };
        });

        setTimeout(() => this.setUpDatatable(), 0);
      }
    );

    this.membershipPlanService.retrieveMembershipPlans().subscribe(
      plans => {
        this.subscriptionPlans = [plans.data[1], plans.data[2]];
      }
    );
  }

  setUpDatatable() {
    if (this.table) {
      this.table.destroy();
    }

    $.fn.dataTable.moment("MMM D YYYY");

    this.table = $("#datatables").DataTable({
      "pagingType": "full_numbers",
      "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
      responsive: true,
      language: {
      search: "_INPUT_",
        searchPlaceholder: "Search records",
      },
      "order": [[ 3, "desc" ]]
    });
  }

  openModal(data: Object, templateRef: TemplateRef<any>) {
    console.log(data);
    this.modalData = data;
    this.modal.open(templateRef, overlayConfigFactory({isBlocking: false}, BSModalContext)).then(
      dialog => this.dialogRef = dialog
    );
  }

  subscribeMember(form) {
    console.log(form.value.planID);
    console.log(this.modalData.id);
    console.log(typeof this.modalData.createdAt);
  }

  unsubscribeMember(form) {
    this.adminDashboardService.unsubscribePlan(form.value.planID, false, this.modalData.id).subscribe(
      response => {
        console.log(response);
          alert(response.message);
          this.dialogRef.close(true);
      }
    );
  }

  deleteUser(id: String) {
    this.adminDashboardService.deleteMember(id).subscribe(
      response => {
        console.log(response);
        alert(response.message);
        this.dialogRef.close(true);

        const $tr = $(`#${id}`);
        this.table.row($tr).remove().draw();
      },
      error => {
        console.log(error);
        alert(error.message);
      }
    );
  }

  downloadMembers() {
    if (!this.allMembers) {
      alert("Wait for members to load");
      return;
    }

    this.adminDashboardService.downloadCSV(this.allMembers, "allMembers.csv");
  }

}
