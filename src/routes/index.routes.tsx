import Login from "@/pages/login";
import { createStackNavigator } from "@react-navigation/stack";
import BottonRoutes from "./botton.routes";

export default function Routes() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "#FFF" },
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="BottonRoutes" component={BottonRoutes} />
    </Stack.Navigator>
  );
}
