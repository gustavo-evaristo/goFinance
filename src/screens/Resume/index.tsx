import { Header } from "../../components/Header";
import { HistoryCard } from "../../components/HistoryCard";
import { useTransaction } from "../../context/TransactionContext";
import { Container, Content } from "./styles";
import { VictoryPie } from "victory-native";
import { RFValue } from "react-native-responsive-fontsize";
import theme from "../../global/styles/theme";

export function Resume() {
  const { amountByCategory } = useTransaction();

  const totalForCategory = amountByCategory.reduce(
    (acc, item) => acc + item.amount,
    0
  );

  const data = amountByCategory?.map((category) => {
    const percentage = `${((category.amount / totalForCategory) * 100).toFixed(
      0
    )}%`;

    return {
      ...category,
      percentage,
    };
  });

  return (
    <Container>
      <Header title="Resumo por Categoria" />

      <VictoryPie
        data={data}
        x="percentage"
        y="amount"
        colorScale={data.map((item) => item.color)}
        style={{
          labels: {
            fontSize: RFValue(14),
            fontWeight: "bold",
            fill: theme.colors.shape,
          },
        }}
        labelRadius={80}
      />

      <Content>
        {amountByCategory?.map((category) => (
          <HistoryCard {...category} key={category.name} />
        ))}
      </Content>
    </Container>
  );
}
