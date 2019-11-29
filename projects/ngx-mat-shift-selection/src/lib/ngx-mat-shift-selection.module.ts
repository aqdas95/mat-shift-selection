import { NgModule } from "@angular/core";
import { NgxMatShiftSelectionComponent } from "./ngx-mat-shift-selection.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { DpDatePickerModule } from "ng2-date-picker";
import {
  MatFormFieldModule,
  MatInputModule,
  MatAutocompleteModule,
  MatCheckboxModule,
  MatDividerModule,
  MatButtonModule,
  MatIconModule
} from "@angular/material";

@NgModule({
  declarations: [NgxMatShiftSelectionComponent],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [NgxMatShiftSelectionComponent]
})
export class NgxMatShiftSelectionModule {}
