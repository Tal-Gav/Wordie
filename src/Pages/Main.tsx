import { Box, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import ConfettiExplosion from "react-confetti-explosion";
import CardsGrid from "../components/CardsGrid";
import ScreenKeyboard from "../components/ScreenKeyboard";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import HelpIcon from "../components/HelpIcon";

const Main = () => {
  const [activeRowIndex, setActiveRowIndex] = useState(0);
  const [isConfetti, setIsConfetti] = useState(false);
  const cardRows = useSelector((state: RootState) => state.cardRow.rows);
  const firstRender = useRef(true);

  const showStartPopup = () => {
    Swal.fire({
      title: "!ברוכים הבאים לוֻוֹרְדִי",
      text: "מטרת המשחק היא לגלות את המילה היומית🎯",
      confirmButtonText: "!בוא נתחיל",
      allowOutsideClick: false,
    });
  };
  useEffect(() => {
    if (firstRender.current) {
      showStartPopup();
      firstRender.current = false;
    }
  });
  return (
    <>
      <Box
        minWidth={"100vw"}
        alignItems={"center"}
        display={"flex"}
        flexDirection={"column"}
      >
        {isConfetti && (
          <ConfettiExplosion
            force={0.8}
            duration={3000}
            particleCount={250}
            width={1600}
          />
        )}
        <Box position={"absolute"} top={1} right={1}>
          <HelpIcon />
        </Box>

        <Typography
          fontSize={"3.5rem"}
          fontWeight={"bold"}
          color={"#EFEFEF"}
          letterSpacing={4}
          fontFamily={"Alef-Bold"}
        >
          וֻוֹרְדִי
        </Typography>
        <Box pt={0.5} />
        <Box
          sx={{
            display: "grid",
            width: "350px",
            height: "420px",
            boxSizing: "border-box",
            padding: "10px",
            gridGap: "8px",
            gridTemplateRows: "repeat(6, 1fr)",
          }}
        >
          {cardRows.map((_, index) => (
            <CardsGrid
              key={index}
              rowIndex={index}
              activeRowIndex={activeRowIndex}
            />
          ))}
        </Box>
        <Box pt={5} />
        <ScreenKeyboard
          activeRowIndex={activeRowIndex}
          setActiveRowIndex={setActiveRowIndex}
          setIsConfetti={setIsConfetti}
        />
      </Box>
    </>
  );
};

export default Main;
