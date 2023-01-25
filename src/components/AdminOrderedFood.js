import { useContext, useState } from 'react';
import { GlobalContext } from './context/GlobalState';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'

const Order = ({ order }) => {

  const { acceptFoodOrder , rejectFoodOrder, deliverOrder} = useContext(GlobalContext);

  const [rightBorderColor, setRightBorderColor ] = useState('');
  const [rightBorderWidth, setRightBorderWidth] = useState('');

  const [accepted, setAccept] = useState('accept');
  const [declined, setDeclined] = useState('decline');

  const [acceptBGColor, setAcceptBGColor] = useState('');
  const [acceptTextColor, setAcceptTextColor] = useState('green');

  const [declinedBGColor, setDeclinedBGColor] = useState('');
  const [declinedTextColor, setDeclinedTextColor] = useState('red');

  // Accept order func
  const acceptOrder = (order) => {

    if(order.accepted === false) {
      const accepted = !order.accepted;
      const rejected = false;

      const newFood = {
        id: order.id,
        accepted: accepted,
        rejected: rejected
      }
      acceptFoodOrder(newFood);
      setAccept('accepted');
      setDeclined('decline');      
      setAcceptBGColor('green');
      setAcceptTextColor('white');
      setDeclinedTextColor('red')
      setDeclinedBGColor('');
    } else {
      const accepted = !order.accepted;
      const rejected = order.rejected;

      const newFood = {
        id: order.id,
        accepted: accepted,
        rejected: rejected
      }
      rejectFoodOrder(newFood);
      setAccept('accept');
      setDeclined('decline');
      setAcceptBGColor('');
      setAcceptTextColor('green');
    }
  }

  // Reject order func
  const rejectOrder = (order) => {

    if(order.rejected === false) {

      if(order.delivered === false) {
        const rejected = !order.rejected;
        const accept = false;

        const rejectedFood = {
          id: order.id,
          accepted: accept,
          rejected: rejected,

      }
        setDeclined('declined')
        setAccept('accept')
        acceptFoodOrder(rejectedFood);     
        setDeclinedBGColor('red');
        setDeclinedTextColor('white');
        setAcceptBGColor('');
        setAcceptTextColor('green');

      }
      
      
    } else {
      const rejected = !order.rejected
      const accepted = false;
      const delivered = false;

      const newFood = {
        id: order.id,
        accepted: accepted,
        rejected: rejected,
        delivered: delivered
      }
      setDeclined('decline')
      setAccept('accept')
      rejectFoodOrder(newFood);
      setDeclinedTextColor('red')
      setDeclinedBGColor('');
      setRightBorderColor('');
      setRightBorderWidth('');
    }
  }

  // Delivered orders
  const completed = (order) => {

    if(order.delivered === false) {

      if(order.rejected === false){
        const newFood = {
          id: order.id,
          delivered: !order.delivered
        }
  
        deliverOrder(newFood);
        setRightBorderColor('green');
        setRightBorderWidth('7px');
      }
    } else {

      const newFood = {
        id: order.id,
        delivered: !order.delivered
      } 

      deliverOrder(newFood);
      setRightBorderColor('');      
      setRightBorderWidth('');
    }
      
  }

  return (
    <tr style={{ borderRightColor: rightBorderColor, borderRightWidth: rightBorderWidth}} >
      <td>{order.name}</td>
      <td className="adminOrderPrice">${order.price}</td>
      <td className="adminOrderPrice">{order.qty}</td>   
      <td>
        <button className="btn btn-sm acceptBtn border-0 shadow-sm" type="button" onClick={() => acceptOrder(order)} style={{ backgroundColor: acceptBGColor, color: acceptTextColor}}>{accepted}</button>
      </td>
      <td>
        <button className="btn declineBtn btn-sm border-0 shadow-sm" type="button" onClick={() => rejectOrder(order)} style={{ backgroundColor: declinedBGColor, color : declinedTextColor }}>{declined}</button> 
      </td>
      <td>
        <button className="btn deliveredBtn btn-sm border-0 shadow-sm" type="button" onClick={() => completed(order)} style={{ borderRightColor: rightBorderWidth  }}><IoMdCheckmarkCircleOutline/></button> 
      </td>
    </tr>
    
  )
}

export default Order