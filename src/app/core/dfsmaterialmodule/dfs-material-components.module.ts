import {NgModule} from "@angular/core";
import {
  MdButtonModule, MdCardModule, MdProgressSpinnerModule, MdIconModule,
  MdSlideToggleModule, MdTooltipModule, MdMenuModule, MdInputModule, MdSelectModule, MdRadioModule, MdDialogModule
} from "@angular/material";
/**
 * Created by Hiren on 22-04-2017.
 */

@NgModule({
  imports:[
    MdButtonModule,
    MdCardModule,
    MdProgressSpinnerModule,
    MdIconModule,
    MdSlideToggleModule,
    MdTooltipModule,
    MdMenuModule,
    MdInputModule,
    MdSelectModule,
    MdRadioModule,
    MdSlideToggleModule,
    MdDialogModule
  ],
  exports:[
    MdButtonModule,
    MdCardModule,
    MdProgressSpinnerModule,
    MdIconModule,
    MdSlideToggleModule,
    MdTooltipModule,
    MdMenuModule,
    MdInputModule,
    MdSelectModule,
    MdRadioModule,
    MdSlideToggleModule,
    MdDialogModule
  ]
})
export class DFSMaterialModule{

}
