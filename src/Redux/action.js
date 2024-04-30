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

import Axios from '../Services/Service'

export const registerUser = (username, email, password, navigate) => {
  const data = {
    name: username,
    email: email,
    password: password,
  };

  return (dispatch) => {
    dispatch({ type: REGISTER_USER_PENDING });
    Axios.post('/user/registerUser', data)
      .then((res) => {
        dispatch({ type: REGISTER_USER_FULFILLED, payload: res.data });
        navigate('/')
      })
      .catch((error) => {
        dispatch({ type: REGISTER_USER_REJECTED, payload: error?.response?.data?.message })
      });
  };
};

export const handleLogout = () => {
  return (dispatch) => {
    dispatch({ type: HANDLE_LOGOUT, });
  }
}

export const signInUser = (email, password, navigate) => {
  const data = {
    email,
    password,
  }
  localStorage.clear();
  return (dispatch) => {
    dispatch({ type: SIGNIN_USER_PENDING });

    Axios.post('/user/signIn', data)
      .then((res) => {
        // console.log(res.data)
        dispatch({ type: SIGNIN_USER_FULFILLED, payload: res.data });
        navigate('/');
      })
      .catch((err) => {
        navigate('/signin')
        dispatch({ type: SIGNIN_USER_REJECTED, payload: err?.response?.data?.message });
      });
  };
}

export const getBudgets = (navigate) => {
  return (dispatch) => {
    dispatch({ type: FETCH_BUDGET_PENDING });
    Axios.get('/budget/getBudgetData')
    .then(res => {
      console.log(res.data)
       dispatch({ type: FETCH_BUDGET_FULFILLED, payload: res.data});
    })
    .catch((err) => {
      navigate('/signin')

       dispatch({ type: FETCH_BUDGET_REJECTED, payload: err?.response?.data?.message });
    })
  }
};


export const addBudgetData = (budgetName, totalAmount, catagories, navigate) => {
  
  const catagoriesArray = Object.entries(catagories).map(([name, amount]) => ({
    name,
    amount,
  }));
  const data = {

    budget: {
      name: budgetName,
      categories: catagoriesArray,
      totalAmount,

    }
  }

  return (dispatch) => {
    dispatch({ type: CREATE_BUDGET_PENDING });
    Axios.post('/budget/createBudget', data)
    .then((res) => {
      dispatch({ type: CREATE_BUDGET_FULFILLED, payload: res.data });
      dispatch(getBudgets());
    })
    .catch(err => {
      navigate('/signin')

      dispatch({ type: CREATE_BUDGET_REJECTED, payload: err?.response?.data?.message });
    })
  }
}

export const createCatgory = (name,allocatedAmount,budgetId, navigate) => {
  const data = {
    name,
    allocatedAmount,
    budgetId
  }
  return (dispatch) => {
    dispatch({ type: CREATE_CATEGORY_PENDING })
    Axios.post('/budget/createBudgetCategory', data)
    .then((res) => {
      dispatch({ type: CREATE_CATEGORY_FULFILLED, payload: res.data });
    })
    .catch(err => {
      // navigate('/signin')

      dispatch({ type: CREATE_CATEGORY_REJECTED, payload: err?.response?.data?.message })
    })
  }
}


export const getAllExpensesAndDate = (navigate) => {
  return (dispatch) => {
    dispatch({ type: FETCH_EXPANSES_AND_DATES_PENDING });
    Axios.get('/budget/getExpanseAndDateData')
    .then(res => {
      dispatch({ type: FETCH_EXPANSES_AND_DATES_FULFILLED, payload: res.data });
    })
    .catch(err => {
      navigate('/signin')

      dispatch({ type: FETCH_EXPANSES_AND_DATES_REJECTED, payload: err.response?.data?.message });
    });
  };
};

export const getAccessToken = () => {
  const data = {
    refreshToken: localStorage.getItem('REF_TOKEN'),
  }
  console.log(data);
  return (dispatch) => {
    dispatch({ type: FETCH_REFRESH_TOKEN_PENDING })
    Axios.post('/user/getJwToken', data)
    .then(res => {
      dispatch({ type: FETCH_REFRESH_TOKEN_FULFILLED, payload: res.data });
    })
    .catch((err) => {

      dispatch({ type: FETCH_REFRESH_TOKEN_REJECTED, payload: err.response?.data?.message })
    })
  }
}


export const getExpenses = (navigate) => {

  return (dispatch) => {
    dispatch({ type: FETCH_EXPANSE_PENDING });
    Axios.get('/budget/getAllUsersExpanseData')
    .then(res => {
      dispatch({ type: FETCH_EXPANSE_FULFILLED, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: FETCH_EXPANSE_REJECTED, payload: err?.response?.data?.message})
    });
  }
}

export const removeCategory = (_id, navigate) => {
  const data = {
    categoryId: _id,
  }
  return (dispatch) => {
    dispatch({ type: REMOVE_CATEGORY_PENDING });
    Axios.post('/budget/deleteBudgetCategory', data)
    .then(res => {
      dispatch({ type: REMOVE_CATEGORY_FULFILLED, payload: res.data });
      dispatch(getBudgets());
    })
    .catch(err => {
      navigate('/signin')

      dispatch({ type: REMOVE_CATEGORY_REJECTED, payload: err?.response?.data?.message})
    });
  }
}

export const removeExpanse = (_id, navigate) => {
  const data = {
    expenseId: _id,
  }
  return (dispatch) => {
    dispatch({ type: REMOVE_EXPANSE_PENDING });
    Axios.post('/budget/deleteUserExpanseData', data)
    .then(res => {
      dispatch({ type: REMOVE_EXPANSE_FULFILLED, payload: res.data });
      dispatch(getExpenses(navigate));
    })
    .catch(err => {
      navigate('/signin')

      dispatch({ type: REMOVE_EXPANSE_REJECTED, payload: err?.response?.data?.message})
    });
  }
}


export const addExpense = (description, amount, categoryId, date, navigate) => {
  const data = {
    description,
    amount,
    categoryId,
    date,
  }
  return (dispatch) => {
    dispatch({ type: CREATE_EXPANSE_PENDING })
    Axios.post('/budget/createUserExpanse', data)
    .then(res => {
      dispatch({ type: CREATE_EXPANSE_FULFILLED, payload: res.data });
      dispatch(getExpenses(navigate));
    })
    .catch(err => {
      // navigate('/signin')
      dispatch({ type: CREATE_EXPANSE_REJECTED, payload: err?.response?.data?.message });
    })
  }
}