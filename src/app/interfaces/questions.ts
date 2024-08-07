export interface Round {
    round: number;
    difficulty: number;
    questions: Question[];
}
export interface Question {
    type: string;
    question: string;
    answers: Answer[];
}
export interface MultipleChoiceQuestion {}
export interface ImageQuestion extends Question{
    image: string;
}
export interface Answer {
    answer: string;
    correct: boolean;
}
