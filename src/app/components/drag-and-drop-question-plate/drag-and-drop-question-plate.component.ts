import { ChangeDetectorRef, Component, DestroyRef, Input } from '@angular/core';
import { Answer, Question } from '../../interfaces/questions';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-drag-and-drop-question-plate',
  standalone: true,
  imports: [],
  templateUrl: './drag-and-drop-question-plate.component.html',
  styleUrl: './drag-and-drop-question-plate.component.scss'
})
export class DragAndDropQuestionPlateComponent {
  @Input() public question?: Question;
  @Input() public control: FormControl = new FormControl();
  @Input() public changingValue?: Subject<boolean>;
  public classes: string[] = [];
  public plateClass = "question-plate";
  public flag = false;

  constructor(private cdr: ChangeDetectorRef, private destroy: DestroyRef) {}

  public ngOnInit(): void {
      this.changingValue
      ?.pipe(takeUntilDestroyed(this.destroy))
      .subscribe(() => {
          this.flag = true;

          this.plateClass = (this.control.value as Answer)?.correct
              ? "question-plate correct"
              : "question-plate incorrect";

          const correctIndex = this.question?.answers.findIndex(
              element => element.correct
          );
          this.classes[correctIndex as number] = "question-answer correct";
          this.cdr.markForCheck();
      });
  }
  public ngOnChanges(): void {
      this.classes = [];
      this.question?.answers.forEach(element => {
          this.classes.push("question-answer");
      });
      this.plateClass = "question-plate";
      this.flag = false;
  }
}
