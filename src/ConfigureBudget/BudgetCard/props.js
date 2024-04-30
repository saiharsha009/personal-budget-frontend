import {
  getBudgets,
  addBudgetData,
  createCatgory,
  removeCategory,
} from '../../Redux/action';

export const mapDispatchToProps = (dispatch) => ({
  getBudgets: (navigate) => dispatch(getBudgets(navigate)),
  // addBudgetData: (budgetName, totalAmount, catagories) => dispatch(addBudgetData(budgetName, totalAmount, catagories)),
  // createCatgory: (name,allocatedAmount,budgetId) => dispatch(createCatgory(name,allocatedAmount,budgetId)),
  removeCategory: (_id,navigate) => dispatch(removeCategory(_id,navigate)),
});

export const mapStateToProps = (state) => ({
  userRegistrationSuccessful: state.userRegistrationSuccessful,
  activeUserDetails: state.activeUserDetails,
  dataForBudget: state.dataForBudget,
});