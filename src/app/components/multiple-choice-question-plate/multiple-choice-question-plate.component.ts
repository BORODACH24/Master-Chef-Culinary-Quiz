import { CommonModule } from "@angular/common";
import {
    Component,
    Input,
    OnInit,
    OnChanges,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    DestroyRef
} from "@angular/core";
import {
    FormArray,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
} from "@angular/forms";
import { TuiCheckboxLabeledModule } from "@taiga-ui/kit";
import { Answer, Question } from "../../interfaces/questions";
import { Subject } from "rxjs/internal/Subject";
import { BackendService } from "../../services/backend.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
    selector: "app-multiple-choice-question-plate",
    standalone: true,
    imports: [TuiCheckboxLabeledModule, CommonModule, ReactiveFormsModule],
    templateUrl: "./multiple-choice-question-plate.component.html",
    styleUrl: "./multiple-choice-question-plate.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultipleChoiceQuestionPlateComponent implements OnInit, OnChanges {
    @Input() public question?: Question;
    @Input() public control: FormControl = new FormControl();
    @Input() public changingValue?: Subject<boolean>;
    public classes: string[] = [];
    public plateClass = "question-plate";
    public flag = false;

    constructor(
        private cdr: ChangeDetectorRef,
        private backend: BackendService,
        private destroy: DestroyRef
    ) {}

    public form = new FormGroup({
        answers: new FormArray([]),
    });
    public ngOnInit(): void {
        this.form.valueChanges
        .pipe(takeUntilDestroyed(this.destroy))
        .subscribe(data => {
            console.log(data);
            const temp = data.answers?.map((item, index) =>
                item ? this.question?.answers[index] : null
            );

            this.control.setValue(temp?.filter(item => item));
        });
        this.changingValue
        ?.pipe(takeUntilDestroyed(this.destroy))
        .subscribe(() => {
            this.flag = true;

            this.question?.answers.forEach((element: Answer, index: number) => {
                if (element.correct) {
                    this.classes[index] = "question-answer correct";
                }
            });

            this.plateClass = this.backend.check.checkMultipleAnswer(
                this.control.value as Answer[],
                this.question as Question
            )
                ? "question-plate correct"
                : "question-plate incorrect";

            this.cdr.markForCheck();
        });
    }
    public ngOnChanges(): void {
        this.classes = [];
        this.form = new FormGroup({
            answers: new FormArray([]),
        });
        this.question?.answers.forEach(() => {
            (this.form.get("answers") as FormArray).push(
                new FormControl(false)
            );
            this.classes.push("question-answer");
        });
        this.plateClass = "question-plate";
        this.flag = false;
    }
}
