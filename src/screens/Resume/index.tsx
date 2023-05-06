import { Header } from "../../components/Header";
import { HistoryCard } from "../../components/HistoryCard";
import { useTransaction } from "../../context/TransactionContext";
import {
  Container,
  Content,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Month,
} from "./styles";
import { VictoryPie } from "victory-native";
import { RFValue } from "react-native-responsive-fontsize";
import theme from "../../global/styles/theme";
import { useState } from "react";
import { addMonths, subMonths, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { categories } from "../../utils/categories";

export function Resume() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { transactions } = useTransaction();

  const monthTransactions = transactions.filter(
    (transaction) =>
      new Date(transaction.date).getMonth() === selectedDate.getMonth() &&
      new Date(transaction.date).getFullYear() === selectedDate.getFullYear()
  );

  const amountByCategory = categories
    .map((category) => {
      const amount = +monthTransactions.reduce((acc, item) => {
        if (item.category === category.key) {
          return acc + item.amount;
        }
        return acc;
      }, 0);

      return {
        name: category.name,
        color: category.color,
        amount,
      };
    })
    .filter((category) => category.amount > 0);

  function handleSelectedDate(action: "prev" | "next") {
    if (action === "next") {
      return setSelectedDate((state) => addMonths(state, 1));
    }

    return setSelectedDate((state) => subMonths(state, 1));
  }

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

  const formattedMonth = format(selectedDate, "MMMM", {
    locale: ptBR,
  });

  return (
    <Container>
      <Header title="Resumo por Categoria" />

      <MonthSelect>
        <MonthSelectButton onPress={() => handleSelectedDate("prev")}>
          <MonthSelectIcon name="chevron-left" />
        </MonthSelectButton>

        <Month>{formattedMonth}</Month>

        <MonthSelectButton onPress={() => handleSelectedDate("next")}>
          <MonthSelectIcon name="chevron-right" />
        </MonthSelectButton>
      </MonthSelect>

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
