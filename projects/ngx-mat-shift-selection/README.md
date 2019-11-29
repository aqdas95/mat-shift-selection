# NgxMatShiftSelection

This is a simple date and time selection component design specificly for job shifts etc, with 24-hours available option.

## Installation:
1. Download from npm:
`npm install ngx-mat-shift-selection --save`  
2. import the `NgxMatShiftSelectionModule` module:  
 `import { NgxMatShiftSelectionModule } from 'ngx-mat-shift-selection';`  
3. Add `NgxMatShiftSelectionModule` to your module imports:  
```ts
 @NgModule({
   ...
   imports: [
     ...
     NgxMatShiftSelectionModule
   ]
 })
```
## Usage
Put the <ngx-mat-shift-selection></ngx-mat-shift-selection> component selector wherever you need it.


### Attributes:  

| Name                 | Type               | Default                                                                   | description                                                                                                                                                                                                                  |
|----------------------|:------------------:|:------------------------------------------------------------------------:|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| selectedDates             | `Input` -> `CalendarDate[]`          | `[]`                                                  | This input `selectedDates` data that will be shown in the calendar when the component initiates.                     |
| calendarType              | `Input` -> `String`                | `"month"`                                               | The input `calendarType` changes the view of the calendar, available options: `"month"` and `"week"`.                |
| class                     | `Input` -> `String`                | `""`                                                    | This is a simple class string that you wish to apply to the main div of the component e.g. `[class]="'mat-elevation-z4 p-4'"` etc                                                                                                             |
| onSelectDate              | `Input` -> `EventEmitter<CalendarDate[]>`     |                                              | This is the output event for the component that emit back selected values to it parent.                              |
