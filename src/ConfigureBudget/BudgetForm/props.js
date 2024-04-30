import {
  getBudgets,
  addBudgetData,
  createCatgory,
  removeCategory,
} from '../../Redux/action';

export const mapDispatchToProps = (dispatch) => ({
  addBudgetData: (budgetName, totalAmount, catagories, categoryName) => dispatch(addBudgetData(budgetName, totalAmount, catagories, categoryName)),
  createCatgory: (name,allocatedAmount,budgetId) => dispatch(createCatgory(name,allocatedAmount,budgetId)),
  removeCategory: (_id,navigate) => dispatch(removeCategory(_id,navigate)),
  getBudgets: (navigate) => dispatch(getBudgets(navigate)),
});

export const mapStateToProps = (state) => ({
  userRegistrationSuccessful: state.userRegistrationSuccessful,
  dataForBudget: state.dataForBudget,
  activeUserDetails: state.activeUserDetails,
});