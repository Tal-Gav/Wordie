import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addLetter,
  removeLetter,
  LetterCardStatus,
  setLetterStatus,
} from "../store/cardRowSlice";
import words from "../assets/words.json";
import { RootState } from "../store/store";
import { addBannedLetter } from "../store/bannedLetters";
import "./index.css";
import { useEffect, useState } from "react";
import { LAST_ROW_INDEX } from "../constants";
import Swal from "sweetalert2";

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

  const isHebrew = (buttonStr: string): boolean => {
    const hebrewRegex = /^[\u0590-\u05FF]+$/;
    return hebrewRegex.test(buttonStr);
  };

  const increaseRowIndex = () => {
    if (activeRowIndex < LAST_ROW_INDEX) setActiveRowIndex(activeRowIndex + 1);
  };

  const setLettersStatus = (
    index: number,
    inputWordie: string,
    wordie: string
  ) => {
    switch (true) {
      case inputWordie[index] === wordie[index]: {
        dispatch(
          setLetterStatus({
            rowIndex: activeRowIndex,
            letterIndex: index,
            status: LetterCardStatus.correct,
          })
        );
        break;
      }
      case wordie.includes(inputWordie[index]): {
        dispatch(
          setLetterStatus({
            rowIndex: activeRowIndex,
            letterIndex: index,
            status: LetterCardStatus.misplaced,
          })
        );
        break;
      }
      case !wordie[index].includes(inputWordie[index]): {
        dispatch(
          setLetterStatus({
            rowIndex: activeRowIndex,
            letterIndex: index,
            status: LetterCardStatus.incorrect,
          })
        );
        dispatch(addBannedLetter(inputWordie[index]));
        break;
      }
    }
  };

  const compareToWordie = (inputWordie: string) => {
    for (let index = 0; index < inputWordie.length; index++) {
      setLettersStatus(index, inputWordie, words.today);
    }
    increaseRowIndex();
  };

  const checkWord = () => {
    if (cardRows[activeRowIndex].length === LAST_ROW_INDEX) {
      const inputWordie = cardRows[activeRowIndex]
        .map((letterCard) => letterCard.letter)
        .join("");

      if (inputWordie === words.today) {
        compareToWordie(inputWordie);
        setIsKeyboardDisabled(true);

        console.log("good");
      } else {
        compareToWordie(inputWordie);
        if (activeRowIndex === LAST_ROW_INDEX) {
          setIsKeyboardDisabled(true);
        }
        console.log("bad");
      }
    }
  };
  const onKeyPress = (buttonStr: string) => {
    console.log("Button pressed", buttonStr);
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
      style={{ display: "contents" }}
    >
      <Keyboard
        layout={{
          default: [
            "ק ר א ט ו ן ם פ {bksp}",
            "ש ד ג כ ע י ח ל ך ף {enter}",
            "ז ס ב ה נ מ צ ת ץ",
          ],
        }}
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
