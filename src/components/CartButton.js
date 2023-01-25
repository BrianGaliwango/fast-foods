import { useContext } from 'react';
import { GlobalContext } from './context/GlobalState'
import { Link } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";


const CartButton = () => {
  const { cart } = useContext(GlobalContext)
  return (
      <Link to="/Cart" className='nav-link ordersBtn text-dark btn btn-outline-success '><FaShoppingCart className="cart-icon"/> &nbsp;{cart.length}</Link>
  )
}

export default CartButton