import { ListRenderItemInfo } from "react-native";
import { HighlightCard } from "../../components/HighlightCard";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../components/TransactionCard";
import {
  Container,
  Header,
  UserInfo,
  User,
  Photo,
  UserName,
  UserGreeting,
  UserWrapper,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionsList,
} from "./styles";

export function Dashboard() {
  const data: TransactionCardProps[] = [
    {
      amount: "R$ 5.000,00",
      date: "07/04/2023",
      title: "Prestação de Serviço",
      type: "positive",
      category: {
        icon: "dollar-sign",
        name: "Vendas",
      },
    },
    {
      amount: "R$ 1.800,00",
      date: "08/04/2023",
      title: "Cartão de Crédito",
      type: "negative",
      category: {
        icon: "credit-card",
        name: "Dispesas",
      },
    },
    {
      amount: "R$ 1.250,00",
      date: "09/04/2023",
      title: "Prestação do apartamento",
      type: "negative",
      category: {
        icon: "home",
        name: "Casa",
      },
    },
    {
      amount: "R$ 2.300,00",
      date: "15/04/2023",
      title: "Desenvolvimento de Aplicativo",
      type: "positive",
      category: {
        icon: "dollar-sign",
        name: "Vendas",
      },
    },
  ];

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{ uri: "https://github.com/gustavo-evaristo.png" }}
            />

            <User>
              <UserGreeting>Ola,</UserGreeting>
              <UserName>Gustavo</UserName>
            </User>
          </UserInfo>

          <Icon name="power" />
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          title="Entradas"
          amount="R$ 7.300,00"
          lastTransaction="Última entrada dia 14 de abril"
          type="up"
        />

        <HighlightCard
          title="Saídas"
          amount="R$ 3.050,00"
          lastTransaction="Última saída dia 08 de abril"
          type="down"
        />

        <HighlightCard
          title="Total"
          amount="R$ 4.250,00"
          lastTransaction="01 à 19 de abril"
          type="total"
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionsList
          data={data}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <TransactionCard {...(item as TransactionCardProps)} />
          )}
        />
      </Transactions>
    </Container>
  );
}
