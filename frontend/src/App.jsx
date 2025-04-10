import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AddPhoto from "./pages/AddPhoto";
import Home from "./pages/Home";
import { AuthProvider } from "./context/authContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login /> ,
  },
  {
    path: "home",
    element: <Home />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
  {
    path: "addphoto",
    element: <AddPhoto />,
  },
]);

function App() {
  return (
    <div>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  );
}

export default App;
