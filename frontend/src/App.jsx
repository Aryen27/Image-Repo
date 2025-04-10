import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AddPhoto from './pages/AddPhoto';
import PhotosList from './pages/PhotosList';
import Home from './pages/Home';

const router = createBrowserRouter([  
  {
    path: '/',
    element: <Home/>,
    children: [
      {
        path: "login",
        element:<Login/>
        },
        {
          path: "signup",
          element: <SignUp/>
        },
        {
          path: 'photo/add',
          element: <AddPhoto/>
          
      },
      {
        path: 'photo',
        element: <PhotosList/>
        },
    ],
  },
]);

function App() {

  return (
    <div>
    <RouterProvider router={router}/>
    </div>
  )
}

export default App
