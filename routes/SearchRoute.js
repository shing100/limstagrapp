import { createStackNavigator } from "react-navigation";
import SearchScreen from "../screens/SearchScreen";
import sharedRoutes, {sharedOptions} from "./sharedRoutes";

const SearchRoute = createStackNavigator(
    {
        Home: {
            screen: SearchScreen
        },
        ...sharedRoutes
    },
    {
        ...sharedOptions
    }
)

export default SearchRoute;