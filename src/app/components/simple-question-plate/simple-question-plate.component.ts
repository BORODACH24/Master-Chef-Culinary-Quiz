import { Component, Input, OnInit } from "@angular/core";
import { Question } from "../../interfaces/questions";
import { CommonModule } from "@angular/common";
import { TuiRadioLabeledModule, TuiRadioModule } from "@taiga-ui/kit";
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
    selector: "app-simple-question-plate",
    standalone: true,
    imports: [CommonModule, TuiRadioLabeledModule, ReactiveFormsModule],
    templateUrl: "./simple-question-plate.component.html",
    styleUrl: "./simple-question-plate.component.scss",
})
export class SimpleQuestionPlateComponent implements OnInit {
    @Input() question?: Question;
    @Input() control!: FormControl;

    ngOnInit(): void {
      // this.question?.answers.forEach((item)=>(this.answerForm.get("answers") as FormArray).push(new FormControl()))
      this.control?.valueChanges
      .subscribe((data)=>{
        console.log(data);
        
      })
    }
}
