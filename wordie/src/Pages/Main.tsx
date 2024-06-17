import { Box, Stack, Typography } from "@mui/material";
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
      minHeight={"100vh"}
      justifyContent={"start"}
      alignItems={"center"}
      display={"flex"}
      flexDirection={"column"}
      gap={1}
    >
      <Typography fontSize={"6rem"} fontWeight={"bold"} color={"#EFEFEF"}>
        Wordie
      </Typography>
      <Box pt={0.5} />
      <Box
        sx={{
          display: "grid",
        }}
      >
        {/* {cardRows.map((_, index) => (
          <CardsGrid
            key={index}
            rowIndex={index}
            activeRowIndex={activeRowIndex}
          />
        ))} */}
      </Box>
      <Box pt={0.5} />

      <ScreenKeyboard
        activeRowIndex={activeRowIndex}
        setActiveRowIndex={setActiveRowIndex}
      />
    </Box>
  );
};

export default Main;
