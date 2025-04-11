import React from 'react'

function AddPhoto() {
  return (
    <div className='d-flex justify-content-center align-items-center my-5 py-5'>
      <form method='POST' className='d-flex flex-column justify-content-center align-items-center gap-4'>
        <div className='d-flex flex-column align-it'>
        <label>Description</label>
        <input type='text'id='about' className='form-control'/>
        </div>
        
        <div className='d-flex flex-column justify-content-center'>
        <label>Upload Image</label>
        <input type='file' id='pic' required className='form-control'/>
        </div>
        <button className='btn btn-success'>Submit</button>
      </form>
    </div>
  )
}

export default AddPhoto