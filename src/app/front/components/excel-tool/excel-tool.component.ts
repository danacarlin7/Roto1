import {Component} from "@angular/core";

/**
 * Created by Hiren on 07-07-2017.
 */

declare var fbq: any;

@Component({
  selector: 'rp-excel-tool',
  templateUrl: './excel-tool.component.html'
})
export class ExcelToolComponent {

  constructor() {

  }

  onExcelToolDownloadBtnClicked() {
    fbq('trackCustom', 'ExcelToolDownload');
  }

}
