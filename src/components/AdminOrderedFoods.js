import { useContext } from 'react';
import { GlobalContext } from './context/GlobalState';
import AdminOrderedFood from './AdminOrderedFood';

const Orders = () => {
  const { cart } = useContext(GlobalContext);

  return (
    <>
      <table className='orderTable table '>
        <thead>
          <tr>
            <th scope="col">Foods</th>
            <th scope="col">Price</th>
            <th scope="col">Qty</th>
            <th scope="col">Accepted</th>
            <th scope="col">Declined</th>
            <th scope="col">Done</th>
          </tr>
        </thead>  
        <tbody>
            {cart.map(order => (<AdminOrderedFood key={order.id} order={order}/>))}
        </tbody>    
      </table>
    </>
  )
}

export default Orders