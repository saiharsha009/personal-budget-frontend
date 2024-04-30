import React from 'react';

import { Divider, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { call } from "../../Services/call";
import { MDBAccordion, MDBAccordionItem } from 'mdb-react-ui-kit';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { useNavigate } from 'react-router-dom';


const BudgetCard = (props) => {

  const { catagory: { allocatedAmount, name, spend, _id }, dataForBudget, removeCategory } = props;

  const navigate = useNavigate();

  const handleCategoryDelete = async (index) => {
    if (dataForBudget && Object.keys(dataForBudget).length > 0) {
      const { categories } = dataForBudget;
      await call(removeCategory, _id,navigate);

    }
  };
  // console.log(catagory)

  return (<>
    <MDBAccordion style={{ margin: "15px 0" }} initialActive={1}>
      <MDBAccordionItem collapseId={1} headerTitle={<div><AssessmentIcon sx={{ color: "#3b71ca" }} /> {name}</div>}>
        <div style={{
          display: "flex",
          justifyContent: "space-between"
        }}>
          <div>
            <div><strong style={{ color: "#3b71ca" }}>Amount: </strong>{allocatedAmount}</div>
     

          </div>
          <div>
            <IconButton onClick={() => handleCategoryDelete()} size="small"><DeleteIcon sx={{ color: "#3b71ca" }} /></IconButton>
          </div>
        </div>
      </MDBAccordionItem>
    </MDBAccordion>
    <Divider />
  </>
  );
};

export default BudgetCard;
