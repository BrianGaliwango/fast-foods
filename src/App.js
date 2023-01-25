import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import { GlobalProvider } from './components/context/GlobalState';
import Admin from './components/Admin';
import AddFood from './components/AddFood';
import Cart from './components/Cart';

function App() {

  return (
    <GlobalProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/dashboard" element={<Dashboard />} />         
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/admin" element={<Admin />} /> 
        <Route exact path="/AddFood" element={<AddFood />} />   
      </Routes>
    </Router>
    </GlobalProvider>
  );
}

export default App;
