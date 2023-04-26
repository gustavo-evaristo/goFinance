import { Container, Title } from "./styles";
import { RectButtonProps } from "react-native-gesture-handler";

interface Props extends RectButtonProps {
  title: string;
  onPress: () => void;
}

export function Button({ onPress, ...props }: Props) {
  return (
    <Container {...{ ...props, onPress }}>
      <Title>{props.title}</Title>
    </Container>
  );
}
