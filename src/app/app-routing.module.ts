import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TimingComponent} from "./timing/timing.component";

const routes: Routes = [
	{
		path: '',
		redirectTo: 'timing',
		pathMatch: 'full'
	},
	{
		path: 'timing',
		component: TimingComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
