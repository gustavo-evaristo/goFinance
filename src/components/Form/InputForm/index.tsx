import { TextInputProps } from "react-native";
import { Input } from "../Input";
import { Control, Controller } from "react-hook-form";
import { Container, Error } from "./styles";

interface Props extends TextInputProps {
  control: Control<any>;
  name: string;
  error?: string;
}

export function InputForm({ control, name, error, ...props }: Props) {
  return (
    <Container>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <Input onChangeText={onChange} value={value} {...props} />
        )}
      />

      {error && <Error>{error}</Error>}
    </Container>
  );
}
