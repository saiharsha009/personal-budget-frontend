import {
  getBudgets,
  addBudgetData,
  createCatgory,
  addExpense,
  getExpenses,
  removeExpanse,
} from '../Redux/action';

export const mapDispatchToProps = (dispatch) => ({
  getBudgets: () => dispatch(getBudgets()),
  addBudgetData: (budgetName, totalAmount, catagories,navigate) => dispatch(addBudgetData(budgetName, totalAmount, catagories,navigate)),
  createCatgory: (name,allocatedAmount,budgetId,navigate ) => dispatch(createCatgory(name,allocatedAmount,budgetId, navigate)),
  addExpense: (description, amount, categoryId, date, navigate) => dispatch(addExpense(description, amount, categoryId, date, navigate)),
  getExpenses: (categoryId, navigate) => dispatch(getExpenses(categoryId, navigate)),
  removeExpanse: (categoryId, navigate) => dispatch(removeExpanse(categoryId, navigate)),
});

export const mapStateToProps = (state) => ({
  userRegistrationSuccessful: state.userRegistrationSuccessful,
  activeUserDetails: state.activeUserDetails,
  dataForBudget: state.dataForBudget,
  expensesData: state.expensesData,
});