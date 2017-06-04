import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
	imports: [
		SharedModule		
	],
	providers: [
	],
	declarations: [
		LayoutComponent,
		HeaderComponent,
		FooterComponent
	],
	exports: [
		LayoutComponent
	]
})
export class LayoutModule { }
