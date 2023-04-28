import { Header } from "../../components/Header";
import { HistoryCard } from "../../components/HistoryCard";
import { useTransaction } from "../../context/TransactionContext";
import { Container, Content } from "./styles";

export function Resume() {
  const { amountByCategory } = useTransaction();
  return (
    <Container>
      <Header title="Resumo por Categoria" />

      <Content>
        {amountByCategory?.map((category) => (
          <HistoryCard {...category} key={category.name} />
        ))}
      </Content>
    </Container>
  );
}
