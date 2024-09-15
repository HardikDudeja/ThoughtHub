import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Signup from './pages/Signup';
import Signin from './pages/Signin';

const router = createBrowserRouter([
  {
    path: "*",
    element: <Navigate to="/signin" />
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/signin",
    element: <Signin />,
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router = { router }></RouterProvider>
  </StrictMode>,
)
