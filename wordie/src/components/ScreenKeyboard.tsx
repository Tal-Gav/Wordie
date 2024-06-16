import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { useDispatch } from "react-redux";
import { addLetter, removeLetter } from "../store/cardRowSlice";

const ScreenKeyboard = () => {
  const dispatch = useDispatch();

  const isAlphabetic = (buttonStr: string): boolean => {
    const alphabeticRegex = /^[a-zA-Z]+$/;
    return alphabeticRegex.test(buttonStr);
  };
  const onKeyPress = (buttonStr: string) => {
    console.log("Button pressed", buttonStr);
    if (buttonStr === "{bksp}") dispatch(removeLetter());
    if (isAlphabetic(buttonStr)) dispatch(addLetter(buttonStr));
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
      onKeyPress={onKeyPress}
    />
  );
};

export default ScreenKeyboard;
