import React, {createContext, useReducer} from'react';
import 
{ AnimalStyleBurger, BaconCheeseBurger, Biscuits, BlackForestCake, ChapatiRolex, ChickenFingers, ChickenNuggets, ChickenPopeyes, ChickenSandwich, ChickenTenders, CurlyFries , doubleInAndOutBurger,  EggMuffins, Fries, GlazedDoughnuts, HamburgerAndFrenchFries, MashedPotatoesAndCajunGravy, RoastBeefBurger, Samosas, WafflesFries, Tries} from './assets/images/Images';
import AppReducer from './AppReducer';

// InitialState
const initialState = {
  
  users: [
    {firstname: 'Gaza', lastname: 'Mufasa', username: 'galice', email: 'byran@gmail.com', password: 'secret123', admin: true,}
  ],

  currentUser: {},

  foods: [
    {id: 1, name: 'Animal style burger', price: '6.0', img: <img src={AnimalStyleBurger} alt="food"/> },
    {id: 2, name: 'Bacon cheese burger', price: '4.0', img: <img src={BaconCheeseBurger} alt="food"/> },
    {id: 3, name: 'Biscuits', price: '3.0', img: <img src={Biscuits} alt="food"/> },
    {id: 4, name: 'Black forest cake', price: '5.0', img: <img src={BlackForestCake} alt="food"/> },
    {id: 5, name: 'Chapati Rolex', price: '5.0', img: <img src={ChapatiRolex} alt="food"/> },
    {id: 6, name: 'Chicken fingers', price: '7.0', img: <img src={ChickenFingers} alt="Chicken fingers"/> },
    {id: 7, name: 'Chicken nuggets', price: '9.0', img: <img src={ChickenNuggets} alt="Chicken Nuggets"/> },
    {id: 8, name: 'Chicken popeyes', price: '11', img: <img src={ChickenPopeyes} alt="Chicken popeyes"/> },
    {id: 9, name: 'Chicken sandwich', price: '8', img: <img src={ChickenSandwich} alt="Chicken Sandwich"/> },
    {id: 10, name: 'Chicken tenders', price: '10', img: <img src={ChickenTenders} alt="Chicken Tenders"/> },
    {id: 11, name: 'Curly fries', price: '7', img: <img src={CurlyFries} alt="Curly Fries"/> },
    {id: 12, name: 'double in and out Burger', price: '15', img: <img src={doubleInAndOutBurger} alt="double In And Out Burger"/> },
    {id: 13, name: 'Egg muffins', price: '4', img: <img src={EggMuffins} alt="Egg Muffins"/> },
    {id: 14, name: 'Fries', price: '3', img: <img src={Fries} alt=" Fries"/> },
    {id: 15, name: 'Glazed doughnuts', price: '2', img: <img src={GlazedDoughnuts} alt=" Glazed Doughnuts"/> },
    {id: 16, name: 'Hamburger and french fries', price: '13', img: <img src={HamburgerAndFrenchFries} alt=" HamburgerAndFrenchFries"/> },
    {id: 17, name: 'Mashed potatoes and cajun gravy', price: '10', img: <img src={MashedPotatoesAndCajunGravy} alt=" MashedPotatoesAndCajunGravy"/> },
    {id: 18, name: 'Roast beef burger', price: '11', img: <img src={RoastBeefBurger} alt="RoastBeefBurger"/> },
    {id: 19, name: 'Samosas 1 pair', price: '2', img: <img src={Samosas} alt="Samosas"/> },
    {id: 20, name: 'Waffles fries', price: '5', img: <img src={WafflesFries} alt="WafflesFries"/> },
    {id: 21, name: 'Tries', price: '15', img: <img src={Tries} alt="Tries"/> },
    
  ],
  cart : [],
  foundFood: [],
}

// Create context 
export const GlobalContext = createContext(initialState);

// Provider
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions 
  // Add to cart func
  function addToCart(food) {
    dispatch({
      type: 'ADD_TO_CART',
      payload: food,
    })
  }

  // Delete from cart func
  function deleteFromCart(id) {
    dispatch({
      type: 'DELETE_FROM_CART',
      payload: id,
    })
  }

  // Add quantity 
  function addQuantity(food) {
    dispatch({
      type: 'ADD_QUANTITY',
      payload: food,
    })
    }

  //Decrease quantity func
  function decreaseQuantity(food) {
    dispatch({
      type: 'DECREASE_QUANTITY',
      payload: food,
    })
  }

  // Accept order func 
  function acceptFoodOrder(id) {
    dispatch({
      type: 'ACCEPT_ORDER',
      payload: id,
    })
  }

  // Reject order func 
  function rejectFoodOrder(food) {
    dispatch({
      type: 'REJECT_ORDER',
      payload: food,
    })
  }

  // Edit Food func 
  function saveEditedFood(food) {
    dispatch({
      type: 'EDIT_FOOD',
      payload: food,
    })
  }

  // Edit image func 
  function saveEditedFoodImage(food) {
    dispatch({
      type: 'EDIT_FOOD_IMAGE',
      payload: food,
    })
  }

  // Add food func
  function addFood(food) {
    dispatch({
      type: 'ADD_FOOD',
      payload: food,
    });
  }

   // Delete food func
   function deleteFood(id) {
    dispatch({
      type: 'DELETE_FOOD',
      payload: id,
    })
  }

  // Register user func
  function saveRegistrant(registrant) {
    dispatch({
      type: 'REGISTER_USER',
      payload: registrant,
    })
  }

  // Login user func
  function loginUser(username) {
    dispatch({
      type: 'LOGIN_USER',
      payload: username,
    })
  }

  // Search foods
  function searchFood(searchText) {
    dispatch({
      type: 'SEARCH_FOOD',
      payload: searchText,
    })
  }

  return (
      <GlobalContext.Provider value={{
        foods: state.foods,
        cart: state.cart,
        editFoods: state.editFood,
        users: state.users,
        currentUser: state.currentUser,
        foundFood: state.foundFood,
        addToCart,
        deleteFromCart,
        addQuantity,
        decreaseQuantity,
        addFood,
        deleteFood,
        saveEditedFood,
        saveEditedFoodImage,
        acceptFoodOrder,
        rejectFoodOrder,
        saveRegistrant,
        loginUser,
        searchFood
      }}>
        {children}
      </GlobalContext.Provider>
  )
}