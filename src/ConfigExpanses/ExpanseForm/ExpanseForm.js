import React, { useState } from 'react';

import './ExpanseForm.css';
import { MDBBtn, MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle, MDBInput } from 'mdb-react-ui-kit';
import ReactDatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
const ExpanseForm = ({ open, setOpen, catagoryList, addExpense, expansesData, }) => {
  const [description, setDescription] = useState('');
  const [amountSpent, setAmountSpent] = useState(0);
  const [categoryObj, setCategoryObj] = useState({});
  const [selectedCatId, setSelectedCatId] = useState("");
  const [selectedDate, setSelectedDate] = useState("");


  const today = new Date();

  const options = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const date = today.toLocaleString("en-US", options);

  const navigate = useNavigate();
  const handleExpanses = async () => {
    try {
      await addExpense(description, amountSpent, selectedCatId, selectedDate, navigate);
      setDescription("")
      setAmountSpent(0)
      setSelectedDate("")
      setCategoryObj({});
    } catch (er) {
      alert("Something went Wrong!!!");
    }
  };

  const handleCategorySelection = (category) => {
    setSelectedCatId(category._id);
    setCategoryObj(category);
  };

  return (<>
    <div style={{ padding: "30px", borderRadius: "10px", margin: "10px", border: "2px dotted #3b71ca" }}>
      <strong style={{ display: 'flex', justifyContent: "center", color: "#3b71ca" }}>REGISTER YOUR EXPANSE</strong>
      <MDBDropdown dropright>
        <MDBDropdownToggle>{categoryObj?.name?.length ? categoryObj.name : "EXPANSE CATEGORY"}</MDBDropdownToggle>
        <MDBDropdownMenu wrapperClass='mb-4'>
          {catagoryList && catagoryList.length > 0 && catagoryList.map((item) => (
            <MDBDropdownItem onClick={(e) => handleCategorySelection(item)} link>{item.name}</MDBDropdownItem>
          ))}
        </MDBDropdownMenu>
      </MDBDropdown>
      <br />
      <div className="container mt-1" style={{ width: '100%' }}>
        <div className="row" style={{ width: '100%' }}>
          <div className="" style={{ padding: '0px', width: '100%' }}>
            <label htmlFor="expenseDate" className="form-label" style={{ fontSize: '13px' }}>Expanse Date</label>
            <ReactDatePicker
              style={{ width: '100%' }}
              id="expenseDate"
              selected={selectedDate}
              onChange={date => setSelectedDate(date)}
              className="form-control custom-date-input"
              placeholderText='Select Date'

            />
          </div>
        </div>
      </div>
      <MDBInput type='number' value={amountSpent} onChange={(e) => setAmountSpent(e.target.value)} id='form4Example2' wrapperClass='mb-4' label='Amount Spent' />
      <MDBInput wrapperClass='mb-4' textarea value={description} onChange={(e) => setDescription(e.target.value)} id='form4Example3' rows={4} label='Expanse Description' />

      <MDBBtn onClick={() => handleExpanses()} type='submit' className='mb-4' block>
        Submit
      </MDBBtn>
    </div>
  </>
  );
};

export default ExpanseForm;
