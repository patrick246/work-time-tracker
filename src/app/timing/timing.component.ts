import {Component, OnInit} from '@angular/core';
import {Day, EntriesService, EntryType} from "../entries.service";
import {InfoService} from "../info.service";

@Component({
	selector: 'app-timing',
	templateUrl: './timing.component.html',
	styleUrls: ['./timing.component.css']
})
export class TimingComponent implements OnInit {

	public today: Day;
	public info: string;

	constructor(private entriesService: EntriesService, private infoService: InfoService) {
	}

	ngOnInit() {
		this.entriesService.currentDay$.subscribe(d => this.today = d);
		this.infoService.infoText$.subscribe(info => this.info = info);
		setTimeout(() => this.refreshInfo(), 1000*60);
	}

	private refreshInfo(): void {
		this.infoService.refreshInfoText();
		setTimeout(() => this.refreshInfo(), 1000*60);
	}

	public onClick(type: EntryType) {
		const entry = this.entriesService.addEntry(type);
	}

	public shouldShowStart(): boolean {
		return !("startTime" in this.today);
	}

	public shouldShowPauseStart(): boolean {
		return "startTime" in this.today && (this.today.pauses.length === 0 || "endTime" in this.today.pauses[this.today.pauses.length - 1]) && !("endTime" in this.today);
	}

	public shouldShowPauseEnd(): boolean {
		return "startTime" in this.today && this.today.pauses.length !== 0 && !("endTime" in this.today.pauses[this.today.pauses.length - 1]) && !("endTime" in this.today);
	}

	public shouldShowEnd(): boolean {
		return "startTime" in this.today && (this.today.pauses.length === 0 || "endTime" in this.today.pauses[this.today.pauses.length - 1]) && !("endTime" in this.today);
	}
}
