export default function AppReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      const tempState = state.cart.filter((food) => action.payload.id === food.id);
      if(tempState.length > 0) {
        return state;
      } else {
        return {
          ...state,
          cart: [...state.cart, {...action.payload, qty: 1, accepted: false, rejected: false, delivered: false}]
        }
      }
      
      case 'DELETE_FROM_CART':
        return {         
          ...state,
          cart: state.cart.filter(food => food.id !== action.payload)
        }

      case 'ADD_QUANTITY':
        return{
          ...state,
          cart: state.cart.map((food) => food.id === action.payload.id ? {...food, qty: food.qty + 1} : food),
        }

      case 'DECREASE_QUANTITY':
        return {
          ...state,
          cart: state.cart.map((food) => food.id === action.payload.id ? {...food, qty: food.qty - 1} : food),
        }  

      case 'EDIT_FOOD':
        return {
          ...state,
          foods: state.foods.map((food) => food.id === action.payload.id ? {...food, name: action.payload.name, price: action.payload.price} : food),
        }

      case 'EDIT_FOOD_IMAGE':
        return {
          ...state,
          foods: state.foods.map((food) => food.id === action.payload.id ? {...food, img: action.payload.img} : food),
        }
  
      case 'DELETE_FOOD':
        return {         
          ...state,
          foods : state.foods.filter(food => food.id !== action.payload)
        }

      case 'ADD_FOOD':
        return {
          ...state,
          foods : [...state.foods, action.payload]
        }

        case 'ACCEPT_ORDER':
          return {
            ...state,
            cart: state.cart.map((food) => food.id === action.payload.id ? {...food, accepted: action.payload.accepted, rejected: action.payload.rejected} : food),
          }  

        case 'REJECT_ORDER':
          return {
            ...state,
            cart: state.cart.map((food) => food.id === action.payload.id ? {...food, accepted: action.payload.accepted, rejected: action.payload.rejected } : food),
          }  

        case 'REGISTER_USER' :
          const tempState5 = state.users.filter((registrant) => action.payload.username === registrant.username);
          if(tempState5.length > 0) {
          return state;
          } else {
          return {
            ...state,
            users: [...state.users, {...action.payload, admin: true}]
          }
      }

      case 'LOGIN_USER':
        return {
          ...state,
          currentUser : action.payload
        }

      case 'SEARCH_FOOD':          
        return {
          ...state,
          foundFood: state.foods.filter((food) => {
            return (
              food.name.toLowerCase().search(action.payload.toLowerCase()) !== -1
              )
          })
        }

        case 'DELIVER_ORDER':
          return {
            ...state,
            cart: state.cart.map((food) => food.id === action.payload.id ? {...food, delivered: action.payload.delivered,} : food),
          }    
         
    default:
      return state;
  }
}