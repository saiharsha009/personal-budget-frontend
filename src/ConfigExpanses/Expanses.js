import React, { useEffect, useState } from "react";
import "./Expanses.css";
import ExpanseForm from "./ExpanseForm";
import ExpanseCard from "./ExpanseCard";
import { MDBBtn, MDBCheckbox, MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle, MDBInput } from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";


const currentDate = new Date();


const Expanses = (props) => {
  
  const dateOpt = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    day: "numeric",
    month: "short",
    year: "numeric",
  };


  const [expansesData, setDataForExpanses] = useState([]);
  const [filterCatagoryName, setSelectedCatName] = useState("SELECT CATEGORY");
  const [filterData, setFilterData] = useState([]);
  const [filterActive, setActiveFilter] = useState(false);

  const [catagoryList, setCatagoryList] = useState([]);
  const [selectedCatId, setSelectedCatId] = useState("");

  const [openForm, setOpenForm] = useState(false);



  const {
    dataForBudget,
    getBudgets,
    getExpenses,
    expensesData,
  } = props;

  useEffect(() => {

    if (expensesData.length > 0) {
      const newArray = expensesData.map((item) => ({
        amountSpent: item.amount,
        date: item.date,
        description: item.description,
        _id: item._id,
        selectedCategory: item.categoryName,
      }));
      setDataForExpanses(newArray);
    }
  }, [expensesData]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await getBudgets();
        await getExpenses(selectedCatId, navigate);
      } catch (er) {
        alert("Something went Wrong", er.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (dataForBudget && Object.keys(dataForBudget).length > 0) {
      setCatagoryList(dataForBudget.categories);
    }
  }, [dataForBudget]);


  const handleFilter = (e) => {
    setSelectedCatName(e.target.innerText);
    if (e.target.innerText === "All") {
      setActiveFilter(false);
      setFilterData(expansesData);
    } else {
      let filteredArray;
      setActiveFilter(true);
      filteredArray = expansesData.filter(
        (obj) => obj.selectedCategory === e.target.innerText
      );
      setFilterData(filteredArray);
      console.log(filteredArray, filterActive);
    }
  };


  return (
    <>
      <div className="masterExpanseContainer">
        <div style={{
          display: 'flex',
          justifyContent: "space-between"
        }}>
          {!openForm && catagoryList && catagoryList.length > 0 && <MDBDropdown>
            <MDBDropdownToggle>{filterCatagoryName}</MDBDropdownToggle>
            <MDBDropdownMenu>
              <MDBDropdownItem onClick={(e) => handleFilter(e)} link>All</MDBDropdownItem>
              {catagoryList.map((item) => {
                return <MDBDropdownItem onClick={(e) => handleFilter(e)} link>{item.name}</MDBDropdownItem>
              })}
            </MDBDropdownMenu>
          </MDBDropdown>}
          {dataForBudget && dataForBudget.length != 0 && catagoryList && catagoryList.length > 0 ? <MDBBtn  onClick={() => setOpenForm(!openForm)} >
            {openForm ? "VIEW YOUR EXPENSES" : "ADD AN EXPENSE"}</MDBBtn> : <strong style={{
              fontSize: "30px",
              height: '200px',
              display: 'flex',
              width: '100%',
              justifyContent: "center",
              alignItems: "center"
            }}><Link to="/cofigureBudget" style={{ margin: "0 10px 0 0", textDecoration: "underline" }}>Configure your budget</Link> to add expanses!!!</strong>}
        </div>
        {!openForm && dataForBudget && dataForBudget.length != 0 && catagoryList && catagoryList.length > 0 && <div>
          {(filterActive ? filterData : expansesData).length === 0 ?
            <strong style={{
              fontSize: "30px",
              height: '200px',
              display: 'flex',
              justifyContent: "center",
              alignItems: "center"
            }}>
              No Expenses!
            </strong>
            :
            (filterActive ? filterData : expansesData).map((data) => {
              return (
                <ExpanseCard expanse={data} />
              );
            })}
        </div>}

        {openForm && dataForBudget && dataForBudget.length != 0 && <ExpanseForm catagoryList={catagoryList} />}
      </div>

    </>
  );
};

export default Expanses;
