import { connect } from "react-redux";
import { actionCreators as userActions } from "../../redux/modules/user";
import Container from "./container";

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        usernameLogin: (username, password) => {
            return dispatch(userActions.usernameLogin(username, password));
        },
        facebookLogin: () => {
            return dispatch(userActions.facebookLogin());
        }
    }
}

export default connect(null, mapDispatchToProps)(Container);