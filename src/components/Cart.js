import { useContext, useEffect, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { GlobalContext } from './context/GlobalState';
import MenuButton from './MenuButton';
import Order from './Order';
const Cart = () => {

  const { cart } = useContext(GlobalContext);

  const [ total, setTotal ] = useState();

  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    )
  }, [cart]);

  return (
    <div className='mainAdmin'>  
     <div className="userOrders">
      <div className="cartHeaderContent shadow-sm rounded">
        <div><FaShoppingCart/> <span>{cart.length}</span> </div> 
        <MenuButton/>
      </div>
  
      <div className="orderFoodList shadow-sm">
        <table className='orders-list table table-borderless table-secondary rounded'>  
          <tbody>
            {cart.map(order => (<Order order={order} key={order.id} />))}
          </tbody> 
        </table>
        {cart.length > 0 && 
        <div className='text-center totalContainer'>
        Total : $ {total}
        </div> }
        <div className="mt-1 mb-5 proceedBtnCont">
          <button className="btn btn-outline-success btn-sm proceedBtn" type="button">Proceed</button>  
          <button className="btn btn-sm btn-outline-warning historyBtn">History</button> 
        </div>
      </div>
     </div>
    </div>
  
  )
}

export default Cart