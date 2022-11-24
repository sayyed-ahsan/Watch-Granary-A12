import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Header from '../pages/Shared/Header/Header';

const Dashboard = () => {
    return (
        <div>
            <Header></Header>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content ">

                    <Outlet></Outlet>


                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-46 bg-base-100 text-base-content">
                        <li><Link to={'/dashboard'}>My Bookings</Link></li>
                        <li><Link to={'/dashboard/addProduct'}>Add Product</Link></li>
                        <li><Link to={'/dashboard/myProducts'}>My Products</Link></li>
                        {/* <li><Link to={'/dashboard'}>My Buyers</Link></li> */}
                        <li><Link to={'/dashboard/allBuyers'}>All Buyers</Link></li>
                        <li><Link to={'/dashboard/allSellers'}>All Sellers</Link></li>
                        <li><Link to={'/dashboard/report'}>Reported Items</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;