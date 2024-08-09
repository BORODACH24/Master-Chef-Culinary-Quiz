export interface Round {
    round: number;
    difficulty: number;
    questions: Question[];
}
export interface Question {
    type: string;
    question: string;
    images?: string[];
    answers: Answer[];
}
export interface MultipleChoiceQuestion {}
export interface DragAndDropGQuestion extends Question{
    images: string[];
}
export interface Answer {
    answer: string;
    correct: boolean;
}
