import Box from "@mui/material/Box";

interface CardProps {
  letter: string;
}
const Card = (props: CardProps) => {
  return (
    <Box
      height={120}
      width={120}
      display="flex"
      alignItems="center"
      justifyContent={"center"}
      bgcolor={"#172B35"}
      color={"#E0D8D0"}
      borderRadius={"25px"}
      fontSize={"3.8rem"}
      fontWeight={"bold"}
    >
      {props.letter}
    </Box>
  );
};

export default Card;
