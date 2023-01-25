import { useState, useContext } from 'react'
import { GlobalContext } from './context/GlobalState';

const Register = () => {

  const { saveRegistrant } = useContext(GlobalContext)

  // Input hooks
  const [firstname, setFirstName ] = useState('');
  const [lastname, setLastName ] = useState('');
  const [email, setEmail ] = useState('');
  const [username, setUsername ] = useState('');
  const [password, setPassword ] = useState('');
  const [cpassword, setCPassword ] = useState('');
  const [successMsg, setSuccessMsg ] = useState('');
  const [successMsgBGColor, setSuccessMsgBGColor ] = useState('');

  // Error hooks
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [cpasswordError, setCPasswordError] = useState('');

  // Border color hooks
  const [firstNameBColor, setFirstNameBColor] = useState('');
  const [lastNameBColor, setLastNameBColor] = useState('');
  const [usernameBColor, setUsernameBColor] = useState('');
  const [emailBColor, setEmailBColor] = useState('');
  const [passwordBColor, setPasswordBColor] = useState('');
  const [cpasswordBColor, setCPasswordBColor] = useState('');

  // Register user func
  const registerUser = () => {
    // Validate firstname
    if(firstname.length > 4) {
      setFirstNameError('');
      setFirstNameBColor('green');
    } else {
      setFirstNameError('Firstname must be at least 8 characters');
      setFirstNameBColor('red');
    }

    // Validate lastname
    if(lastname.length > 4) {
      setLastNameError('');
      setLastNameBColor('green');
    } else {
      setLastNameError('Lastname must be at least 8 characters');
      setLastNameBColor('red');
    }

    // Validate username
    if(username.length > 4){
      setUsernameError('');
      setUsernameBColor('green');
    } else {
      setUsernameError('Username must be at least 6 characters');
      setUsernameBColor('red');
    }

    // Validate email
    if(email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)){
      setEmailError('');
      setEmailBColor('green');
    } else {
      setEmailError('Invalid email address');
      setEmailBColor('red');
    }

    // Validate password
    if(password.length > 8){
      setPasswordError('');
      setPasswordBColor('green');
    } else {
      setPasswordError('Password must be at least 8 characters');
      setPasswordBColor('red');
    }

    // Confirm password
    if(cpassword !== '' && cpassword.match(password)){
      setCPasswordError('');
      setCPasswordBColor('green');
    } else {
      setCPasswordError('Passwords do not match');
      setCPasswordBColor('red');
    }
    register();
  }

  // Save registrant func
  const register = () => {
     // Init registrant
    const user = {
      firstname: firstname,
      lastname: lastname,
      username: username,
      email: email,
      password: password,
    }
    if(firstname.length > 4 && lastname.length > 4 && username.length > 4 && email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/) && password.length > 8 && cpassword.match(password)){
      
      // Success message
      setSuccessMsg('Registration successful');
      setSuccessMsgBGColor('green');

      // Clear fields
      setFirstName('');
      setLastName('');
      setUsername('');
      setEmail('');
      setPassword('');
      setCPassword('');
      
      // SetTimeout
      setTimeout(() => {
        setFirstNameBColor('');
        setLastNameBColor('');
        setUsernameBColor('');
        setEmailBColor('');
        setPasswordBColor('');
        setCPasswordBColor('');
        setSuccessMsg('');

      }, 3000);

      saveRegistrant(user);

    } else {
      setSuccessMsg('Invalid information');
      setSuccessMsgBGColor('red');

      setTimeout(() => {
        setSuccessMsg('');
      }, 3000);
    }  
  }

  return (
    <div className="container registerContainer">
      <div className="row justify-content-center mt-4">
        <div className="col-md-5 shadow-lg bg-white rounded">
          <h6 className="text-center">Create Account</h6>

          <div className="mb-1 grid gap-0 row-gap-1">
            <input type="text" className="form-control p-1" placeholder="firstname" value={firstname} onChange={(e) => setFirstName(e.target.value)} style={{ borderColor: firstNameBColor}}/>
            <small className="m-1">{firstNameError}</small>
          </div>

          <div className="mb-1 mt-0">
            <input type="text" className="form-control p-1 mb-1" placeholder="lastname" value={lastname} onChange={(e) => setLastName(e.target.value)} style={{ borderColor: lastNameBColor}}/>
            <small className="m-1">{lastNameError}</small>
          </div>

          <div className="mb-1">
            <input type="text" className="form-control p-1 " placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} style={{ borderColor: usernameBColor}}/>
            <small className="m-1 error">{usernameError}</small>
          </div>

          <div className="mb-1">
            <input type="email" placeholder="email" className="form-control p-1" value={email} onChange={(e) => setEmail(e.target.value)} style={{ borderColor: emailBColor}}/>
            <small className="m-1 error">{emailError}</small>
          </div>

          <div className="mb-1">
            <input type="password" className="form-control p-1 mb-1" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ borderColor: passwordBColor}}/>
            <small className="m-1 error">{passwordError}</small>
          </div>

          <div className="mb-1">
            <input type="password" className="form-control p-1" placeholder="confirm password" value={cpassword} onChange={(e) => setCPassword(e.target.value)} style={{borderColor: cpasswordBColor}}/>
            <small className="m-1 error">{cpasswordError}</small>
          </div>

          <div className="successDiv d-flex justify-content-center align-content-center mb-1 rounded p-0 text-center">
            <span className='text-white w-75 rounded' style={{backgroundColor: successMsgBGColor}}>{successMsg}</span>
          </div>

          <div className="d-grid gap-1 col-4 mx-auto mb-1">
            <button type="button" className="btn btn-primary btn-sm p-0 registerBtn" onClick={registerUser}>Submit</button>
          </div>
          

        </div>
      </div>
    </div>
  )
}

export default Register
