import {
signInUser,
registerUser,
} from '../../../Redux/action';

export const mapStateToProps = (state) => ({
  refreshToke: state.refreshToke,
});

export const mapDispatchToProps = (dispatch) => ({
  signInUser: (email, password, navigate) => dispatch(signInUser(email, password, navigate)),
  registerUser: (username, email, password, navigate) => dispatch(registerUser(username, email, password, navigate)),
});