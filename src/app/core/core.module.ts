import { NgModule, Optional, SkipSelf } from '@angular/core';

import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { PasswordValidator } from './directives/password-validator';
import { DFSAmountPipe } from "./ng-pipes/dfs-amount.pipe";
import { SafePipe } from "./ng-pipes/safe-pipe";

@NgModule({
	imports: [
	],
	providers: [
		AuthService,
		UserService
	],
	declarations: [
		PasswordValidator,
		DFSAmountPipe,
		SafePipe
	],
	exports: []
})
export class CoreModule {
	constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
		throwIfAlreadyLoaded(parentModule, 'CoreModule');
	}
}
