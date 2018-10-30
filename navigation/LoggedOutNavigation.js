import { createStackNavigator } from "react-navigation";
import LoginScreen from "../screens/LoginScreen";

const LoggedOutNavigation = createStackNavigator({
    LogIn: {
        screen: LoginScreen,
        navigationOptions: {
            header: null
        }
    }
})

export default LoggedOutNavigation;