import { ViewProps } from "react-native";
import { formatCurrency } from "../../utils/formatMoney";
import { Container, Title, Amount } from "./styles";

interface Props extends ViewProps {
  name: string;
  amount: number;
  color: string;
}

export function HistoryCard({ name, amount, color, ...rest }: Props) {
  return (
    <Container {...rest} color={color}>
      <Title>{name}</Title>
      <Amount>{formatCurrency(amount)}</Amount>
    </Container>
  );
}
