import { Box } from "@mui/material";
import Card from "./Card";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface CardsGridProps {
  isDisabled?: boolean;
  activeRowIndex: number;
}

const CardsGrid = ({ isDisabled = true, activeRowIndex }: CardsGridProps) => {
  const cardRows = useSelector((state: RootState) => state.cardRow.rows);

  return (
    <Box
      justifyContent={"center"}
      alignItems={"center"}
      display={"flex"}
      gap={2}
    >
      {!isDisabled
        ? Array.from({ length: 5 }, (_, index) => (
            <Card key={index} letterCard={cardRows[activeRowIndex][index]} />
          ))
        : Array.from({ length: 5 }, (_, index) => <Card key={index} />)}
    </Box>
  );
};

export default CardsGrid;
