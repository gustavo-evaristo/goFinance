import { formatCurrency } from "../../utils/formatMoney";
import {
  Amount,
  Container,
  Footer,
  Header,
  Icon,
  LastTransaction,
  Title,
} from "./styles";

interface Props {
  title: string;
  amount: number;
  lastTransaction: string;
  type: "up" | "down" | "total";
}

export function HighlightCard({ title, amount, lastTransaction, type }: Props) {
  const arrowIcon = {
    up: "arrow-up-circle",
    down: "arrow-down-circle",
    total: "dollar-sign",
  };

  const transactionDateText =
    type === "up"
      ? "Última entrada dia"
      : type === "down"
      ? "Última saída dia"
      : "";

  return (
    <Container type={type}>
      <Header>
        <Title type={type}>{title}</Title>
        <Icon name={arrowIcon[type]} type={type} />
      </Header>

      <Footer>
        <Amount type={type}>{formatCurrency(amount)}</Amount>
        <LastTransaction
          type={type}
        >{`${transactionDateText} ${lastTransaction}`}</LastTransaction>
      </Footer>
    </Container>
  );
}
