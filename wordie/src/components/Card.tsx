import Box from "@mui/material/Box";
import { LetterCard } from "../store/cardRowSlice";
import { LetterCardStatus } from "../store/cardRowSlice";
interface CardProps {
  letterCard?: LetterCard;
}

const Card = (props: CardProps) => {
  const getStatusColor = (letterStatus: LetterCardStatus) => {
    console.log(letterStatus);

    switch (true) {
      case letterStatus === LetterCardStatus.unrevealed:
        return "#172B35";
      case letterStatus === LetterCardStatus.correct:
        return "#56832E";
      case letterStatus === LetterCardStatus.incorrect:
        return "#922219";
      case letterStatus === LetterCardStatus.misplaced:
        return "#C2AB31";

      default:
        return "#172B35";
    }
  };
  const cardColor = props.letterCard
    ? getStatusColor(props.letterCard.status)
    : "#172B35";
  return (
    <Box
      height={"10vh"}
      width={"10vh"}
      display="flex"
      alignItems="center"
      justifyContent={"center"}
      bgcolor={cardColor}
      color={"#EFEFEF"}
      borderRadius={"0.27em"}
      fontSize={"3.8rem"}
      fontWeight={"bold"}
    >
      {props.letterCard?.letter}
    </Box>
  );
};

export default Card;
