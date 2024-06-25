import { IconButton } from "@mui/material";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import Swal from "sweetalert2";

const HelpIcon = () => {
  const showHelpPopup = () => {
    Swal.fire({
      title: "?איך משחקים בוֻוֹרְדִי",
      html: `
          יש 6 נסיונות לנחש מילה.
          כל ניחוש חייב להיות מילה אמיתית בת 5 אותיות.
          אחרי כל ניחוש, האותיות יצבעו בהתאם לכמה שהיו קרובות למילה:

            <ul><span style="color: #922219;">אדום</span> - אות לא קיימת במילה</ul>
            <ul><span style="color: #C2AB31;">צהוב</span> - אות קיימת במילה אך במיקום לא נכון</ul>
            <ul><span style="color: #56832E;">ירוק</span> - אות קיימת במילה ומיקומה נכון</ul>
        `,
      confirmButtonText: "הבנתי",
      allowOutsideClick: false,
    });
  };

  return (
    <IconButton sx={{ color: "#EFEFEF" }} onClick={showHelpPopup}>
      <HelpOutlineRoundedIcon sx={{ fontSize: 40 }} />
    </IconButton>
  );
};

export default HelpIcon;
