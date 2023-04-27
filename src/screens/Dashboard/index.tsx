import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard } from "../../components/TransactionCard";
import {
  TransactionProps,
  useTransaction,
} from "../../context/TransactionContext";
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
  const { transactions } = useTransaction();

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
          data={transactions}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <TransactionCard {...(item as TransactionProps)} />
          )}
        />
      </Transactions>
    </Container>
  );
}
