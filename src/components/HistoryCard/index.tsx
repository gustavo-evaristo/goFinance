import { ViewProps } from "react-native";
import { Container, Title, Amount } from "./styles";

interface Props extends ViewProps {
  name: string;
  amount: string;
  color: string;
}

export function HistoryCard({ name, amount, color, ...rest }: Props) {
  return (
    <Container {...rest} color={color}>
      <Title>{name}</Title>
      <Amount>{amount}</Amount>
    </Container>
  );
}
