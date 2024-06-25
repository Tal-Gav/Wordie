import Swal from "sweetalert2";
import { GameResults, wordie, wordieQuote } from "../constants";

export const isHebrew = (buttonStr: string): boolean => {
  const hebrewRegex = /^[\u0590-\u05FF]+$/;
  return hebrewRegex.test(buttonStr);
};

const reloadPage = (): void => {
  window.location.reload();
};

export const showPopup = (gameResult: GameResults): void => {
  if (gameResult === GameResults.win) {
    Swal.fire({
      title: "!מצאת את המילה בהצלחה",
      text: `${wordie}: ${wordieQuote}`,
      confirmButtonText: "סגור",
      allowOutsideClick: false,
    });
  } else {
    Swal.fire({
      title: "לא הצלחת למצוא את המילה",
      text: "תרצה לנסות שוב?",
      confirmButtonText: "התחל מחדש",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) reloadPage();
    });
  }
};
