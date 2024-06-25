import words from "./assets/words.json";

export const LAST_ROW_INDEX = 5;
export const wordie = words.sunday.word;
export const puncuatedWordie = words.sunday.puncuatedWord;
export const wordieQuote = words.sunday.quote;

export enum LetterCardStatus {
  unrevealed = "unrevealed",
  correct = "correct",
  incorrect = "incorrect",
  misplaced = "misplaced",
}

export enum LetterCardStatusColors {
  unrevealed = "#172B35",
  correct = "#56832E",
  incorrect = "#922219",
  misplaced = "#C2AB31",
}

export const enum GameResults {
  win = "win",
  lose = "lose",
}
