import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
	{ path: '', component: HomeComponent }
];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		CommonModule,
		FormsModule
	],
	exports: [
		RouterModule
	],
	declarations: [HomeComponent]
})
export class FrontModule { }
