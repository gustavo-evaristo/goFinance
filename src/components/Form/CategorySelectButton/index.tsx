import { Container, Category, Icon } from "./styles";
import { RectButtonProps } from "react-native-gesture-handler";

interface Props extends RectButtonProps {
  title: string;
}

export function CategorySelectButton({ title, ...props }: Props) {
  return (
    <Container {...props}>
      <Category>{title}</Category>
      <Icon name="chevron-down" />
    </Container>
  );
}
