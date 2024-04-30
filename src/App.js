import { BrowserRouter as Router, Route, Link, Routes, useNavigate } from 'react-router-dom';
import Login from './Views/LoginSignUp/Login';
import HomePage from './HomePage';
import { connect } from "react-redux";
import { getAccessToken } from "./Redux/action";
import ConfigExpanses from './ConfigExpanses';
import ConfigureBudget from './ConfigureBudget';
import { useState, useEffect } from "react";
import { call } from './Services/call';
import { ToastContainer } from 'react-toastify';
import Navbar from './Navbar';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';

const App = (props) => {
  const { getAccessToken, isUserLoggedIn } = props;
  const [openDialog, setOpenDialog] = useState(false);
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isUserLoggedIn && localStorage.getItem("TOKEN")) setOpenDialog(true);
    }, 120000);

    return () => clearInterval(intervalId);
  }, [isUserLoggedIn]);

  const handleDialogClose = async () => {
      try {
        await getAccessToken();
        setOpenDialog(false);
      }
      catch (error) {
        alert('Something went wrong!!')
      }
  };
  return (
    <div className="App">
      
        <Router>
          <Routes>
            <Route path="/cofigureBudget" element={<Navbar><ConfigureBudget /></Navbar>} />
            <Route path="/addExpense" element={<Navbar><ConfigExpanses /></Navbar>} />
            <Route path="/" element={<Navbar><HomePage /></Navbar>} />
            <Route path="/signin" element={<Login />} />
            {/* <Route path="/signup" element={<Signup />} /> */}
            <Route path="*" element={<Login />} />
          </Routes>
        </Router>
        <Dialog open={openDialog}>
          <DialogTitle>Click on Ok to get refresh token</DialogTitle>
          <DialogActions>
            <Button onClick={() => handleDialogClose()}>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      <ToastContainer />
    </div>
  );
}
const mapDispatchToProps = (dispatch) => ({
  getAccessToken: () => dispatch(getAccessToken()),
});

const mapStateToProps = (state) => ({
  isUserLoggedIn: state.isUserLoggedIn,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);