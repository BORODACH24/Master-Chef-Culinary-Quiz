import { Injectable } from "@angular/core";
import { Answer, Question } from "../interfaces/questions";

@Injectable({
    providedIn: "root",
})
export class CheckService {
    public correctCount = 0;
    private roundQuestions: Question[] = [];

    constructor() {}

    public checkAnswers(answers: [], _roundQuestions: Question[]): number {
        this.roundQuestions = _roundQuestions;
        answers.forEach(
            (item: Answer | Answer[] | string, index: number) => {
                const question = this.roundQuestions[index];

                if (question.type === "multiple" && this.checkMultipleAnswer(item as Answer[], question)) {
                    this.correctCount++;
                } else if (question.type === "input" && this.checkInputAnswer(item.toString(), question)) {
                    this.correctCount++
                } else if (question.type === "drag" && this.checkDragAndDropAnswer(item as Answer[], question)) {
                    this.correctCount++
                }
                this.correctCount += (item as Answer)?.correct? 1 : 0;
            }
        );
        return this.correctCount;
    }
    public checkMultipleAnswer(answer: Answer[], question: Question): boolean {
        const currectAnswersNum = question.answers.filter(
            (item) => item.correct
        ).length;
        if (currectAnswersNum === answer?.length) {
            return (answer as Answer[])?.every((element) => {
                console.log(element);

                return element.correct;
            });
        }
        return false;
    }
    public checkInputAnswer(answer: string, question: Question): boolean {
        return (
            answer?.toLowerCase() ===
            question.answers[0].answer.toLowerCase()
        );
    }
    public checkDragAndDropAnswer(answer: Answer[], question: Question): boolean {
        return question.images?.every((item, index)=>{
            return item.name === answer?.[index].answer;
        }) as boolean;
    }
}
