import { createStackNavigator } from "react-navigation";
import NotificationScreen from "../screens/NotificationScreen";
import sharedRoutes, {sharedOptions} from "./sharedRoutes";

const NotificationRoute = createStackNavigator(
    {
        Notification: {
            screen: NotificationScreen
        },
        ...sharedRoutes
    },
    {
        ...sharedOptions
    }
)

export default NotificationRoute;