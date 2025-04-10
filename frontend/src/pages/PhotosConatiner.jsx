import React from 'react'

function PhotosContainer(props) {
  const { about, title } = props;
  return (
  <div>
  <div className="card" style={{ width: "18rem" }}>
        <img src={`http://localhost:3000/images/${title}`} className="card-img-top" alt="..."/>
  <div className="card-body">
          <p className="card-text">{about}</p>
  </div>
</div>
    </div>
  )
}

export default PhotosContainer