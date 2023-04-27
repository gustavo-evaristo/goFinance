import { FlatList } from "react-native";
import { Container, Category, Icon, Name, Separator, Footer } from "./styles";
import { categories } from "../../utils/categories";
import { Button } from "../../components/Form/Button";
import { Header } from "../../components/Header";

export interface Category {
  key: string;
  name: string;
}

interface Props {
  category: Category;
  setCategory: (category: Category) => void;
  closeSelectCategory: () => void;
}

export function CategorySelect({
  category,
  closeSelectCategory,
  setCategory,
}: Props) {
  return (
    <Container>
      <Header title="Categoria" />

      <FlatList
        data={categories}
        style={{ flex: 1, width: "100%" }}
        keyExtractor={(item) => item.key.toString()}
        renderItem={({ item }) => (
          <Category
            key={item.key}
            onPress={() => setCategory(item)}
            isActive={category.key === item.key}
          >
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </Category>
        )}
        ItemSeparatorComponent={() => <Separator />}
      />

      <Footer>
        <Button title="Selectionar" onPress={closeSelectCategory} />
      </Footer>
    </Container>
  );
}
