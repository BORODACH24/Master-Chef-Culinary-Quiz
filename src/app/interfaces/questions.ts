export interface Round {
    round: number;
    difficulty: number;
    questions: Question[];
}
export interface Question {
    type: string;
    question: string;
    images?: Image[];
    answers: Answer[];
}
export interface MultipleChoiceQuestion {}
export interface DragAndDropGQuestion extends Question{
    images: Image[];
}
export interface Image{
    image: string;
    name: string;
}
export interface Answer {
    answer: string;
    correct: boolean;
}
