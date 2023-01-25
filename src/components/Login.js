import { useState, useContext, } from 'react';
import { GlobalContext } from './context/GlobalState';

const Login = () => {

  const { loginUser, users } = useContext(GlobalContext);

  // Input hooks
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Error hooks
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginBColorError, setLoginBColorError] = useState('');

  // Border color hooks
  const [usernameBColor, setUsernameBColor] = useState('');
  const [passwordBColor, setPasswordBColor] = useState('');
 
  // validate form
  function validateLogin(){

    // Validate username
    if(username.length > 4){
      setUsernameError('');
      setUsernameBColor('green');
    } else {
      setUsernameError('Fill in username field');
      setUsernameBColor('red');
    }

    // Validate password
    if(password.length > 4){
      setPasswordError('');
      setPasswordBColor('green');
    } else {
      setPasswordError('Fill in password field');
      setPasswordBColor('red');
    }

    login()
  }

  // Login func 
  const login = () => {

    if(username.length > 4 && password.length > 4){      

     users.filter((user) => (user.username === username ? (loginUser(user),
     setLoginError('logged in successfully'),
     setLoginBColorError('green'),
     
     setTimeout(() => {
        setLoginError('');
        setPassword('');
        setUsername('');
        setUsernameBColor('');
        setUsernameBColor('');
        // window.location.href = '/dashboard';
     }, 2000))

     : 
     (setLoginError('Invalid username'),
      setLoginBColorError('red'),
      setTimeout(() => {
        setLoginError('');
      }, 2000) 
      )));
    } 
  }

  return (
    <div className="container loginContainer">
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 shadow-lg bg-white rounded">
          <h6 className="text-center">Login</h6>

          <div className="errorDiv w-100 d-flex justify-content-center text-center mb-1 text-white">
            <span className='text-center w-75 rounded' style={{backgroundColor: loginBColorError}}>{loginError}</span>
          </div>
      
          <div className="mb-1">
            <input type="text" className="form-control p-1 " placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} style={{ borderColor: usernameBColor}}/>
            <small className="m-1">{usernameError}</small>
          </div>
         
          <div className="mb-1">
            <input type="password" className="form-control p-1 mb-1" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ borderColor: passwordBColor}}/>
            <small className="m-1">{passwordError}</small>
          </div>

          <div className="d-grid gap-1 col-4 mx-auto mb-1">
            <button type="button" className="btn btn-primary p-0 btn-sm loginBtn" onClick={validateLogin}>Submit</button>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Login
