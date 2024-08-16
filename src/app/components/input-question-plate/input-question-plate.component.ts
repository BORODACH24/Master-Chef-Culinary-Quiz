import { CommonModule } from "@angular/common";
import {
    Component,
    Input,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    OnInit,
    OnChanges,
    DestroyRef
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { TuiInputModule } from "@taiga-ui/kit";
import { Subject } from "rxjs";
import { Question } from "../../interfaces/questions";
import { BackendService } from "../../services/backend.service";

@Component({
    selector: "app-input-question-plate",
    standalone: true,
    imports: [ReactiveFormsModule, TuiInputModule, CommonModule],
    templateUrl: "./input-question-plate.component.html",
    styleUrl: "./input-question-plate.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputQuestionPlateComponent implements OnInit, OnChanges {
    @Input() public question?: Question;
    @Input() public control: FormControl = new FormControl();
    @Input() public changingValue?: Subject<boolean>;
    public plateClass = "question-plate";
    public flag = false;

    constructor(private cdr: ChangeDetectorRef, private backend: BackendService, private destroy: DestroyRef) {}

    public ngOnInit(): void {
        this.changingValue
        ?.pipe(takeUntilDestroyed(this.destroy))
        .subscribe(() => {
            this.flag = true;

            this.plateClass = this.backend.check.checkInputAnswer(this.control.value, this.question as Question)
            ? "question-plate correct"
            : "question-plate incorrect";
            
            this.cdr.markForCheck();
        });
    }
    public ngOnChanges(): void {
        this.plateClass = "question-plate";
        this.flag = false;
    }
}
