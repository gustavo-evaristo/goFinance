import { Input } from "../../components/Form/Input";
import { Button } from "../../components/Form/Button";
import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes,
} from "./styles";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { useState } from "react";
import { CategorySelect } from "../../components/Form/CategorySelect";

type TransactionType = "up" | "down";

export function Register() {
  const [transactionType, setTransactionType] = useState("" as TransactionType);

  function handleTransactionType(type: TransactionType) {
    setTransactionType(type);
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="E-mail" />

          <TransactionTypes>
            <TransactionTypeButton
              title="Income"
              type="up"
              onPress={() => handleTransactionType("up")}
              isActive={transactionType === "up"}
            />
            <TransactionTypeButton
              title="Down"
              type="down"
              onPress={() => handleTransactionType("down")}
              isActive={transactionType === "down"}
            />
          </TransactionTypes>

          <CategorySelect title="Categorias" />
        </Fields>

        <Button title="Enviar" />
      </Form>
    </Container>
  );
}
