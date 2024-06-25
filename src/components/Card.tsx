import Box from "@mui/material/Box";
import { LetterCard } from "../store/cardRowSlice";
import { LetterCardStatus, LetterCardStatusColors } from "../constants";

interface CardProps {
  letterCard?: LetterCard;
}

const Card = (props: CardProps) => {
  const getStatusColor = (letterStatus: LetterCardStatus) => {
    switch (true) {
      case letterStatus === LetterCardStatus.unrevealed:
        return LetterCardStatusColors.unrevealed;
      case letterStatus === LetterCardStatus.correct:
        return LetterCardStatusColors.correct;
      case letterStatus === LetterCardStatus.incorrect:
        return LetterCardStatusColors.incorrect;
      case letterStatus === LetterCardStatus.misplaced:
        return LetterCardStatusColors.misplaced;

      default:
        return LetterCardStatusColors.unrevealed;
    }
  };
  const cardColor = props.letterCard
    ? getStatusColor(props.letterCard.status)
    : LetterCardStatusColors.unrevealed;
  return (
    <Box
      height={"100%"}
      width={"100%"}
      display="flex"
      alignItems="center"
      justifyContent={"center"}
      bgcolor={cardColor}
      color={"#EFEFEF"}
      borderRadius={"0.27em"}
      fontSize={"2rem"}
      fontWeight={"bold"}
    >
      {props.letterCard?.letter}
    </Box>
  );
};

export default Card;
