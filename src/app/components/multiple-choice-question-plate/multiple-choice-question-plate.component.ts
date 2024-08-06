import { Component, Input, OnInit } from "@angular/core";
import { Question } from "../../interfaces/questions";
import {
    FormArray,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
} from "@angular/forms";
import { TuiCheckboxLabeledModule } from "@taiga-ui/kit";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-multiple-choice-question-plate",
    standalone: true,
    imports: [TuiCheckboxLabeledModule, CommonModule, ReactiveFormsModule],
    templateUrl: "./multiple-choice-question-plate.component.html",
    styleUrl: "./multiple-choice-question-plate.component.scss",
})
export class MultipleChoiceQuestionPlateComponent implements OnInit {
    @Input() question?: Question;
    @Input() control!: FormControl;
    public form = new FormGroup({
        answers: new FormArray([]),
    });
    ngOnInit(): void {
        this.question?.answers.forEach(item => {
            (this.form.get("answers") as FormArray).push(
                new FormControl(false)
            );
        });
        this.form.valueChanges.subscribe(data => {
            console.log(data);
            let temp = data.answers?.map((item, index) =>
                item ? this.question?.answers[index] : null
            );
            this.control.setValue(temp?.filter((item)=>item));
        });
    }
}
