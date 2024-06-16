import { Box, Typography } from "@mui/material";
import CardsGrid from "../components/CardsGrid";
import ScreenKeyboard from "../components/ScreenKeyboard";

const Main = () => {
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
      <CardsGrid isDisabled={false} />
      <CardsGrid />
      <CardsGrid />
      <CardsGrid />
      <ScreenKeyboard />
    </Box>
  );
};

export default Main;
