import { CommonModule } from "@angular/common";
import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Inject,
    ViewChild,
    ElementRef,
} from "@angular/core";
import {
    FormArray,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";
import { rounds } from "../../../../public/questions";
import { InputQuestionPlateComponent } from "../../components/input-question-plate/input-question-plate.component";
import { MultipleChoiceQuestionPlateComponent } from "../../components/multiple-choice-question-plate/multiple-choice-question-plate.component";
import { SimpleQuestionPlateComponent } from "../../components/simple-question-plate/simple-question-plate.component";
import { Answer, Question, Round } from "../../interfaces/questions";
import {
    TuiDialogContext,
    TuiDialogService,
    TuiDialogSize,
} from "@taiga-ui/core";
import { PolymorpheusContent } from "@tinkoff/ng-polymorpheus";
import { Observable, tap } from "rxjs";
import { Router } from "@angular/router";

@Component({
    selector: "app-game-page",
    standalone: true,
    imports: [
        SimpleQuestionPlateComponent,
        MultipleChoiceQuestionPlateComponent,
        CommonModule,
        ReactiveFormsModule,
        InputQuestionPlateComponent,
    ],
    templateUrl: "./game-page.component.html",
    styleUrl: "./game-page.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamePageComponent implements OnInit {
    @ViewChild("header", { static: true }) header: ElementRef | undefined;
    @ViewChild("content", { static: true }) content: ElementRef | undefined;

    public rounds: Round[] = [];
    public roundIndex = 0;
    public roundQuestions: Question[] = [];
    public form = new FormGroup({
        questions: new FormArray([]),
    });

    constructor(
        @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
        private router: Router,
        private cdr: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        this.rounds = rounds;
        this.renderQuestions();
    }
    public renderQuestions(): void {
        this.roundQuestions = rounds[this.roundIndex].questions;
        this.form = new FormGroup({
            questions: new FormArray([]),
        });
        this.roundQuestions.forEach(() => {
            (this.form.get("questions") as FormArray).push(
                new FormControl(null, Validators.required)
            );
        });
    }

    public onSubmit(): void {
        if (this.checkAnswers(this.form.value)) {
            this.showDialog(
                this.content,
                this.header,
                "m",
                `You have passed Round ${this.roundIndex + 1}`
            );
        }
    }
    public checkAnswers(value: any): boolean {
        console.log(this.form);
        const a = value.questions?.every(
            (item: Answer | Answer[], index: number) => {
                console.log(item);
                console.log(typeof item);
                if (item instanceof Array) {
                    return this.checkMultipleAnswer(item, index);
                } else if (typeof item === typeof "") {
                    return this.checkInputAnswer(item.toString(), index);
                }

                console.log((item as Answer)?.correct);

                return (item as Answer)?.correct;
            }
        );
        console.log(a);
        return a;
    }
    private checkMultipleAnswer(answer: Answer[], index: number): boolean {
        const currectAnswersNum = this.roundQuestions[index].answers.filter(
            item => item.correct
        ).length;
        if (currectAnswersNum === answer.length) {
            return (answer as Answer[])?.every(element => {
                console.log(element);

                return element.correct;
            });
        }
        return false;
    }
    private checkInputAnswer(item: string, index: number): boolean {
        return (
            item.toLowerCase() ===
            this.roundQuestions[index].answers[0].answer.toLowerCase()
        );
    }
    private showDialog(
        content: PolymorpheusContent<TuiDialogContext>,
        header: PolymorpheusContent,
        size: TuiDialogSize,
        label: string
    ): void {
        this.dialogs
            .open(content, {
                label,
                header,
                size,
            })
            .subscribe();
    }
    public onDialogNextButtonClick(observer: any) {
        observer.complete();
        if (++this.roundIndex > rounds.length) {
            this.roundIndex = 0;
        }
        this.renderQuestions();
        this.cdr.detectChanges();
    }
    public onDialogMenuButtonClick(observer: any) {
        observer.complete();
        this.router.navigate(["main"])
    }
}
