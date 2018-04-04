import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

export type EntryType = "start" | "pause-begin" | "pause-end" | "end";

export interface Day {
	date: string;
	startTime?: string;
	endTime?: string;
	pauses: Pause[];
}

export interface Pause {
	startTime: string;
	endTime?: string;
}

@Injectable()
export class EntriesService {

	private currentDaySubject: BehaviorSubject<Day>;
	public currentDay$: Observable<Day>;

	constructor() {
		this.currentDaySubject = new BehaviorSubject<Day>(this.getDay(new Date()));
		this.currentDay$ = this.currentDaySubject.asObservable();
	}

	public addEntry(type: EntryType) {
		const now = new Date().toISOString();
		const day = this.getDay(new Date());
		if(type === "start") {
			day.startTime = now;
		} else if(type === "pause-begin") {
			day.pauses.push({startTime: now});
		} else if(type === "pause-end") {
			day.pauses[day.pauses.length - 1].endTime = now;
		} else if(type === "end") {
			day.endTime = now;
		}
		this.saveDay(day);
		this.currentDaySubject.next(day);
	}

	public getDay(date: Date): Day {
		const dayKey = date.toISOString().substr(0, "YYYY-MM-DD".length);
		const dayStr = localStorage.getItem(`day:${dayKey}`);
		if(dayStr) {
			return JSON.parse(dayStr);
		}
		return {date: dayKey, pauses: []};
	}

	public saveDay(day: Day): void {
		localStorage.setItem(`day:${day.date}`, JSON.stringify(day));
	}
}
