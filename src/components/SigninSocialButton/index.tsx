import { FC } from "react";
import { SvgProps } from "react-native-svg";
import { Container, ImageContainer, Text } from "./styles";

interface Props {
  svg: FC<SvgProps>;
  title: string;
}

export function SigninSocialButton({ svg: Svg, title, ...rest }: Props) {
  return (
    <Container {...rest}>
      <ImageContainer>
        <Svg />
      </ImageContainer>

      <Text>{title}</Text>
    </Container>
  );
}
