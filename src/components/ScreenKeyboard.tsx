import "./index.css";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
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
  puncuatedWordie,
  wordieQuote,
} from "../constants";
import { isHebrew, reloadPage } from "../utils/utils";

interface ScreenKeyboardProps {
  activeRowIndex: number;
  setActiveRowIndex: (index: number) => void;
  setIsConfetti: (isConfetti: boolean) => void;
}

const ScreenKeyboard = ({
  activeRowIndex,
  setActiveRowIndex,
  setIsConfetti,
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

  const showPopup = (gameResult: GameResults): void => {
    if (gameResult === GameResults.win) {
      setIsConfetti(true);
      setTimeout(() => {
        Swal.fire({
          title: "מצאת את המילה היומית!🏆",
          text: `${puncuatedWordie}: ${wordieQuote}`,
          confirmButtonText: "סגור",
          allowOutsideClick: false,
        });
      }, 1600);
    } else {
      Swal.fire({
        title: "לא הצלחת למצוא את המילה היומית",
        text: "תרצה לנסות שוב?",
        confirmButtonText: "התחל מחדש",
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) reloadPage();
      });
    }
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
      } else if (activeRowIndex === LAST_ROW_INDEX) {
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
