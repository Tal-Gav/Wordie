import { Box } from "@mui/material";
import Card from "./Card";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect } from "react";

interface CardsGridProps {
  isDisabled?: boolean;
}

const CardsGrid = ({ isDisabled = true }: CardsGridProps) => {
  const cardRow = useSelector((state: RootState) => state.cardRow.word);
  useEffect(() => {
    console.log(cardRow);
  }, [cardRow]);

  return (
    <Box
      justifyContent={"center"}
      alignItems={"center"}
      display={"flex"}
      gap={2}
    >
      {!isDisabled
        ? Array.from({ length: 5 }, (_, index) => (
            <Card key={index} letterCard={cardRow[index]} />
          ))
        : Array.from({ length: 5 }, (_, index) => <Card key={index} />)}
    </Box>
  );
};

export default CardsGrid;
