import { createStackNavigator } from "react-navigation";
import NotificationsScreen from "../screens/NotificationsScreen";
import sharedRoutes, { sharedOptions } from "./sharedRoutes";

const NotificationsRoute = createStackNavigator(
    {
        Notification: {
            screen: NotificationsScreen
        },
        ...sharedRoutes
    },
    {
        ...sharedOptions
    }
)

export default NotificationsRoute;