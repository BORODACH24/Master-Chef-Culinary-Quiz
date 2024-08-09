import { CommonModule } from "@angular/common";
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Inject,
    OnInit,
    ViewChild,
} from "@angular/core";
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
} from "@taiga-ui/core";
import {Subject} from 'rxjs/internal/Subject';
import { PolymorpheusContent } from "@tinkoff/ng-polymorpheus";
import { rounds } from "../../../../public/questions";
import { InputQuestionPlateComponent } from "../../components/input-question-plate/input-question-plate.component";
import { MultipleChoiceQuestionPlateComponent } from "../../components/multiple-choice-question-plate/multiple-choice-question-plate.component";
import { SimpleQuestionPlateComponent } from "../../components/simple-question-plate/simple-question-plate.component";
import { Answer, Question, Round } from "../../interfaces/questions";
import { TopBarComponent } from "../../components/top-bar/top-bar.component";
import { BackendService } from "../../services/backend.service";
import { DragAndDropQuestionPlateComponent } from "../../components/drag-and-drop-question-plate/drag-and-drop-question-plate.component";


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
    DragAndDropQuestionPlateComponent
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
    public roundIndex = 3;
    public roundQuestions: Question[] = [];
    public form = new FormGroup({
        questions: new FormArray([]),
    });

    constructor(
        @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
        private router: Router,
        private cdr: ChangeDetectorRef,
        private backend: BackendService
    ) {}

    public ngOnInit(): void {
        this.rounds = rounds;
        this.renderQuestions();
    }
    public renderQuestions(): void {
        this.roundQuestions = rounds[this.roundIndex].questions;
        this.randomizeAnswers()
        this.form = new FormGroup({
            questions: new FormArray([]),
        });
        this.roundQuestions.forEach(() => {
            (this.form.get("questions") as FormArray).push(
                new FormControl(null, Validators.required)
            );
        });
    }

    public randomizeAnswers() {
        this.roundQuestions.forEach((item)=>{
            item.answers.sort(() => Math.random() - 0.5); 
        })
    }

    public onSubmit(): void {
        this.changingValue.next(true)
        const a = this.backend.check.checkAnswers(this.form.value.questions as Answer[], this.roundQuestions)
        // console.log(a);
        
        if (a) {
            this.showDialog(
                this.content,
                this.header,
                "m",
                `You have passed Round ${this.roundIndex + 1}`
            );
        }
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
        console.log(this.roundIndex, this.roundIndex+1, rounds.length);
        this.roundIndex++
        if (this.roundIndex >= rounds.length) {
            this.roundIndex = 0;
            console.log(this.roundIndex);
            
        }
        this.renderQuestions();
        this.cdr.detectChanges();
    }

    public onDialogMenuButtonClick(observer?: any) {
        observer?.complete();
        this.router.navigate(["main"]);
    }
}
