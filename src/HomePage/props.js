import {
  getBudgets,
  addBudgetData,
  createCatgory,
  removeCategory,
  getExpenses,
  getAllExpensesAndDate,
} from '../Redux/action';

export const mapDispatchToProps = (dispatch) => ({
  getBudgets: (navigate) => dispatch(getBudgets(navigate)),
  getAllExpensesAndDate: (navigate) => dispatch(getAllExpensesAndDate(navigate)),
  getExpenses: (navigate) => dispatch(getExpenses(navigate)),
});

export const mapStateToProps = (state) => ({
  userRegistrationSuccessful: state.userRegistrationSuccessful,
  activeUserDetails: state.activeUserDetails,
  dataForBudget: state.dataForBudget,
  barChartExpnesesData: state.barChartExpnesesData,
  expensesData: state.expensesData,
});