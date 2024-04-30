import * as React from 'react';
import { Divider, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { call } from '../../Services/call';
import { MDBAccordion, MDBAccordionItem } from 'mdb-react-ui-kit';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
const ExpanseCard = (props) => {
  const { expanse: { selectedCategory, date, description, amountSpent, _id }, removeExpanse } = props;
  const handleExpenseDelete = async (_id) => {
    await call(removeExpanse, _id);
  };
  return (<>
    <MDBAccordion style={{ margin: "15px 0" }} initialActive={1}>
      <MDBAccordionItem collapseId={1} headerTitle={<div><AlignHorizontalLeftIcon sx={{ color: "#3b71ca" }} /> {selectedCategory}</div>}>
        <div style={{
          display: "flex",
          justifyContent: "space-between"
        }}>
          <div>
            <div><strong style={{ color: "#3b71ca" }}>Date: </strong>{date.substring(0, 10)}</div>
            <div><strong style={{ color: "#3b71ca" }}>Amount: </strong>{amountSpent}</div>
            <div><strong style={{ color: "#3b71ca" }}>Description:</strong></div>
            <div>{description}</div>
          </div>
          <div>
            <IconButton onClick={() => handleExpenseDelete(_id)} size="small"><DeleteIcon sx={{ color: "#3b71ca" }} /></IconButton>
          </div>
        </div>
      </MDBAccordionItem>
    </MDBAccordion>
    <Divider />
  </>)
};

export default ExpanseCard;
