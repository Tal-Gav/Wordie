import "./index.css";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addLetter,
  removeLetter,
  setLetterStatus,
} from "../store/cardRowSlice";
import { RootState } from "../store/store";
import { addBannedLetter } from "../store/bannedLetters";
import {
  GameResults,
  LAST_ROW_INDEX,
  LetterCardStatus,
  wordie,
} from "../constants";
import { isHebrew, showPopup } from "../utils/utils";

interface ScreenKeyboardProps {
  activeRowIndex: number;
  setActiveRowIndex: (index: number) => void;
}

const ScreenKeyboard = ({
  activeRowIndex,
  setActiveRowIndex,
}: ScreenKeyboardProps) => {
  const dispatch = useDispatch();
  const [isKeyboardDisabled, setIsKeyboardDisabled] = useState(false);
  const cardRows = useSelector((state: RootState) => state.cardRow.rows);
  const bannedLetters = useSelector(
    (state: RootState) => state.bannedLetters.bannedLetters
  );

  const increaseRowIndex = (): void => {
    if (activeRowIndex < LAST_ROW_INDEX) setActiveRowIndex(activeRowIndex + 1);
  };

  const setLettersStatus = (index: number, guessedWord: string): void => {
    switch (true) {
      case guessedWord[index] === wordie[index]: {
        dispatch(
          setLetterStatus({
            rowIndex: activeRowIndex,
            letterIndex: index,
            status: LetterCardStatus.correct,
          })
        );
        break;
      }
      case wordie.includes(guessedWord[index]): {
        dispatch(
          setLetterStatus({
            rowIndex: activeRowIndex,
            letterIndex: index,
            status: LetterCardStatus.misplaced,
          })
        );
        break;
      }
      case !wordie[index].includes(guessedWord[index]): {
        dispatch(
          setLetterStatus({
            rowIndex: activeRowIndex,
            letterIndex: index,
            status: LetterCardStatus.incorrect,
          })
        );
        dispatch(addBannedLetter(guessedWord[index]));
        break;
      }
    }
  };

  const compareToWordie = (guessedWord: string): void => {
    for (let index = 0; index < guessedWord.length; index++) {
      setLettersStatus(index, guessedWord);
    }
    increaseRowIndex();
  };

  const getGuessedWord = (): string => {
    return cardRows[activeRowIndex]
      .map((letterCard) => letterCard.letter)
      .join("");
  };

  const initGameFinish = (gameResult: GameResults) => {
    setIsKeyboardDisabled(true);
    showPopup(gameResult);
  };

  const checkWord = (): void => {
    if (cardRows[activeRowIndex].length === LAST_ROW_INDEX) {
      const guessedWord = getGuessedWord();
      compareToWordie(guessedWord);

      if (guessedWord === wordie) {
        initGameFinish(GameResults.win);
      }
      if (activeRowIndex === LAST_ROW_INDEX) {
        initGameFinish(GameResults.lose);
      }
    }
  };
  const onKeyPress = (buttonStr: string): void => {
    if (buttonStr === "{enter}") checkWord();
    if (buttonStr === "{bksp}")
      dispatch(removeLetter({ rowIndex: activeRowIndex }));
    if (isHebrew(buttonStr)) {
      dispatch(addLetter({ rowIndex: activeRowIndex, letter: buttonStr }));
    }
  };

  return (
    <div
      className={isKeyboardDisabled ? "disabled-container" : ""}
      style={{ width: "96%", position: "absolute", bottom: "0", zIndex: "10" }}
    >
      <Keyboard
        layout={{
          default: [
            "ק ר א ט ו ן ם פ {bksp}",
            "ש ד ג כ ע י ח ל ך ף {enter}",
            "ז ס ב ה נ מ צ ת ץ",
          ],
        }}
        display={{ "{bksp}": "מחיקה", "{enter}": "שליחה" }}
        buttonTheme={
          bannedLetters.length > 0
            ? [
                {
                  class: "disabled-key",
                  buttons: bannedLetters.join(" "),
                },
              ]
            : []
        }
        onKeyPress={onKeyPress}
      />
    </div>
  );
};

export default ScreenKeyboard;
