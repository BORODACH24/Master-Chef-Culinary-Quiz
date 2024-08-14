import { Achivement } from "../src/app/interfaces/achivements";

export const achivements = new Map<string, Achivement>(Object.entries({
    "clickAchiveButton": {
        title: "Button Basher",
        message: `You have clicked Achivements Button 5 times!`,
        necessaryCount: 5,
        currentCount: 0
    },
    "answerSimpleQuestions5": {
        title: "Quiz Whiz",
        message: "You have answered simple-question for 5 times!",
        necessaryCount: 5,
        currentCount: 0
    },
    "answerMultipleQuestions5": {
        title: "Multi-Task Master",
        message: "You have answered multiple-question for 5 times!",
        necessaryCount: 5,
        currentCount: 0
    },
    "answerInputQuestions5": {
        title: "Input Genius",
        message: "You have answered input-question for 5 times!",
        necessaryCount: 5,
        currentCount: 0
    },
    "answerDragAndDropQuestions5": {
        title: "Drag and Drop Dynamo",
        message: "You have answered drag and drop question for 5 times!",
        necessaryCount: 5,
        currentCount: 0
    }
}))