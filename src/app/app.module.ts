import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {TimingComponent} from './timing/timing.component';
import {EntriesService} from "./entries.service";
import {ServiceWorkerModule} from "@angular/service-worker";
import {environment} from "../environments/environment";
import {InfoService} from "./info.service";


@NgModule({
	declarations: [
		AppComponent,
		TimingComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production})
	],
	providers: [
		EntriesService,
		InfoService
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
