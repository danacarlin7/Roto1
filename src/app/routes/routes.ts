import { LayoutComponent } from '../layout/layout.component';

export const routes = [
	{
		path: '',
		component: LayoutComponent,
		loadChildren: './front/front.module#FrontModule'
	},

	{
		path: '**',
		redirectTo: ''
	}
];