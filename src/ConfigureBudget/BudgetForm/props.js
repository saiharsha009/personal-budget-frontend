import {
  getBudgets,
  addBudgetData,
  createCatgory,
  removeCategory,
} from '../../Redux/action';

export const mapDispatchToProps = (dispatch) => ({
  addBudgetData: (budgetName, totalAmount, catagories,navigate) => dispatch(addBudgetData(budgetName, totalAmount, catagories,navigate)),
  createCatgory: (name,allocatedAmount,budgetId,navigate) => dispatch(createCatgory(name,allocatedAmount,budgetId,navigate)),
  removeCategory: (_id,navigate) => dispatch(removeCategory(_id,navigate)),
  getBudgets: (navigate) => dispatch(getBudgets(navigate)),
});

export const mapStateToProps = (state) => ({
  userRegistrationSuccessful: state.userRegistrationSuccessful,
  dataForBudget: state.dataForBudget,
  activeUserDetails: state.activeUserDetails,
});