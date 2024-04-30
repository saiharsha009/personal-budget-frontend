import {
  handleLogout,
  getBudgets,
} from '../Redux/action';

export const mapDispatchToProps = (dispatch) => ({
  handleLogout: () => dispatch(handleLogout()),
  getBudgets: () => dispatch(getBudgets()),
});

export const mapStatetoProps = (state) => ({
  dataForBudget: state.dataForBudget,
  totalBudget: state.totalBudget,
});


