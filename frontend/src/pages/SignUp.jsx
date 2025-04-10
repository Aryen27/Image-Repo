import React, { useState } from 'react'

function SignUp() {
  const [user, setUser] = useState({
    name: '',
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
<div className='d-flex flex-column mx-auto my-4 py-4 gap-4 w-75'>
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
      <input className="form-control" id='confirm-pass' type="text" placeholder="Confirm Password" aria-label="default input example"/>
      </div>
  <button className='btn btn-success w-25 mx-auto' onClick={handleSubmit} type='submit'>Submit</button>
</div>
  )
}

export default SignUp