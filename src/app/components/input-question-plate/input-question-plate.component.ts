import { Component, Input } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { TuiInputModule } from "@taiga-ui/kit";
import { Question } from "../../interfaces/questions";

@Component({
  selector: "app-input-question-plate",
  standalone: true,
  imports: [ReactiveFormsModule, TuiInputModule],
  templateUrl: "./input-question-plate.component.html",
  styleUrl: "./input-question-plate.component.scss"
})
export class InputQuestionPlateComponent {
  @Input() public question?: Question;
  @Input() public control!: FormControl;
}
