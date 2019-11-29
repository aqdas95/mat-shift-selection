import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from "@angular/core";

import * as _moment from 'moment'
const moment = _moment
type Moment = _moment.Moment

import * as _ from "lodash";

@Component({
  selector: "ngx-mat-shift-selection",
  templateUrl: "./ngx-mat-shift-selection.component.html",
  styleUrls: ["./ngx-mat-shift-selection.component.scss"]
})
export class NgxMatShiftSelectionComponent implements OnInit, OnChanges {
  currentDate = moment();
  dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  weeks: CalendarDate[][] = [];
  sortedDates: CalendarDate[] = [];

  selectAll: boolean = false;
  availableAll: boolean = false;

  time = [
    "00:00",
    "00:30",
    "01:00",
    "01:30",
    "02:00",
    "02:30",
    "03:00",
    "03:30",
    "04:00",
    "04:30",
    "05:00",
    "05:30",
    "06:00",
    "06:30",
    "07:00",
    "07:30",
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
    "22:30",
    "23:00",
    "23:30"
  ];

  @Input() selectedDates: CalendarDate[] = [];
  @Input() calendarType: String = "month";
  @Input() class: String = "";
  @Output() onSelectDate = new EventEmitter<CalendarDate[]>();

  constructor() {}

  ngOnInit(): void {
    this.generateCalendar();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.selectedDates &&
      changes.selectedDates.currentValue &&
      changes.selectedDates.currentValue.length > 1
    ) {
      // sort on date changes for better performance when range checking
      this.sortedDates = _.sortBy(
        changes.selectedDates.currentValue,
        (m: CalendarDate) => m.mDate.valueOf()
      );
      this.generateCalendar();
    }
  }

  async selectDate(date: CalendarDate) {
    date.selected = !date.selected;
    date.isFullTime = false;
    if (!date.selected) {
      await _.remove(this.selectedDates, v => {
        return v.mDate.format("ll") == date.mDate.format("ll");
      });
    } else {
      date.startTime = "";
      date.endTime = "";
      date.isTimerVisible =
        this.weeks[0][1].mDate.week() == date.mDate.week() &&
        !this.isPast(date.mDate);
      if (!this.isDuplicate(date.mDate)) this.selectedDates.push(date);
    }
    this.sortedDates = await _.sortBy(this.selectedDates, (m: CalendarDate) =>
      m.mDate.valueOf()
    );
    this.selectAll =  this.areAllSelected();
    this.availableAll =  this.areAllAvailable();
    this.onSelectDate.emit(this.sortedDates);
  }

  // date checkers

  isToday(date: Moment): boolean {
    return moment().isSame(moment(date), "day");
  }

  isSelected(date: Moment): boolean {
    return (
      _.findIndex(this.selectedDates, selectedDate => {
        return moment(date).isSame(selectedDate.mDate, "day");
      }) > -1
    );
  }

  isDuplicate(date: Moment): boolean {
    return (
      _.findIndex(this.selectedDates, selectedDate => {
        return moment(date).isSame(selectedDate.mDate, "day");
      }) > -1
    );
  }

  areAllSelected(): boolean {
    for (let v of this.weeks[0]) {
      if (!v.selected && !this.isPast(v.mDate)) return false;
    }
    return true;
  }

  areAllAvailable(): boolean {
    for (let v of this.sortedDates) {
      if (!v.isFullTime && v.isTimerVisible) return false;
    }
    for (let v of this.weeks[0]) {
      if (!v.selected) return false;
    }
    return true;
  }

  isFullTime(date: Moment): boolean {
    return (
      _.findIndex(this.selectedDates, selectedDate => {
        return (
          moment(date).isSame(selectedDate.mDate, "day") &&
          selectedDate.isFullTime
        );
      }) > -1
    );
  }

  isSelectedMonth(date: Moment): boolean {
    return moment(date).isSame(this.currentDate, "month");
  }

  isPast(date: Moment): boolean {
    return moment(date).isBefore(moment().subtract(1, "day"));
  }

  // actions from calendar

  prevMonth(): void {
    this.currentDate = moment(this.currentDate).subtract(1, "months");
    this.generateCalendar();
  }

  nextMonth(): void {
    this.currentDate = moment(this.currentDate).add(1, "months");
    this.generateCalendar();
  }

  nextWeek(): void {
    this.currentDate = moment(this.currentDate).add(1, "week");
    this.generateCalendar();
  }

  prevWeek(): void {
    this.currentDate = moment(this.currentDate).subtract(1, "week");
    this.generateCalendar();
  }

  firstMonth(): void {
    this.currentDate = moment(this.currentDate).startOf("year");
    this.generateCalendar();
  }

  lastMonth(): void {
    this.currentDate = moment(this.currentDate).endOf("year");
    this.generateCalendar();
  }

  prevYear(): void {
    this.currentDate = moment(this.currentDate).subtract(1, "year");
    this.generateCalendar();
  }

  nextYear(): void {
    this.currentDate = moment(this.currentDate).add(1, "year");
    this.generateCalendar();
  }

  // generate the calendar grid

  generateCalendar(): void {
    const dates = this.fillDates(this.currentDate);
    const weeks: CalendarDate[][] = [];
    while (dates.length > 0) {
      weeks.push(dates.splice(0, 7));
    }
    for (let v of this.sortedDates) {
      v.isTimerVisible =
        weeks[0][1].mDate.week() == v.mDate.week() && !this.isPast(v.mDate);
    }
    this.weeks = weeks;
    this.selectAll = this.areAllSelected();
    this.availableAll = this.areAllAvailable();
  }

  fillDates(currentMoment: Moment): CalendarDate[] {
    if (this.calendarType == "week") {
      const firstOfWeek = moment(currentMoment)
        .startOf("week")
        .day();
      const firstDayOfGrid = moment(currentMoment)
        .startOf("week")
        .subtract(firstOfWeek, "days");
      const start = firstDayOfGrid.date();
      return _.range(start, start + 7).map(
        (date: number): CalendarDate => {
          const d = moment(firstDayOfGrid).date(date);
          return {
            today: this.isToday(d),
            selected: this.isSelected(d),
            mDate: d,
            startTime: undefined,
            endTime: undefined,
            isTimerVisible: false,
            isFullTime: this.isFullTime(d)
          };
        }
      );
    }
    const firstOfMonth = moment(currentMoment)
      .startOf("month")
      .day();
    const firstDayOfGrid = moment(currentMoment)
      .startOf("month")
      .subtract(firstOfMonth, "days");
    const start = firstDayOfGrid.date();
    return _.range(start, start + 35).map(
      (date: number): CalendarDate => {
        const d = moment(firstDayOfGrid).date(date);
        return {
          today: this.isToday(d),
          selected: this.isSelected(d),
          mDate: d,
          startTime: undefined,
          endTime: undefined,
          isTimerVisible: false,
          isFullTime: this.isFullTime(d)
        };
      }
    );
  }

  timeChanged(val) {
    val.isFullTime =
      val.startTime == "00:00" &&
      val.endTime == "23:59" &&
    this.weeks[0].map(v => {
      if (v.mDate.format("ll") == val.mDate.format("ll")) {
        v.isFullTime = val.isFullTime;
      }
    });
    this.availableAll = this.areAllAvailable();
    this.onSelectDate.emit(this.sortedDates);
  }

  fullTimeChecked(val) {
    val.startTime = val.isFullTime ? "00:00" : "";
    val.endTime = val.isFullTime ? "23:59" : "";
    for (let v in this.sortedDates) {
      if (this.sortedDates[v].mDate.format("ll") == val.mDate.format("ll")) {
        this.sortedDates[v].startTime = val.startTime;
        this.sortedDates[v].endTime = val.endTime;
      }
    }
    this.timeChanged(val);
  }

  selectAllChecked() {
    for (let v of this.weeks[0]) {
      v.selected = this.selectAll;
      this.selectDate(v);
    }
  }

  async availableAllChecked() {
    this.availableAll = !this.availableAll;
    for (let v of this.sortedDates) {
      v.isFullTime = v.isTimerVisible ? this.availableAll : v.isFullTime;
      v.startTime = v.isFullTime ? "00:00" : "";
      v.endTime = v.isFullTime ? "23:59" : "";
      this.weeks[0].map(val => {
        if (val.mDate.format("ll") == v.mDate.format("ll")) {
          val.isFullTime = v.isFullTime;
        }
      });
    }
    this.onSelectDate.emit(this.sortedDates);
  }
}

export interface CalendarDate {
  mDate: Moment;
  selected?: boolean;
  today?: boolean;
  startTime: string;
  endTime: string;
  isTimerVisible?: boolean;
  isFullTime?: boolean;
}
