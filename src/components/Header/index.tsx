import { ViewProps } from "react-native";
import { Container, Title } from "./styles";

interface Props extends ViewProps {
  title: string;
}
export function Header({ title }: Props) {
  return (
    <Container>
      <Title>{title}</Title>
    </Container>
  );
}
