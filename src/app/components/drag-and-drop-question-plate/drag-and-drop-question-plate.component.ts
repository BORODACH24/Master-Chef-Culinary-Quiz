import { ChangeDetectorRef, Component, DestroyRef, Input, OnInit, OnChanges } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormControl } from "@angular/forms";
import { TuiSvgModule } from "@taiga-ui/core";
import { TuiTilesModule } from "@taiga-ui/kit";
import { Subject } from "rxjs";
import { Answer, Question } from "../../interfaces/questions";
import { BackendService } from "../../services/backend.service";
import { DraggablePlateComponent } from "../draggable-plate/draggable-plate.component";

@Component({
    selector: "app-drag-and-drop-question-plate",
    standalone: true,
    imports: [DraggablePlateComponent, TuiTilesModule, TuiSvgModule],
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
                
                this.question?.images?.forEach((item, index) => {
                    this.classes[index] =
                        item.name === this.control.value?.[index].answer
                            ? "content correct"
                            : "content incorrect";
                });
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
            answer[Number(this.order.get(key))] = this.question?.answers[Number(key)];
        }
        this.control.setValue(answer);
    }
}
