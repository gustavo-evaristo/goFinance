import { InputForm } from "../../components/Form/InputForm";
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
import { Keyboard, Modal, TouchableWithoutFeedback } from "react-native";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { Category, CategorySelect } from "../CategorySelect";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import uuid from "react-native-uuid";
import { useNavigation } from "@react-navigation/native";
import { useTransaction } from "../../context/TransactionContext";

type TransactionType = "up" | "down";

interface FormData {
  name: string;
  amount: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  amount: Yup.number()
    .required("Preço é obrigatório")
    .typeError("Informe um valor numérico")
    .positive("Não pode ser um valor negativo"),
});

export function Register() {
  const [transactionType, setTransactionType] = useState("" as TransactionType);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  } as Category);

  const { registerTransaction } = useTransaction();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      amount: "",
      name: "",
    },
  });

  const { navigate } = useNavigation();

  function handleTransactionType(type: TransactionType) {
    setTransactionType(type);
  }

  function handleCloseSelectCategory() {
    setCategoryModalOpen(false);
  }

  function handleOpenSelectCategory() {
    setCategoryModalOpen(true);
  }

  function handleCategory(category: Category) {
    setCategory(category);
  }

  async function onSubmit({ amount, name }: FormData) {
    registerTransaction({
      id: String(uuid.v4()),
      amount,
      name,
      type: transactionType,
      category: category.key,
      date: new Date(),
    });

    setTransactionType("" as TransactionType);

    setCategory({ key: "category", name: "Categoria" });

    reset();

    navigate("Listagem");
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              placeholder="Nome"
              name="name"
              control={control}
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors?.name?.message}
            />

            <InputForm
              placeholder="Preço"
              name="amount"
              control={control}
              keyboardType="numeric"
              error={errors?.amount?.message}
            />

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

            <CategorySelectButton
              title={category.name}
              onPress={handleOpenSelectCategory}
            />
          </Fields>

          <Button title="Enviar" onPress={handleSubmit(onSubmit)} />
        </Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            closeSelectCategory={handleCloseSelectCategory}
            setCategory={handleCategory}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}
