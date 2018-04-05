import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TimingComponent} from "./timing/timing.component";
import {HistoryComponent} from "./history/history.component";

const routes: Routes = [
	{
		path: '',
		redirectTo: 'timing',
		pathMatch: 'full'
	},
	{
		path: 'timing',
		component: TimingComponent
	},
	{
		path: 'history',
		component: HistoryComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
