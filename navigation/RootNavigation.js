import { createStackNavigator } from "react-navigation";
import TakePhotoScreen from "../screens/TakePhotoScreen";

const RootNavigation = createStackNavigator(
    {
        TakePhoto: {
            screen: TakePhotoScreen,
            navigationOptions: {
                header: null
            }
        }
    },
    {
        mode: "modal"
    }
)

export default RootNavigation;