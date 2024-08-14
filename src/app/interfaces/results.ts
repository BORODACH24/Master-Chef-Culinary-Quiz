import { Rank } from "./rank";

export interface Result {
    roundFinished: boolean;
    rightAnswers: number;
    image: string;
    header: string;
    message: string;
}
export interface GameResult {
    result: number;
    possibleResult: number;
    rank?: Rank | null;
    header: string;
}
