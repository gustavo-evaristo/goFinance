import { TouchableOpacityProps } from "react-native";
import { Container, Title } from "./styles";

interface Props extends TouchableOpacityProps {
  title: string;
}

export function Button(props: Props) {
  return (
    <Container {...props}>
      <Title>{props.title}</Title>
    </Container>
  );
}
