import { Dashboard } from "./src/screens/Dashboard";
import { ThemeProvider } from "styled-components";
import theme from "./src/global/styles/theme";

import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { Register } from "./src/screens/Register";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return;
  }

  return (
    <ThemeProvider theme={theme}>
      <Register />
    </ThemeProvider>
  );
}
