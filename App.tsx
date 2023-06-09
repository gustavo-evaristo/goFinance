import "intl";
import "intl/locale-data/jsonp/pt-BR";
import { ThemeProvider } from "styled-components";
import theme from "./src/global/styles/theme";
import { AppRoutes } from "./src/routes/app.routes";
import { NavigationContainer } from "@react-navigation/native";
import { TransactionProvider } from "./src/context/TransactionContext";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { StatusBar } from "expo-status-bar";
import { Login } from "./src/screens/Login";

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
      <TransactionProvider>
        <NavigationContainer>
          <StatusBar style="light" translucent />
          <Login />
          {/* <AppRoutes /> */}
        </NavigationContainer>
      </TransactionProvider>
    </ThemeProvider>
  );
}
