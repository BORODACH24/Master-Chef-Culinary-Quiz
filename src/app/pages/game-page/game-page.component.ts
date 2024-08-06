import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { questions } from "../../../../public/questions";
import { MultipleChoiceQuestionPlateComponent } from "../../components/multiple-choice-question-plate/multiple-choice-question-plate.component";
import { SimpleQuestionPlateComponent } from "../../components/simple-question-plate/simple-question-plate.component";
import { Answer, Question } from "../../interfaces/questions";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-game-page",
    standalone: true,
    imports: [
        SimpleQuestionPlateComponent,
        MultipleChoiceQuestionPlateComponent,
        CommonModule,
        ReactiveFormsModule
    ],
    templateUrl: "./game-page.component.html",
    styleUrl: "./game-page.component.scss",
})
export class GamePageComponent implements OnInit {
    public questions = [];
    public roundQuestions: Question[] = [];
    public form = new FormGroup({
        questions: new FormArray([]),
    });

    ngOnInit(): void {
        this.questions = questions as [];
        this.roundQuestions = questions[7].questions as [];
        this.roundQuestions.forEach(item => {
            if (item.type === "multiple") {
                (this.form.get("questions") as FormArray).push(
                    new FormControl(null, Validators.required)
                );
            } else {
                (this.form.get("questions") as FormArray).push(
                    new FormControl(null, Validators.required)
                );
            }
        });
    }

    public onSubmit(){
        
        // console.log(this.form);
        console.log(this.form.value);
        console.log(
            this.form.value.questions?.every((item: Answer | Answer[])=>{
                if(typeof(item) === typeof(Array)){
                    (item as Answer[])?.forEach(element => {
                        return element.currect
                    });
                }
                return (item as Answer)?.currect

            })
        );
    }
}
