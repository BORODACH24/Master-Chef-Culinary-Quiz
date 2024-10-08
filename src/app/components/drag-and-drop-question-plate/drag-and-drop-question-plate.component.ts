import {
    ChangeDetectorRef,
    Component,
    DestroyRef,
    Input,
    OnChanges,
    OnInit,
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormControl } from "@angular/forms";
import { TuiSvgModule } from "@taiga-ui/core";
import { TuiTilesModule } from "@taiga-ui/kit";
import { Subject } from "rxjs";
import { Answer, Question } from "../../interfaces/questions";
import { BackendService } from "../../services/backend.service";

@Component({
    selector: "app-drag-and-drop-question-plate",
    standalone: true,
    imports: [TuiTilesModule, TuiSvgModule],
    templateUrl: "./drag-and-drop-question-plate.component.html",
    styleUrl: "./drag-and-drop-question-plate.component.scss",
})
export class DragAndDropQuestionPlateComponent implements OnInit, OnChanges {
    @Input() public question?: Question;
    @Input() public control: FormControl = new FormControl();
    @Input() public changingValue?: Subject<boolean>;
    public classes: string[] = [];
    public plateClass = "question-plate";
    public flag = false;

    public order = new Map();

    constructor(
        private cdr: ChangeDetectorRef,
        private backend: BackendService,
        private destroy: DestroyRef
    ) {}

    public ngOnInit(): void {
        this.changingValue
            ?.pipe(takeUntilDestroyed(this.destroy))
            .subscribe(() => {
                this.flag = true;

                this.plateClass = this.backend.check.checkDragAndDropAnswer(
                    this.control.value as Answer[],
                    this.question as Question
                )
                    ? "question-plate correct"
                    : "question-plate incorrect";

                (this.control.value as Answer[]).forEach((item, index) => {
                    // console.log(
                    //     index,
                    //     item.answer,
                    //     this.question?.images?.[index].name
                    // );

                    this.classes[index] =
                        item.answer === this.question?.images?.[index].name
                            ? "content correct"
                            : "content incorrect";
                });
                // console.log(this.classes);
                this.cdr.markForCheck();
            });
    }
    public ngOnChanges(): void {
        this.classes = [];
        this.question?.answers.forEach(() => {
            this.classes.push("content");
        });
        this.plateClass = "question-plate";
        this.flag = false;
        this.control.setValue(this.question?.answers);
    }
    public onOrderChange(): void {
        const answer = [];
        for (const key of this.order.keys()) {
            answer[Number(this.order.get(key))] =
                this.question?.answers[Number(key)];
        }
        this.control.setValue(answer);
    }
}
