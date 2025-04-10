import React, { useEffect, useState } from 'react'
import PhotosContainer from './PhotosConatiner'
import axios from 'axios'
import { useAuth } from '../context/authContext'

axios.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`;

function Home() {
  // imgrepo: about, title
  const { user } = useAuth();
  const [images, setImages] = useState();

  const baseUrl = 'http://localhost:3000/';
  
  useEffect(() => {
    if (user) {
      console.log(`${baseUrl}photos/${user.uid}`);
      axios.get(`${baseUrl}photos/${user.uid}`)
        .then((res) => {
          setImages(res.data);
        })
        .catch(err => {
          console.error("Error fetching images:", err);
        });
    }
  }, [user]);

  console.log(images);

  return (
    <div className="container text-center p-3">
    <div className="row">
    {images?.map((img) => (
        <div className="col-md-3 mb-4" key={img.id}>
          <PhotosContainer about={img.about} title={img.title} />
        </div>
      ))
      }
    </div>
    </div>
  )
}

export default Home