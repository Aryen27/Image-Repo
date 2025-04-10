import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/authContext';

function SignUp() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPass:'',
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user.confirmPass != user.password) {
      alert('Password don\'t match!');
    }

    axios.post('http://localhost:3000/signup', {
      name: user.name,
      email: user.email,
      password: user.password
    }).then(function (res) {
      alert(res.data.message);
    }) .catch(function (error) {
      console.log(error);
    });
  }
  return (
<div className='d-flex flex-column mx-auto my-4 py-4 gap-4 w-50'>
    <h3 className='mx-auto'>Sign Up</h3>
  <div className='d-flex flex-column'>
      <label className='label-for'>Username</label>
  <input className="form-control" id='name' type="text" placeholder="Name" aria-label="default input example" onChange={handleChange}/>
  </div>
      <div className='d-flex flex-column'>
      <label className='label-for'>Email</label>
      <input className="form-control" id='email' type="text" placeholder="abc@gmail.com" aria-label="default input example" onChange={handleChange}/>
      </div>
      <div className='d-flex flex-column'>
      <label className='label-for'>Password</label>
      <input className="form-control" id='password' type="text" placeholder="Your Password" aria-label="default input example" onChange={handleChange}/>
      </div>

      <div className='d-flex flex-column'>
      <label className='label-for'>Confirm Password</label>
      <input className="form-control" id='confirmPass' type="text" placeholder="Confirm Password" aria-label="default input example" onChange={handleChange}/>
      </div>
  <button className='btn btn-success w-25 mx-auto' onClick={handleSubmit} type='submit'>Submit</button>
</div>
  )
}

export default SignUp