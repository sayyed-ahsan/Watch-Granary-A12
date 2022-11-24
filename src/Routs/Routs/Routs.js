import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../../layout/Dashboard";
import Main from "../../layout/Main";
import Blog from "../../pages/Blog/Blog";
import AddProduct from "../../pages/Dashboard/AddProduct/AddProduct";
import MyBookings from "../../pages/Dashboard/MyBookings/MyBookings";
import Home from "../../pages/Home/Home/Home";
import Login from "../../pages/Login/Login/Login";
import Signup from "../../pages/Login/Signup/Signup";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/blog',
                element: <Blog></Blog>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <Signup></Signup>
            },
        ]
    },
    {
        path: '/dashboard',
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: '/dashboard',
                element: <MyBookings></MyBookings>
            },
            {
                path: '/dashboard/addProduct',
                element: <AddProduct></AddProduct>
            }
        ]
    }
])

export default router;