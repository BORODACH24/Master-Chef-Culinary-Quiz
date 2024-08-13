import { Achivement } from "../src/app/interfaces/achivements";

export const achivements = new Map<string, Achivement>(Object.entries({
    "clickAchiveButton": {
        title: "Title",
        message: `You have clicked Achivements Button 5 times!`,
        necessaryCount: 5,
        currentCount: 0
    },
    "answerSimpleQuestions5": {
        title: "Title",
        message: "You have answered simple-question for 5 times!",
        necessaryCount: 5,
        currentCount: 0
    },
    "answerMultipleQuestions5": {
        title: "Title",
        message: "You have answered multiple-question for 5 times!",
        necessaryCount: 5,
        currentCount: 0
    },
    "answerInputQuestions5": {
        title: "Title",
        message: "You have answered input-question for 5 times!",
        necessaryCount: 5,
        currentCount: 0
    },
    "answerDragAndDropQuestions5": {
        title: "Title",
        message: "You have answered drag and drop question for 5 times!",
        necessaryCount: 5,
        currentCount: 0
    },
    "": {
        title: "Title",
        message: "",
        necessaryCount: 5,
        currentCount: 0
    },
}))