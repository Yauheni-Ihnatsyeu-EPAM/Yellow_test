import { createStackNavigator, createAppContainer } from "react-navigation";
import LoginScreen from "../screens/login/login";
import Dashboard from "../screens/dashboard";


const AppNavigator = createStackNavigator({
    login: LoginScreen,
    dash: Dashboard
  },
  {
    initialRouteName: "login"
  }
  );
  export default createAppContainer(AppNavigator);  