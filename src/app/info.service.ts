import {Injectable} from '@angular/core';
import {Day, EntriesService} from "./entries.service";
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import "rxjs/operator/first";

@Injectable()
export class InfoService {
	private static DEFAULT_PAUSE_TIME: number = 30 * 60 * 1000;
	private static DEFAULT_WORKDAY_TIME: number = 7.5 * 60 * 60 * 1000;

	private infoSubject: BehaviorSubject<string>;
	public infoText$: Observable<string>;

	private currentDay: Day;

	constructor(private entryService: EntriesService) {
		this.infoSubject = new BehaviorSubject<string>("");
		this.infoText$ = this.infoSubject.asObservable();

		this.entryService.currentDay$.subscribe(day => {
			this.currentDay = day;
			this.infoSubject.next(InfoService.generateInfoText(day));
		});
	}

	public refreshInfoText() {
		this.infoSubject.next(InfoService.generateInfoText(this.currentDay));
	}

	private static generateInfoText(day: Day) {
		if (!("startTime" in day)) {
			return "Go ahead, start your workday.";
		}

		if (day.pauses.length > 0 && !("endTime" in day.pauses[day.pauses.length - 1])) {
			return InfoService.generatePauseText(day);
		}

		return InfoService.generateWorkText(day);
	}

	private static generatePauseText(day: Day): string {
		const pauseStartTime: Date = new Date(day.pauses[day.pauses.length - 1].startTime);
		const projectedPauseEndTime: Date = new Date(pauseStartTime.getTime() + InfoService.DEFAULT_PAUSE_TIME);

		const minutesRemaining = Math.floor((projectedPauseEndTime.getTime() - new Date().getTime()) / 1000 / 60);
		if (minutesRemaining < 0) {
			const pauseTime = Math.floor((new Date().getTime() - pauseStartTime.getTime()) / 1000 / 60);
			return `Back to work! Pause time ${pauseTime}min.`;
		}
		return `Remaining Pause time ${minutesRemaining}min.`;
	}

	private static generateWorkText(day: Day): string {
		let pauseSums = day.pauses.map(pause => new Date(pause.endTime).getTime() - new Date(pause.startTime).getTime()).reduce((cur, next) => cur + next, 0);
		if (pauseSums > InfoService.DEFAULT_PAUSE_TIME) {
			pauseSums = InfoService.DEFAULT_PAUSE_TIME;
		}
		const endTime = new Date(new Date(day.startTime).getTime() + InfoService.DEFAULT_WORKDAY_TIME + pauseSums);

		return `Projected End time: ${endTime.getHours()}:${endTime.getMinutes()}`;
	}
}
