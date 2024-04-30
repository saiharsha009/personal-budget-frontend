
import {
  REGISTER_USER,
  REGISTER_USER_FULFILLED,
  REGISTER_USER_PENDING,
  REGISTER_USER_REJECTED,
  SIGNIN_USER,
  SIGNIN_USER_FULFILLED,
  SIGNIN_USER_PENDING,
  SIGNIN_USER_REJECTED,
  CREATE_BUDGET,
  CREATE_BUDGET_FULFILLED,
  CREATE_BUDGET_PENDING,
  CREATE_BUDGET_REJECTED,
  FETCH_BUDGET,
  FETCH_BUDGET_FULFILLED,
  FETCH_BUDGET_PENDING,
  FETCH_BUDGET_REJECTED,
  CREATE_CATEGORY,
  CREATE_CATEGORY_PENDING,
  CREATE_CATEGORY_FULFILLED,
  CREATE_CATEGORY_REJECTED,
  CREATE_EXPANSE,
  CREATE_EXPANSE_PENDING,
  CREATE_EXPANSE_FULFILLED,
  CREATE_EXPANSE_REJECTED,
  FETCH_EXPANSE,
  FETCH_EXPANSE_PENDING,
  FETCH_EXPANSE_FULFILLED,
  FETCH_EXPANSE_REJECTED,
  REMOVE_EXPANSE,
  REMOVE_EXPANSE_PENDING,
  REMOVE_EXPANSE_FULFILLED,
  REMOVE_EXPANSE_REJECTED,
  REMOVE_CATEGORY,
  REMOVE_CATEGORY_PENDING,
  REMOVE_CATEGORY_FULFILLED,
  REMOVE_CATEGORY_REJECTED,
  FETCH_EXPANSES_AND_DATES,
  FETCH_EXPANSES_AND_DATES_PENDING,
  FETCH_EXPANSES_AND_DATES_FULFILLED,
  FETCH_EXPANSES_AND_DATES_REJECTED,
  FETCH_REFRESH_TOKEN,
  FETCH_REFRESH_TOKEN_PENDING,
  FETCH_REFRESH_TOKEN_FULFILLED,
  FETCH_REFRESH_TOKEN_REJECTED,
  HANDLE_LOGOUT,
} from './actionTypes';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
  refreshToke: '',
  ussToken: '',
  activeUserDetails: {
    username: '',
    email: '',
    _id: '',
    refreshToken: '',
  },
  totalBudget: 0,
  isLoading: true,
  userRegistrationSuccessful: false,
  isUserLoggedIn: false,
  dataForBudget: {},
  expensesData: [],
  barChartExpnesesData: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case REGISTER_USER_PENDING: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case REGISTER_USER_FULFILLED: {
      console.log(action.payload)
      const {
        token,
        refreshToken,
        user,
      } = action.payload;

      toast.success(`Welcome ${user.name}!!`)
      localStorage.setItem('TOKEN', token);
      localStorage.setItem('REF_TOKEN', refreshToken);


      return {
        ...state,
        isLoading: false,
        userRegistrationSuccessful: true,
        ussToken: token,
        activeUserDetails: {
          username: user.name,
          _id: user.id,
          email: user.email,
          refreshToken: user.refreshToken
        }
      }
    }
    case REGISTER_USER_REJECTED: {
      console.log(action.payload)
      toast.error(action.payload)
      return {
        ...state,
        isLoading: false,
        userRegistrationSuccessful: false,
      }
    }
    case HANDLE_LOGOUT: {
      localStorage.clear();
      debugger
      return {
        ...state,
        isUserLoggedIn: false,
      }
    }
    case SIGNIN_USER: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case SIGNIN_USER_PENDING: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case SIGNIN_USER_FULFILLED: {
      console.log(action.payload)
      const {
        token,
        refreshToken,
        user,
      } = action.payload;

      toast.success(`Welcome ${user.name}!!`)
      localStorage.setItem('TOKEN', token);
      localStorage.setItem('REF_TOKEN', refreshToken);


      return {
        ...state,
        isLoading: false,
        isUserLoggedIn: true,
        userRegistrationSuccessful: true,
        ussToken: token,
        activeUserDetails: {
          username: user.name,
          _id: user.id,
          email: user.email,
          refreshToken: user.refreshToken
        }
      }
    }
    case SIGNIN_USER_REJECTED: {
      console.log(action.payload)
      toast.error(action.payload)
      return {
        ...state,
        isLoading: false,
        userRegistrationSuccessful: false,
      }
    }
    case CREATE_BUDGET: {
      return {
        ...state,
      }
    }
    case CREATE_BUDGET_PENDING: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case CREATE_BUDGET_FULFILLED: {
      return {
        ...state,
      }
    }
    case CREATE_BUDGET_REJECTED: {
      return {
        ...state,
      }
    }
    case FETCH_BUDGET: {
      return {
        ...state,
      }
    }
    case FETCH_BUDGET_PENDING: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case FETCH_BUDGET_FULFILLED: {
      const budgets = action.payload;
      if (budgets[0]) {
        let budgetAmount = 0;
        budgets[0]?.categories && budgets[0]?.categories.map(cat => {
          budgetAmount += cat.allocatedAmount;
        })
        return {
          ...state,
          dataForBudget: budgets[0],
          totalBudget: budgetAmount,
        }
      }
      else {
        return {
          ...state,
          dataForBudget: null,
        }
      }

    }
    case FETCH_BUDGET_REJECTED: {
      toast.error('Could not get Budgets!!!');
      return {
        ...state,
      }
    }

    case CREATE_CATEGORY: {
      return {
        ...state,
      }
    }
    case CREATE_CATEGORY_PENDING: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case CREATE_CATEGORY_FULFILLED: {
      toast.success("Category Added")

      return {
        ...state,
      }

    }
    case CREATE_CATEGORY_REJECTED: {
      toast.error('Could not add Category!!!');
      return {
        ...state,
      }
    }
    case CREATE_EXPANSE: {
      return {
        ...state,
      }
    }
    case CREATE_EXPANSE_PENDING: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case CREATE_EXPANSE_FULFILLED: {
      toast.success('Expense Created!!');

      return {
        ...state,
      }

    }
    case CREATE_EXPANSE_REJECTED: {
      toast.error('Could not add Expense!!!');
      return {
        ...state,
      }
    }
    case FETCH_EXPANSE: {
      return {
        ...state,
      }
    }
    case FETCH_EXPANSE_PENDING: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case FETCH_EXPANSE_FULFILLED: {
      const data = action.payload
      // debugger
      console.log(data)

      return {
        ...state,
        expensesData: data,
      }

    }
    case FETCH_EXPANSE_REJECTED: {
      toast.error(action.payload);
      return {
        ...state,
      }
    }
    case REMOVE_EXPANSE: {
      return {
        ...state,
      }
    }
    case REMOVE_EXPANSE_PENDING: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case REMOVE_EXPANSE_FULFILLED: {
      toast.success('Expense Deleted Successfully!!!')
      return {
        ...state,
      }

    }
    case REMOVE_EXPANSE_REJECTED: {
      toast.error(action.payload);
      return {
        ...state,
      }
    }

    case REMOVE_CATEGORY: {
      return {
        ...state,
      }
    }
    case REMOVE_CATEGORY_PENDING: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case REMOVE_CATEGORY_FULFILLED: {
      toast.success('Category Deleted Successfully!!!')
      return {
        ...state,
      }

    }
    case REMOVE_CATEGORY_REJECTED: {
      toast.error(action.payload);
      return {
        ...state,
      }
    }
    case FETCH_EXPANSES_AND_DATES: {
      return {
        ...state,
      }
    }
    case FETCH_EXPANSES_AND_DATES_PENDING: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case FETCH_EXPANSES_AND_DATES_FULFILLED: {
      const data = action.payload;
      return {
        ...state,
        barChartExpnesesData: data,
      }
    }
    case FETCH_EXPANSES_AND_DATES_REJECTED: {
      toast.error(action.payload);
      return {
        ...state,
      }
    }

    case FETCH_REFRESH_TOKEN: {
      return {
        ...state,
      }
    }
    case FETCH_REFRESH_TOKEN_PENDING: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case FETCH_REFRESH_TOKEN_FULFILLED: {
      const {token} = action.payload;
      console.log(token)
      localStorage.setItem('TOKEN', token);
      toast.success('Recieved Refresh Token!!!', {
        position: toast.POSITION.BOTTOM_LEFT,
      })
      return {
        ...state,
      }
    }
    case FETCH_REFRESH_TOKEN_REJECTED: {
      toast.error(action.payload);
      return {
        ...state,
      }
    }
    default: return state;
  };
};

export default reducer;