import { IconButton } from "@mui/material";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import Swal from "sweetalert2";

const HelpIcon = () => {
  const showHelpPopup = () => {
    Swal.fire({
      title: "איך משחקים בוֻוֹרְדִי?",
      html: `
          יש לך שישה ניסיונות לנחש את המילה היומית. כל ניחוש חייב להיות מילה בת חמש אותיות. לאחר כל ניחוש, האותיות ייצבעו בהתאם לרמת הקרבה שלהן למילה הסודית:

            <ul><span style="color: #922219;">אדום</span> - האות אינה קיימת במילה</ul>
            <ul><span style="color: #C2AB31;">צהוב</span> - האות קיימת במילה אך במיקום שגוי</ul>
            <ul><span style="color: #56832E;">ירוק</span> - האות קיימת במילה ונמצאת במיקום הנכון</ul>
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
