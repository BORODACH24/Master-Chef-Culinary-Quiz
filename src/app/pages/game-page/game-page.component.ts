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
import { GameResult, Result } from "../../interfaces/results";
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
        TuiSvgModule,
    ],
    templateUrl: "./game-page.component.html",
    styleUrl: "./game-page.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamePageComponent implements OnInit {
    @ViewChild("header", { static: true }) public header: ElementRef | undefined;
    @ViewChild("content", { static: true }) public content: ElementRef | undefined;
    @ViewChild("finalHeader", { static: true }) public finalHeader: ElementRef | undefined;
    @ViewChild("finalContent", { static: true }) public finalContent: ElementRef | undefined;

    public changingValue = new Subject<boolean>();

    public rounds: Round[] = [];
    public roundIndex = 0;
    public roundQuestions: Question[] = [];
    public form = new FormGroup({
        questions: new FormArray([]),
    });
    public gameResult: GameResult = {
        result: 0,
        possibleResult: 0,
        header: "",
    };
    public result: Result = {
        roundFinished: false,
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
        private backend: BackendService
    ) {}

    public ngOnInit(): void {
        if (this.backend.difficulties.length === 0){
            this.backend.difficulties.push(1);
        }
        this.rounds = rounds.filter((item) =>
            this.backend.difficulties.includes(item.difficulty + 1)
        );
        this.renderQuestions();
    }

    public renderQuestions(): void {
        this.gameResult.rank = null;
        this.result.roundFinished = false;
        this.roundQuestions = this.rounds[this.roundIndex].questions;
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

    public randomizeRound(): void {
        this.roundQuestions
            .sort(() => Math.random() - 0.5)
            .forEach((item) => {
                item.answers.sort(() => Math.random() - 0.5);
                if (item.type === "drag") {
                    item.images?.sort(() => Math.random() - 0.5);
                }
            });
    }

    public onSubmit(): void {
        if (!this.result.roundFinished) {
            this.changingValue.next(true);
            const count = this.backend.check.checkAnswers(
                this.form.value.questions as [],
                this.roundQuestions
            );
            this.backend.achivements.checkAchivements();
            // console.log(count);

            this.result.rightAnswers = count;

            if (count === 5) {
                this.backend.audio.resultSound(2);
                this.result.image = "/images/result-backgroungs/congratulation-background-2.jpg";
                this.result.header = `You've passed Round ${
                    this.roundIndex + 1
                }`;
                this.result.message = "Excellent! Good job.";
            } else if (count === 0) {
                this.backend.audio.resultSound(0);
                this.result.image = "/images/result-backgroungs/failure-background.jpg";
                this.result.header = `You haven't passed Round ${
                    this.roundIndex + 1
                }`;
                this.result.message = "Try one more time.";
            } else {
                this.backend.audio.resultSound(1);
                this.result.image = "/images/result-backgroungs/congratulation-background-1.jpg";
                this.result.header = `You've passed Round ${
                    this.roundIndex + 1
                }`;
                this.result.message = "Nice! Can be better?";
            }
            this.result.roundFinished = true;
        }

        this.showDialog(this.content, this.header, "m", this.result.header);
    }
    public onButtonClick(): void {
        this.backend.audio.buttonSound();
    }
    public onDialogMenuButtonClick(observer?: any): void {
        observer?.complete();
        this.router.navigate(["main"]);
    }
    public onDialogRestartButtonClick(observer: any): void {
        observer.complete();
        this.renderQuestions();
        this.cdr.detectChanges();
    }
    public onDialogNextButtonClick(observer: any): void {
        observer.complete();
        this.gameResult.result +=
            this.result.rightAnswers *
            (this.rounds[this.roundIndex].difficulty + 1);
        this.gameResult.possibleResult +=
            this.roundQuestions.length *
            (this.rounds[this.roundIndex].difficulty + 1);
        this.roundIndex++;
        if (this.roundIndex < this.rounds.length) {
            this.renderQuestions();
            this.cdr.detectChanges();
        } else {
            this.finishGame();
        }
    }
    private finishGame(): void {
        this.backend.audio.resultSound(3);
        this.gameResult.header = `Condratulations! You've finished the game.`;
        this.result.message = `${this.gameResult.result}/${this.gameResult.possibleResult}`;
        // console.log(this.backend.ranks);
        
        this.backend.ranks.reduce((prev, item,)=>{
            // console.log(this.gameResult.result, item.points);
            
            if (!this.gameResult.rank && this.gameResult.result<item.points){
                this.gameResult.rank = prev;
            } else if (!this.gameResult.rank && this.gameResult.result === item.points){
                this.gameResult.rank = item;
            }
            return item;
        });
        this.showDialog(
            this.finalContent,
            this.finalHeader,
            "m",
            this.gameResult.header,
            false
        );
    }
    private showDialog(
        content: PolymorpheusContent<TuiDialogContext>,
        header: PolymorpheusContent,
        size: TuiDialogSize,
        label: string,
        closeable = true
    ): void {
        this.dialogs
            .open(content, {
                label,
                header,
                size,
                closeable,
                dismissible: closeable
            })
            .pipe(takeUntilDestroyed(this.destroy))
            .subscribe();
    }
}
