import { useContext } from 'react';
import { GlobalContext } from './context/GlobalState';

const Food = ({ food }) => {

  const { addToCart } = useContext(GlobalContext);

  return (
    <li className='list-group-item'>
      <span>{food.img}</span>
      <h6 className='foodName text-center'>{food.name}</h6>
      <div className='priceOrderBtn'>
        <span className='food-price foodPrice'>${food.price}</span>
        <button className="btn btn-outline-success mx-1 orderBtn" type="submit" onClick={() => addToCart(food)}>Order</button>
      </div>
        
    </li>
  )
}

export default Food