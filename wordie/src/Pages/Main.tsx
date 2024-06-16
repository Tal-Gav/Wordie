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
      justifyContent={"center"}
      alignItems={"center"}
      display={"flex"}
      flexDirection={"column"}
      gap={1}
    >
      <Typography fontSize={"6rem"} fontWeight={"bold"} color={"#EFEFEF"}>
        Wordie
      </Typography>
      <Box pt={0.5} />
      {cardRows.map((_, index) => (
        // TODO: Fix to show the prev cards letters and states
        <CardsGrid
          key={index}
          isDisabled={activeRowIndex === index ? false : true}
          activeRowIndex={activeRowIndex}
        />
      ))}

      <ScreenKeyboard
        activeRowIndex={activeRowIndex}
        setActiveRowIndex={setActiveRowIndex}
      />
    </Box>
  );
};

export default Main;
