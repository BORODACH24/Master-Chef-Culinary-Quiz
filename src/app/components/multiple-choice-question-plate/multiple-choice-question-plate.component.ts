import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import {
    FormArray,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
} from "@angular/forms";
import { TuiCheckboxLabeledModule } from "@taiga-ui/kit";
import { Question } from "../../interfaces/questions";

@Component({
    selector: "app-multiple-choice-question-plate",
    standalone: true,
    imports: [TuiCheckboxLabeledModule, CommonModule, ReactiveFormsModule],
    templateUrl: "./multiple-choice-question-plate.component.html",
    styleUrl: "./multiple-choice-question-plate.component.scss",
})
export class MultipleChoiceQuestionPlateComponent implements OnInit {
    @Input() public question?: Question;
    @Input() public control!: FormControl;
    public form = new FormGroup({
        answers: new FormArray([]),
    });
    public ngOnInit(): void {
        this.question?.answers.forEach(() => {
            (this.form.get("answers") as FormArray).push(
                new FormControl(false)
            );
        });
        this.form.valueChanges.subscribe((data) => {
            console.log(data);
            const temp = data.answers?.map((item, index) =>
                item ? this.question?.answers[index] : null
            );
            this.control.setValue(temp?.filter((item)=>item));
        });
    }
}
