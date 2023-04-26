import { Container, Title } from "./styles";
import { RectButtonProps } from "react-native-gesture-handler";

interface Props extends RectButtonProps {
  title: string;
}

export function Button(props: Props) {
  return (
    <Container {...props}>
      <Title>{props.title}</Title>
    </Container>
  );
}
