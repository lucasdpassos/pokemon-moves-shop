import React from 'react';
import { useDispatch } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { add, setNewItemAdded } from '../features/cartSlice';


  


const PowerCard = ({ moves }) => {

  const dispatch = useDispatch();




  const handleAddPower = () => {
    console.log(moves)
    dispatch(add(moves))
    dispatch(setNewItemAdded(true));
  };

  return (
    <Card className='hover:bg-slate-600 hover:cursor-pointer hover:p-2' sx={{ minWidth: 275, maxWidth: 'calc(25% - 8px)', marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {moves.name}
        </Typography>
        <Typography variant="body2">
          {moves.url}
        </Typography>
        <button onClick={handleAddPower}>Add</button>
      </CardContent>
    </Card>
  );
};

export default PowerCard;
