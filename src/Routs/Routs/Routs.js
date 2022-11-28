import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../../layout/Dashboard";
import Main from "../../layout/Main";
import Blog from "../../pages/Blog/Blog";
import Categories from "../../pages/Categories/Categories";
import AddProduct from "../../pages/Dashboard/AddProduct/AddProduct";
import AllBuyers from "../../pages/Dashboard/AllBuyers/AllBuyers";
import AllSellers from "../../pages/Dashboard/AllSellers/AllSellers";
import CommonDashboard from "../../pages/Dashboard/CommonDashboard/CommonDashboard";
import MyBookings from "../../pages/Dashboard/MyBookings/MyBookings";
import Payment from "../../pages/Dashboard/MyBookings/Payment/Payment";
import MyProducts from "../../pages/Dashboard/MyProducts/MyProducts";
import ReportedItems from "../../pages/Dashboard/ReportedItems/ReportedItems";
import Home from "../../pages/Home/Home/Home";
import Login from "../../pages/Login/Login/Login";
import Signup from "../../pages/Login/Signup/Signup";
import Bonus from "../../pages/Shared/Bonus/Bonus";
import DisplayErro from "../../pages/Shared/DisplayError/DisplayErro";
import AdminRoute from "../AdminRout/AdminRout";
import BuyerRout from "../BuyerRout/BuyerRout";
import PrivetRout from "../PrivetRout/PrivetRout";
import SellerRout from "../SellerRout/SellerRout";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <DisplayErro></DisplayErro>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/categories/:cullection',
                element: <PrivetRout><Categories></Categories></PrivetRout>
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
            {
                path: '*',
                element: <Bonus></Bonus>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <Dashboard></Dashboard>,
        errorElement: <DisplayErro></DisplayErro>,
        children: [
            {
                path: '/dashboard',
                element: <CommonDashboard></CommonDashboard>
            },
            {
                path: '/dashboard/mybooking',
                element: <BuyerRout><MyBookings></MyBookings></BuyerRout>
            },
            {
                path: '/dashboard/payment/:productId',
                element: <Payment></Payment>,
                loader: ({ params }) => fetch(`http://localhost:5000/payment/${params.productId}`)
            },
            {
                path: '/dashboard/addProduct',
                element: <SellerRout><AddProduct></AddProduct></SellerRout>
            },
            {
                path: '/dashboard/myProducts',
                element: <SellerRout><MyProducts></MyProducts></SellerRout>
            },
            {
                path: '/dashboard/allSellers',
                element: <AdminRoute><AllSellers></AllSellers></AdminRoute>
            },
            {
                path: '/dashboard/allBuyers',
                element: <AdminRoute><AllBuyers></AllBuyers></AdminRoute>
            },
            {
                path: '/dashboard/report',
                element: <AdminRoute><ReportedItems></ReportedItems></AdminRoute>
            }
        ]
    }
])

export default router;