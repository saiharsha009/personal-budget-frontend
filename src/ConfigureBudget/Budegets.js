import React, { useEffect, useState } from "react";
import "./Budegets.css";
// import Paper from '@mui/material/Paper';
// import TextField from '@mui/material/TextField';
import { styled } from "@mui/material/styles";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// import Chip from '@mui/material/Chip';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
import { tableCellClasses } from "@mui/material/TableCell";
import Navbar from "../Navbar";
import DeleteIcon from '@mui/icons-material/Delete';


import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';

import {
  Button,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Table,
  Chip,
  TextField,
  Paper,
  TableContainer,
  IconButton,
} from "@mui/material";
import BudgetForm from "./BudgetForm";
import EditIcon from '@mui/icons-material/Edit';
import BudgetCard from "./BudgetCard";
import { MDBBtn, MDBInput } from "mdb-react-ui-kit";
const Budegets = (props) => {
  const [catagory, setCatagory] = useState("");
  const [chipData, setChipData] = useState({});
  const [monthlyBudget, setMonthlyBudget] = useState(0);
  const [catagoryBudget, setCatagoryBudget] = useState("");
  const [calculatedAmmount, setCalculatedAmmount] = useState(0);
  const [budgetId, setBudgetId] = useState("");
  const [budgetName, setBudgetName] = useState("");

  const {
    getBudgets,
    addBudgetData,
    dataForBudget,
    createCatgory,
    removeCategory,
  } = props;


  useEffect(() => {
    const fetchBudgetData = async () => {
      try {
        const response = await getBudgets();
      } catch (er) {
        alert("Something went Wrong", er.message);
      }
    };
    fetchBudgetData();
  }, []);

  useEffect(() => {
    if (dataForBudget != null && Object.keys(dataForBudget).length > 0) {
      setBudgetId(dataForBudget._id);
      setMonthlyBudget(dataForBudget.totalAmount);
      setBudgetName(dataForBudget.name);
      const { categories } = dataForBudget;

      const transformedObject = categories.reduce((result, item) => {
        result[item.name] = item.allocatedAmount;
        return result;
      }, {});
      setChipData(transformedObject);

      let totalCategoryAmount = 0;
      dataForBudget.categories.map((cat) => {
        totalCategoryAmount += cat.allocatedAmount;
      });
      setCalculatedAmmount(totalCategoryAmount);
    }
  }, [dataForBudget]);


  const [openForm, setForm] = useState(false);


  const categories = dataForBudget?.categories;
  return (
    <>
        <MDBBtn onClick={() => setForm(!openForm)} >{openForm ? "VIEW YOUR CATEGORIES" : "CONFIGURE YOUR BUDGET"}</MDBBtn>
      <div className="masterConfigureBudgetContainer">
        {dataForBudget && dataForBudget.length != 0 ? null : !openForm && <strong style={{ width: "100%", height: '200px', display: "flex", justifyContent: "center", alignItems: "center" }}>NO BUDGET CONFIGURED YET</strong>}
        {!openForm && <div className="budgetCardsContainer">
          {categories && categories.length > 0 && categories.map((catagory) => <BudgetCard dataForBudget={dataForBudget} catagory={catagory} />)}
        </div>}
        {openForm && <BudgetForm />}
      </div >
    </>
  );
};

export default Budegets;
