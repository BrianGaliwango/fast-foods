import { useContext } from 'react';
import { GlobalContext } from './context/GlobalState';

const Order = ({ order }) => {
  const { addQuantity, deleteFromCart, decreaseQuantity } = useContext(GlobalContext);

  // Decrease func
  const decQuantity = (order) => {
    if(order.qty > 1){
      decreaseQuantity(order);
    }
  }

  return (
    <>
    <tr className="foodRow">
      <td>{order.name}</td>
      <td>&nbsp;</td>
      <td className="adminOrderPrice">
        <div className='quantityBtnsContainer'>
          <button className="addQtyBtn" onClick={() => addQuantity(order)}>+</button>   
          <span className="text-primary">{order.qty}</span>
          <button className="decQtyBtn" onClick={() => decQuantity(order)}>-</button>      
        </div>      
      </td>
      <td> ${order.price * order.qty} </td>
      <td>  <button className="removeItemBtn" onClick={() => deleteFromCart(order.id)}>x</button> </td>
    </tr>
    </>
  )
}

export default Order