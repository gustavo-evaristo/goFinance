import { Input } from "../../components/Form/Input";
import { Button } from "../../components/Form/Input/Button";
import { Container, Header, Title, Form, Fields } from "./styles";

export function Register() {
  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Nome" />
        </Fields>

        <Button title="Enviar" />
      </Form>
    </Container>
  );
}
