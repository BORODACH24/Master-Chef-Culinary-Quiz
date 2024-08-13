import { CommonModule } from "@angular/common";
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DestroyRef,
    ElementRef,
    Inject,
    OnInit,
    ViewChild,
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import {
    FormArray,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import {
    TuiDialogContext,
    TuiDialogService,
    TuiDialogSize,
    TuiScrollbarModule,
    TuiSvgModule,
} from "@taiga-ui/core";
import { PolymorpheusContent } from "@tinkoff/ng-polymorpheus";
import { Subject } from "rxjs/internal/Subject";
import { rounds } from "../../../../public/questions";
import { DragAndDropQuestionPlateComponent } from "../../components/drag-and-drop-question-plate/drag-and-drop-question-plate.component";
import { InputQuestionPlateComponent } from "../../components/input-question-plate/input-question-plate.component";
import { MultipleChoiceQuestionPlateComponent } from "../../components/multiple-choice-question-plate/multiple-choice-question-plate.component";
import { SimpleQuestionPlateComponent } from "../../components/simple-question-plate/simple-question-plate.component";
import { TopBarComponent } from "../../components/top-bar/top-bar.component";
import { Question, Round } from "../../interfaces/questions";
import { BackendService } from "../../services/backend.service";

@Component({
    selector: "app-game-page",
    standalone: true,
    imports: [
        SimpleQuestionPlateComponent,
        MultipleChoiceQuestionPlateComponent,
        CommonModule,
        ReactiveFormsModule,
        InputQuestionPlateComponent,
        TuiScrollbarModule,
        TopBarComponent,
        DragAndDropQuestionPlateComponent,
        TuiSvgModule
    ],
    templateUrl: "./game-page.component.html",
    styleUrl: "./game-page.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamePageComponent implements OnInit {
    @ViewChild("header", { static: true }) header: ElementRef | undefined;
    @ViewChild("content", { static: true }) content: ElementRef | undefined;

    public changingValue = new Subject<boolean>();

    public rounds: Round[] = [];
    public roundIndex = 0;
    public roundQuestions: Question[] = [];
    public form = new FormGroup({
        questions: new FormArray([]),
    });
    public result = {
        rightAnswers: 0,
        image: "",
        header: "",
        message: "",
    };

    constructor(
        @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
        private router: Router,
        private cdr: ChangeDetectorRef,
        private destroy: DestroyRef,
        private backend: BackendService,
    ) {}

    public ngOnInit(): void {
        this.rounds = rounds;
        this.renderQuestions();        
    }

    public renderQuestions(): void {
        this.roundQuestions = rounds[this.roundIndex].questions;
        this.randomizeRound();
        this.form = new FormGroup({
            questions: new FormArray([]),
        });
        this.roundQuestions.forEach(() => {
            (this.form.get("questions") as FormArray).push(
                new FormControl(null, Validators.required)
            );
        });
    }

    public randomizeRound() {
        this.roundQuestions
            .sort(() => Math.random() - 0.5)
            .forEach(item => {
                item.answers.sort(() => Math.random() - 0.5);
                if (item.type === "drag") {
                    item.images?.sort(() => Math.random() - 0.5);
                }
            });
    }

    public onSubmit(): void {
        this.changingValue.next(true);
        const a = this.backend.check.checkAnswers(
            this.form.value.questions as [],
            this.roundQuestions
        );
        this.backend.achivements.checkAchivements();
        console.log(a);
        
        this.result.rightAnswers = a;
        if (a === 5) {
            this.backend.audio.resultSound(2)
            this.result.image = "/images/congratulation-background-2.jpg";
            this.result.header = `You have passed Round ${this.roundIndex + 1}`;
            this.result.message = "Excellent! Good job.";
        } else if (a === 0) {
            this.backend.audio.resultSound(0)
            this.result.image = "/images/failure-background.jpg";
            this.result.header = `You haven't passed Round ${this.roundIndex + 1}`;
            this.result.message = "Try one more time.";
        } else {
            this.backend.audio.resultSound(1)
            this.result.image = "/images/congratulation-background-1.jpg";
            this.result.header = `You have passed Round ${this.roundIndex + 1}`;
            this.result.message = "Nice! Can be better?";
        }
        
        this.showDialog(
            this.content,
            this.header,
            "m",
            this.result.header
        );
    }
    public onButtonClick(): void{
        this.backend.audio.buttonSound()
    }
    public onDialogMenuButtonClick(observer?: any) {
        observer?.complete();
        this.router.navigate(["main"]);
    }
    public onDialogRestartButtonClick(observer: any) {
        observer.complete();
        console.log(this.roundIndex, this.roundIndex + 1, rounds.length);
        this.renderQuestions();
        this.cdr.detectChanges();
    }
    public onDialogNextButtonClick(observer: any) {
        observer.complete();
        console.log(this.roundIndex, this.roundIndex + 1, rounds.length);
        this.roundIndex++;
        if (this.roundIndex >= rounds.length) {
            this.roundIndex = 0;
            console.log(this.roundIndex);
        }
        this.renderQuestions();
        this.cdr.detectChanges();
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
            .pipe(takeUntilDestroyed(this.destroy))
            .subscribe();
    }

}
