import { Box } from "@mui/material";
import Card from "./Card";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const CardsGrid = () => {
  const cardRow = useSelector((state: RootState) => state.cardRow.word);
  return (
    <Box
      justifyContent={"center"}
      alignItems={"center"}
      display={"flex"}
      gap={2}
    >
      {Array.from({ length: 5 }, (_, index) => (
        <Card key={index} letter={cardRow[index]} />
      ))}
    </Box>
  );
};

export default CardsGrid;
