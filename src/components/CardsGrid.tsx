import { Box } from "@mui/material";
import Card from "./Card";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface CardsGridProps {
  isDisabled?: boolean;
  activeRowIndex: number;
  rowIndex: number;
}

const CardsGrid = (props: CardsGridProps) => {
  const cardRows = useSelector((state: RootState) => state.cardRow.rows);

  return (
    <Box
      justifyContent={"center"}
      alignItems={"center"}
      display={"flex"}
      flexDirection={"row-reverse"}
      width={"100%"}
      gap={1}
    >
      {props.rowIndex === props.activeRowIndex
        ? Array.from({ length: 5 }, (_, index) => (
            <Card
              key={index}
              letterCard={cardRows[props.activeRowIndex][index]}
            />
          ))
        : props.rowIndex < props.activeRowIndex
        ? Array.from({ length: 5 }, (_, index) => (
            <Card key={index} letterCard={cardRows[props.rowIndex][index]} />
          ))
        : Array.from({ length: 5 }, (_, index) => <Card key={index} />)}
    </Box>
  );
};

export default CardsGrid;
