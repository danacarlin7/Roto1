import {NgModel} from "@angular/forms/forms";
import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {FrontMainComponent} from "./front-main.component";
import {FrontRoutingModule} from "./front-routing.module";
import {FrontFooterComponent} from "./components/footer/front-footer.component";
import {FrontHeaderComponent} from "./components/header/front-header.component";
import {FrontHomeComponent} from "./components/home/front-home.component";
import {LoginComponent} from "./components/login/login.component";
import {SignUpComponent} from "./components/sign-up/sign-up.component";
import {NewsService} from "./services/news.service";
import {NewsComponent} from "./components/news/news.component";
/**
 * Created by Hiren on 04-06-2017.
 */

@NgModule({
  imports: [
    FrontRoutingModule,
    SharedModule
  ],
  declarations: [
    FrontMainComponent,
    FrontFooterComponent,
    FrontHeaderComponent,
    FrontHomeComponent,
    LoginComponent,
    SignUpComponent,
    NewsComponent
  ],
  exports: [
    FrontMainComponent
  ],
  providers: [NewsService]
})
export class FrontModule {

}
