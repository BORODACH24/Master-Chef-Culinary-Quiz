import { Injectable } from "@angular/core";
import { Answer, Question } from "../interfaces/questions";

@Injectable({
    providedIn: "root",
})
export class CheckService {
    private roundQuestions: Question[] = [];
    public correctCount = 0;

    constructor() {}

    public checkAnswers(answers: Answer[], _roundQuestions: Question[]): number {
        this.roundQuestions = _roundQuestions
        answers.forEach(
            (item: Answer | Answer[], index: number) => {
                if (item instanceof Array) {
                    this.checkMultipleAnswer(item, this.roundQuestions[index])? this.correctCount++ : null;
                } else if (typeof item === typeof "") {
                    this.checkInputAnswer(item.toString(), this.roundQuestions[index])? this.correctCount++ : null;
                }
                (item as Answer)?.correct? this.correctCount++ : null;
            }
        );
        return this.correctCount
    }
    public checkMultipleAnswer(answer: Answer[], question: Question): boolean {
        const currectAnswersNum = question.answers.filter(
            item => item.correct
        ).length;
        if (currectAnswersNum === answer?.length) {
            return (answer as Answer[])?.every(element => {
                console.log(element);

                return element.correct;
            });
        }
        return false;
    }
    public checkInputAnswer(item: string, question: Question): boolean {
        return (
            item?.toLowerCase() ===
            question.answers[0].answer.toLowerCase()
        );
    }
}
