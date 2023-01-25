import { useContext, useState } from 'react';
import { GlobalContext } from './context/GlobalState';

const Order = ({ order }) => {

  const { acceptFoodOrder , rejectFoodOrder} = useContext(GlobalContext);

  const [rightBorderColor, setRightBorderColor ] = useState('');
  const [rightBorderWidth, setRightBorderWidth] = useState('');

  // Accept order func
  const acceptOrder = (order) => {

    if(order.accepted === false) {
      const accepted = !order.accepted;
      const rejected = false;

      const rejectedFood = {
        id: order.id,
        accepted: accepted,
        rejected: rejected
      }
      acceptFoodOrder(rejectedFood);
      setRightBorderColor('green');
      setRightBorderWidth('7px');
    } else {
      const accepted = !order.accepted;
      const rejected = order.rejected;

      const newFood = {
        id: order.id,
        accepted: accepted,
        rejected: rejected
      }
      rejectFoodOrder(newFood);
      setRightBorderColor('');
      setRightBorderWidth('');
    }
  }

  // Reject order func
  const rejectOrder = (order) => {

    if(order.rejected === false) {
      const rejected = !order.rejected;
      const accept = false;

      const rejectedFood = {
        id: order.id,
        accepted: accept,
        rejected: rejected
      }
      acceptFoodOrder(rejectedFood);
      setRightBorderColor('red');
      setRightBorderWidth('7px');
    } else {
      const rejected = !order.rejected
      const accepted = false;

      const newFood = {
        id: order.id,
        accepted: accepted,
        rejected: rejected
      }
      rejectFoodOrder(newFood);
      setRightBorderColor('');
      setRightBorderWidth('');
    }
  }

  return (
    <tr style={{ borderRightColor: rightBorderColor, borderRightWidth: rightBorderWidth}} >
      <td>{order.name}</td>
      <td className="adminOrderPrice">${order.price}</td>
      <td>
        <button className="btn btn-sm btn-outline-success acceptBtn border-0 shadow-sm" type="button" onClick={() => acceptOrder(order)}>Accept</button>
      </td>
      <td>
        <button className="btn btn-outline-danger declineBtn btn-sm border-0 shadow-sm" type="button" onClick={() => rejectOrder(order)}>Decline</button> 
      </td>
    </tr>
    
  )
}

export default Order