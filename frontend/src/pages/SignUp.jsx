import React from 'react'

function SignUp() {
  return (
<div className='d-flex flex-column mx-auto my-4 py-4 gap-4 w-75'>
    <h3 className='mx-auto'>Sign Up</h3>
  <div className='d-flex flex-column'>
      <label className='label-for'>Username</label>
  <input class="form-control" type="text" placeholder="Name" aria-label="default input example"/>
  </div>
      <div className='d-flex flex-column'>
      <label className='label-for'>Email</label>
      <input class="form-control" type="text" placeholder="abc@gmail.com" aria-label="default input example"/>
      </div>
      <div className='d-flex flex-column'>
      <label className='label-for'>Password</label>
      <input class="form-control" type="text" placeholder="Your Password" aria-label="default input example"/>
      </div>

      <div className='d-flex flex-column'>
      <label className='label-for'>Password</label>
      <input class="form-control" type="text" placeholder="Confirm Password" aria-label="default input example"/>
      </div>
  <button className='btn btn-success w-25 mx-auto'>Submit</button>
</div>
  )
}

export default SignUp