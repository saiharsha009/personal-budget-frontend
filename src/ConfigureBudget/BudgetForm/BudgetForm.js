import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, TextField, Button, DialogTitle, DialogActions } from '@mui/material';
import './BudgetForm.css'; // Import your CSS file
import { call } from '../../Services/call';
import { MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

const BudgetForm = (props) => {
  const [monthlyBudget, setMonthlyBudget] = useState('');
  const [budgetName, setBudgetName] = useState('');
  // const [category, setCategory] = useState('');
  // const [categoryBudget, setCategoryBudget] = useState('');
  const [catagory, setCatagory] = useState("");
  const [chipData, setChipData] = useState({});
  // const [monthlyBudget, setMonthlyBudget] = useState(0);
  const [catagoryBudget, setCatagoryBudget] = useState("");
  const [calculatedAmmount, setCalculatedAmmount] = useState(0);
  const [budgetId, setBudgetId] = useState("");
  // const [budgetName, setBudgetName] = useState("");
  const {
    open,
    setOpen,
  } = props;


  const {
    getBudgets,
    addBudgetData,
    dataForBudget,
    createCatgory,
    removeCategory,
  } = props;


  useEffect(() => {
    const getData = async () => {
      try {
        await getBudgets();
      } catch (er) {
        alert("Something went Wrong");
      }
    };
    getData();
  }, [])


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

  const handleChipData = async () => {
    if (dataForBudget && Object.keys(dataForBudget).length > 0) {
      await call(createCatgory, catagory, catagoryBudget, budgetId)

    }
    // else {
    const newChipObject = {
      ...chipData,
      ...{ [catagory]: catagoryBudget },
    };
    setCalculatedAmmount(
      parseInt(calculatedAmmount) + parseInt(catagoryBudget)
    );
    setChipData(newChipObject);
    setCatagoryBudget("");
    setCatagory("");
  };

  const navigate = useNavigate();
  const handleDataSubmit = async () => {
    await call(addBudgetData, budgetName, monthlyBudget, chipData,navigate)
  };
  return (<>
    <div style={{ padding: "30px", borderRadius: "10px", margin: "10px", border: "2px dotted #3b71ca" }}>
      <strong style={{ display: 'flex', justifyContent: "center", color: "#3b71ca", margin: "0 0 15px 0" }}>REGISTER YOUR BUDGET</strong>
      {/* <MDBInput type='text' onChange={(e) => setBudgetName(e.target.value)} value={budgetName} disabled={dataForBudget && dataForBudget.length !=0} id='form4Example2' wrapperClass='mb-4' label='Name your budget' /> */}
      {/* <MDBInput type='number' onChange={(e) => setMonthlyBudget(e.target.value)} value={monthlyBudget} id='form4Example2' wrapperClass='mb-4' disabled={dataForBudget && dataForBudget.length !=0} label='Budget Amount' /> */}
      <MDBInput type='text' onChange={(e) => setCatagory(e.target.value)}  id='form4Example2' wrapperClass='mb-4' label='Name your category' />
      <MDBInput type='number' onChange={(e) => setCatagoryBudget(e.target.value)}  id='form4Example2' wrapperClass='mb-4' label='Set Category Amount' />
      {/* <MDBBtn onClick={} type='submit' className='mb-4' disabled={!dataForBudget || dataForBudget.length === 0} >
        ADD CATEGORY
      </MDBBtn> */}
      <MDBBtn onClick={() => handleChipData()} type='submit' style={{ margin: '0' }}  block>
        Submit
      </MDBBtn>
    </div>
  </>
  );
};

export default BudgetForm;
