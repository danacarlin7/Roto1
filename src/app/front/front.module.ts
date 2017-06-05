import {NgModel} from "@angular/forms/forms";
import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {FrontMainComponent} from "./front-main.component";
import {FrontRoutingModule} from "./front-routing.module";
/**
 * Created by Hiren on 04-06-2017.
 */

@NgModule({
  imports: [
    FrontRoutingModule,
    SharedModule
  ],
  declarations: [
    FrontMainComponent
  ],
  exports: [
    FrontMainComponent
  ]
})
export class FrontModule {

}
