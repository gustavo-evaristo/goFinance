import { TouchableOpacityProps } from "react-native";
import { Container, Title, Icon } from "./styles";

interface Props extends TouchableOpacityProps {
  title: string;
  type: "up" | "down";
  isActive: boolean;
}

const icons = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
};

export function TransactionTypeButton({
  title,
  type,
  isActive = false,
  ...props
}: Props) {
  return (
    <Container {...{ ...props, isActive, type }}>
      <Icon name={icons[type]} type={type} />
      <Title>{title}</Title>
    </Container>
  );
}
