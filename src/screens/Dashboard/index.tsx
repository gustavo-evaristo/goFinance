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
  const {
    formattedTransactions,
    transactionIncome,
    transactionOutcome,
    transactionsResume,
    lastIcome,
    lastOutcome,
    incomeRange,
  } = useTransaction();

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
          amount={transactionIncome}
          lastTransaction={lastIcome}
          type="up"
        />

        <HighlightCard
          title="Saídas"
          amount={transactionOutcome}
          lastTransaction={lastOutcome}
          type="down"
        />

        <HighlightCard
          title="Total"
          amount={transactionsResume}
          lastTransaction={incomeRange}
          type="total"
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionsList
          data={formattedTransactions}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <TransactionCard {...(item as TransactionProps)} />
          )}
        />
      </Transactions>
    </Container>
  );
}
