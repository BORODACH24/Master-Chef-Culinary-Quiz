import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import {
  FormControl,
  ReactiveFormsModule
} from "@angular/forms";
import { TuiRadioLabeledModule } from "@taiga-ui/kit";
import { Question } from "../../interfaces/questions";

@Component({
    selector: "app-simple-question-plate",
    standalone: true,
    imports: [CommonModule, TuiRadioLabeledModule, ReactiveFormsModule],
    templateUrl: "./simple-question-plate.component.html",
    styleUrl: "./simple-question-plate.component.scss",
})
export class SimpleQuestionPlateComponent implements OnInit {
    @Input() public question?: Question;
    @Input() public control!: FormControl;

    public ngOnInit(): void {
        // this.question?.answers.forEach((item)=>(this.answerForm.get("answers") as FormArray).push(new FormControl()))
        this.control?.valueChanges.subscribe((data) => {
            console.log(data);
        });
    }
}
