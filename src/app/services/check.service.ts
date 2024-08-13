import { Injectable } from "@angular/core";
import { Answer, Question } from "../interfaces/questions";
import { AchivementsService } from "./achivements.service";
import { Achivement } from "../interfaces/achivements";

@Injectable({
    providedIn: "root",
})
export class CheckService {
    constructor(private achive: AchivementsService) {}

    public checkAnswers(answers: [], roundQuestions: Question[]): number {
        let correctCount = 0;
        answers.forEach((item: Answer | Answer[] | string, index: number) => {
            const question = roundQuestions[index];

            if (
                question.type === "multiple" &&
                this.checkMultipleAnswer(item as Answer[], question)
            ) {
                this.getAchive("answerMultipleQuestions5").currentCount++;
                correctCount++;
            } else if (
                question.type === "input" &&
                this.checkInputAnswer(item as string, question)
            ) {
                this.getAchive("answerInputQuestions5").currentCount++;
                correctCount++;
            } else if (
                question.type === "drag" &&
                this.checkDragAndDropAnswer(item as Answer[], question)
            ) {
                this.getAchive("answerDragAndDropQuestions5").currentCount++;
                correctCount++;
            } else if ((item as Answer)?.correct) {
                this.getAchive("answerSimpleQuestions5").currentCount++;
                correctCount++;
            }
        });
        return correctCount;
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
    public checkInputAnswer(answer: string, question: Question): boolean {
        return (
            answer?.toLowerCase() === question.answers[0].answer.toLowerCase()
        );
    }
    public checkDragAndDropAnswer(
        answer: Answer[],
        question: Question
    ): boolean {
        return question.images?.every((item, index) => {
            return item.name === answer?.[index].answer;
        }) as boolean;
    }
    private getAchive(str: string): Achivement{
        return (this.achive.achivements.get(str) as Achivement)
    }
}
