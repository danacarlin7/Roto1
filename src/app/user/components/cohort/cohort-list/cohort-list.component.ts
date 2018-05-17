/* cors */
import { Component, Input } from '@angular/core';
import { DecimalPipe } from "@angular/common";
import { forEach } from "@angular/router/src/utils/collection";

/* models */
import { CohortData } from '../../../models/cohort-data.model';

/* services */
import { FilterService } from '../../../new-services/filter.service';

@Component({
  selector: 'rp-cohort-list',
  templateUrl: './cohort-list.component.html',
  styleUrls: ['./cohort-list.component.css']
})

export class CohortListComponent {

  tabName: string;

  @Input() records: CohortData[];

  constructor(
    public filterService: FilterService
  ) {
    this.tabName = this.filterService.activeCohortTab;
    console.log(this.records);
  }


  getTitleField(): string {
    let name = '';
    if (this.records && this.records.length && this.records[0].hasOwnProperty(this.filterService.activeCohortTab)) {
      name = this.filterService.activeCohortTab;
    }
    else {
      name = 'group';
    }
    return name;
  }

}
