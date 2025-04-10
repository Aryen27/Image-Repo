import React, { useState } from 'react'
import { useAuth } from '../context/authContext';

function Login() {
  // const { login } = useAuth(); 
    const [user, setUser] = useState({
      email: '',
      password: '',
    });
  
    const handleChange = (e) => {
      setUser({ ...user, [e.target.id]: e.target.value });
    }
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(user);
    }
  return (
    <div className='d-flex flex-column mx-auto my-4 py-4 gap-4 w-50'>
        <h3 className='mx-auto'>Login</h3>
      <div className='d-flex flex-column'>
      <label className='label-for'>Email</label>
      <input className="form-control" id='email' type="text" placeholder="abc@gmail.com" aria-label="default input example" onChange={handleChange}/>
      </div>
      <div className='d-flex flex-column'>
      <label className='label-for'>Password</label>
      <input className="form-control" id='password' type="text" placeholder="Your Password" aria-label="default input example" onChange={handleChange}/>
      </div>
      <button className='btn btn-success w-25 mx-auto' onClick={handleSubmit} type='submit'>Submit</button>
    </div>
  )
}

export default Login