import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SigninTitle,
  Footer,
  FooterWrapper,
} from "./styles";

import AppleSVG from "../../assets/apple.svg";
import GoogleSVG from "../../assets/google.svg";
import LogoSVG from "../../assets/logo.svg";

import { RFValue } from "react-native-responsive-fontsize";
import { SigninSocialButton } from "../../components/SigninSocialButton";

export function Login() {
  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSVG width={RFValue(120)} height={RFValue(68)} />

          <Title>
            Controle suas{"\n"}finanças de forma{"\n"}muito fácil
          </Title>
        </TitleWrapper>

        <SigninTitle>Faça seu login com{"\n"}uma das contas abaixo</SigninTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <SigninSocialButton svg={GoogleSVG} title="Entrar com Google" />

          <SigninSocialButton svg={AppleSVG} title="Entrar com Apple" />
        </FooterWrapper>
      </Footer>
    </Container>
  );
}
