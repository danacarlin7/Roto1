import { Component } from "@angular/core";

declare var jQuery: any;

@Component({
  selector: 'rp-faq',
  templateUrl: './faq.component.html'
})
export class FAQComponent {
  activeFAQ: string;

  constructor() {

  }

  ngAfterViewInit() {
    function toggleIcon(e) {
      jQuery(e.target)
        .prev('.panel-heading')
        .find(".more-less")
        .toggleClass('glyphicon-plus glyphicon-minus');
    }

    jQuery('.panel-group').on('hidden.bs.collapse', toggleIcon);
    jQuery('.panel-group').on('shown.bs.collapse', toggleIcon);
  }

}
