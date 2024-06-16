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

const ScreenKeyboard = () => {
  const cardRow = useSelector((state: RootState) => state.cardRow.word);
  const bannedLetters = useSelector(
    (state: RootState) => state.bannedLetters.bannedLetters
  );
  const dispatch = useDispatch();

  const isAlphabetic = (buttonStr: string): boolean => {
    const alphabeticRegex = /^[a-zA-Z]+$/;
    return alphabeticRegex.test(buttonStr);
  };

  const compareWords = (inputWordie: string, wordie: string) => {
    for (let index = 0; index < inputWordie.length; index++) {
      if (inputWordie[index] === wordie[index]) {
        dispatch(setLetterStatus({ index, status: LetterCardStatus.correct }));
      } else if (wordie.includes(inputWordie[index])) {
        dispatch(
          setLetterStatus({ index, status: LetterCardStatus.misplaced })
        );
      } else if (!wordie[index].includes(inputWordie[index])) {
        dispatch(
          setLetterStatus({ index, status: LetterCardStatus.incorrect })
        );
        dispatch(addBannedLetter(inputWordie[index]));
      }
      console.log(cardRow);
    }
  };
  const checkWord = () => {
    if (cardRow.length === 5) {
      const inputWordie = cardRow
        .map((letterCard) => letterCard.letter)
        .join("");

      if (inputWordie === words.today) {
        // TODO: Instant win
        console.log("good");
      } else {
        compareWords(inputWordie, words.today);
        // TODO: mark letters status, disable row and move to the next one
        console.log("bad");
      }
    }
  };
  const onKeyPress = (buttonStr: string) => {
    console.log("Button pressed", buttonStr);
    if (buttonStr === "{enter}") checkWord();
    if (buttonStr === "{bksp}") dispatch(removeLetter());
    if (isAlphabetic(buttonStr)) {
      console.log("here");

      dispatch(addLetter(buttonStr));
    }
  };

  return (
    <Keyboard
      layout={{
        default: [
          "Q W E R T Y U I O P {bksp}",
          "A S D F G H J K L {enter}",
          "Z X C V B N M",
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
  );
};

export default ScreenKeyboard;
