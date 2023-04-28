import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Dashboard } from "../screens/Dashboard";
import { Register } from "../screens/Register";
import theme from "../global/styles/theme";
import { Platform } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Resume } from "../screens/Resume";

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  return (
    <Navigator
      initialRouteName="dashboard"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarLabelPosition: "beside-icon",
        tabBarStyle: {
          height: 88,
          paddingVertical: Platform.OS === "ios" ? 20 : 0,
        },
      }}
    >
      <Screen
        name="Listagem"
        component={Dashboard}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="format-list-bulleted" {...{ size, color }} />
          ),
        }}
      />

      <Screen
        name="Registrar"
        component={Register}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="attach-money" {...{ size, color }} />
          ),
        }}
      />

      <Screen
        name="Resumo"
        component={Resume}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="pie-chart" {...{ size, color }} />
          ),
        }}
      />
    </Navigator>
  );
}
