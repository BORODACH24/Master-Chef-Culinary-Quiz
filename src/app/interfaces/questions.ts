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
    currect: boolean;
}
