import { CommonModule } from "@angular/common";
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnChanges,
    OnInit,
    DestroyRef
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { TuiRadioLabeledModule } from "@taiga-ui/kit";
import { Subject } from "rxjs";
import { Answer, Question } from "../../interfaces/questions";

@Component({
    selector: "app-simple-question-plate",
    standalone: true,
    imports: [CommonModule, TuiRadioLabeledModule, ReactiveFormsModule],
    templateUrl: "./simple-question-plate.component.html",
    styleUrl: "./simple-question-plate.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleQuestionPlateComponent implements OnInit, OnChanges {
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
                (element) => element.correct
            );
            this.classes[correctIndex as number] = "question-answer correct";
            this.cdr.markForCheck();
        });
    }
    public ngOnChanges(): void {
        this.classes = [];
        this.question?.answers.forEach(() => this.classes.push("question-answer"));
        this.plateClass = "question-plate";
        this.flag = false;
    }
}
