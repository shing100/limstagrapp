import { connect } from "react-redux"
import { actionCreators as photoActions } from "../../redux/modules/photos";
import Container from "./contanier";

const mapStateToProps = (state, ownProps) => {
    const { photos: { search } } = state;
    return {
        search
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getEmptyFeed: () => {
            dispatch(photoActions.getSearch());
        },
        searchHashtag: hashtag => {
            dispatch(photoActions.searchByHashtag(hashtag));
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Container);