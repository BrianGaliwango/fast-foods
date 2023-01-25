import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from './context/GlobalState';
import { avatar } from './context/assets/images/Images';

const Navbar = () => {

  const {currentUser}  = useContext(GlobalContext);

  const [isMenu, setIsMenu] = useState(false);

  if(isMenu){
    setTimeout(() => {
      setIsMenu(false);
    }, 5000)
  }

  return (
    <>
    <nav className="navbar fixed-top navbar-expand-md bg-success p-0">
      <div className="container text-white">
        <h4 className="fs-6 align-middle" id="title">Fast Foods</h4>

        <div className="collapse navbar-collapse navItemsContainer" id="nav-menu">
          <ul className="navbar-nav ms-auto">
          {currentUser.username && 
          <li className="nav-item">
              <Link to="/Dashboard" className="nav-link">Menu</Link>
          </li>}
          
           {currentUser.admin === true && 
           <li className="nav-item">
              <Link to="/Admin" className="nav-link" >Admin</Link>
            </li>}

            {!currentUser.username ? <li className="nav-item">
              <Link to="/" className="nav-link">Login</Link>
            </li> : <>
            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={() => currentUser('')}>Logout</Link>
            </li>

            <li className="nav-item">
            <div className='flex-column text-center mt-1 nav-item avatarDiv'>
              <img src={avatar} alt="" className='avatar' />
              <span className='userTag text-dark'>{currentUser.username}</span>
            </div>
            </li>
            </>
            }

            {!currentUser.username && <li className="nav-item">
              <Link to="/Register" className="nav-link">Register</Link>
            </li>}
           </ul>
        </div>

        <button className="navbar-toggler fs-6 p-1 pt-0 pb-0 " type="button" onClick={() => setIsMenu(!isMenu)}>
        <span className="navbar-toggler-icon "></span>
        </button>
          
      </div>
      {isMenu && 
      <div className ="navTogglerContainer bg-success" id="navToggle">
        <ul className="navbar-nav flex-column">
          {currentUser.username && <li className="nav-item">
            <Link to="/Dashboard" className="dropdown-item" onClick={() => setIsMenu(!isMenu)}>Menu</Link>
          </li>}
        
          {currentUser.admin === true && <li className="nav-item">
            <Link to="/Admin" className="dropdown-item" onClick={() => setIsMenu(!isMenu)}>Admin</Link>
          </li>}

          {!currentUser.username ? 
          <li className="nav-item">
            <Link to="/" className="dropdown-item" onClick={() => setIsMenu(!isMenu)}>Login</Link>
          </li> : <>

          <li className="nav-item">
            <Link to="/" className="dropdown-item" onClick={() => currentUser('')}>Logout</Link>
          </li>

          <li className="nav-item">
            <div className='flex-column text-center avatarDiv'>
              <img src={avatar} alt="" className='dropdownAvatar mb-1' />
              <span className='dropDownUserTag text-dark'>{currentUser.username}</span>
            </div>
          </li>
          </>
          }

          {!currentUser.username && <li className="nav-item">
            <Link to="/Register" className="dropdown-item" onClick={() => setIsMenu(!isMenu)}>Register</Link>
          </li>}
        </ul>
     </div>}
    </nav>
   
    </>
  )
}

export default Navbar




