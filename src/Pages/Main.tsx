import { Box, Typography } from "@mui/material";
import CardsGrid from "../components/CardsGrid";
import ScreenKeyboard from "../components/ScreenKeyboard";
import { useState } from "react";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";

const Main = () => {
  const [activeRowIndex, setActiveRowIndex] = useState(0);
  const cardRows = useSelector((state: RootState) => state.cardRow.rows);

  return (
    <Box
      minWidth={"100vw"}
      alignItems={"center"}
      display={"flex"}
      flexDirection={"column"}
    >
      <Typography fontSize={"3.5rem"} fontWeight={"bold"} color={"#EFEFEF"}>
        Wordie
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
      />
    </Box>
  );
};

export default Main;
