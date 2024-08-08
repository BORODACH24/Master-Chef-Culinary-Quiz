import { CommonModule } from "@angular/common";
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnInit,
    ViewChildren,
    QueryList,
    Renderer2,
    ElementRef
} from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { TuiRadioLabeledModule } from "@taiga-ui/kit";
import { Subject } from "rxjs/internal/Subject";
import { Question } from "../../interfaces/questions";

@Component({
    selector: "app-simple-question-plate",
    standalone: true,
    imports: [CommonModule, TuiRadioLabeledModule, ReactiveFormsModule],
    templateUrl: "./simple-question-plate.component.html",
    styleUrl: "./simple-question-plate.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleQuestionPlateComponent implements OnInit {
    @Input() public question?: Question;
    @Input() public control!: FormControl;
    @Input() public changingValue?: Subject<boolean>;
    @ViewChildren('answers') elements?: QueryList<ElementRef>;
    public label = "";

    constructor(private cdr: ChangeDetectorRef, private renderer: Renderer2) {}

    public ngOnInit(): void {
        this.changingValue?.subscribe(() => {
            // this.elements?.get(0)?.nativeElement.classList.add('currect')
            // console.log(this.elements?.get(0)?.nativeElement.classList.add('currect'));
            this.renderer.addClass(this.elements?.get(0)?.nativeElement, 'correct');
            
            this.label = "test";
            this.cdr.markForCheck();
        });
    }
}
