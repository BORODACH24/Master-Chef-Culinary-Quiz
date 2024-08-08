import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { TuiInputModule } from "@taiga-ui/kit";
import { Question } from "../../interfaces/questions";
import { Subject } from "rxjs/internal/Subject";

@Component({
  selector: "app-input-question-plate",
  standalone: true,
  imports: [ReactiveFormsModule, TuiInputModule],
  templateUrl: "./input-question-plate.component.html",
  styleUrl: "./input-question-plate.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputQuestionPlateComponent implements OnInit {
  @Input() public question?: Question;
  @Input() public control!: FormControl;
  @Input() public changingValue?: Subject<boolean>;

  constructor(private cdr: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.changingValue?.subscribe(() => {
        this.cdr.markForCheck();
    });
}
}
