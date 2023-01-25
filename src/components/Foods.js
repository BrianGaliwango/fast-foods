import { useContext } from 'react';
import { GlobalContext } from './context/GlobalState';
import Food from './Food';

const Foods = () => {
   // Get Context
   const { foods, foundFood } = useContext(GlobalContext);

   const currentFoods = foundFood.length > 0 ? foundFood : foods;

  return (
    <>
       {currentFoods.map(food => (<Food key={food.id} food={food}/>))}  
    </>
    
  )
}

export default Foods