import {Component, OnInit} from '@angular/core';
import {Day, EntriesService} from "../entries.service";

@Component({
	selector: 'app-history',
	templateUrl: './history.component.html',
	styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

	public days: Day[];
	public totalOvertime: number;

	constructor(private entryService: EntriesService) {
	}

	ngOnInit() {
		this.days = this.entryService.getDays().sort((a, b) => b.date.localeCompare(a.date));
		this.totalOvertime = this.entryService.getTotalOvertime();
	}

	public calculateWorkTime(day: Day): number {
		const time = (new Date(day.endTime).getTime() - new Date(day.startTime).getTime()) / 1000 / 60;
		const workTime = time - this.calculatePauseTime(day);
		return workTime / 60;
	}

	public calculatePauseTime(day: Day): number {
		console.log(day.pauses);
		return Math.floor(day.pauses
			.filter(pause => "endTime" in pause)
			.map(pause => new Date(pause.endTime).getTime() - new Date(pause.startTime).getTime())
			.map(time => time / 1000 / 60)
			.reduce((cur, next) => cur + next, 0));
	}
}
