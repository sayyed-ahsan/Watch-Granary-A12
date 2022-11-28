import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import Header from '../pages/Shared/Header/Header';






const Dashboard = () => {

    const { user } = useContext(AuthContext)



    const { data: currectUser, isLoading, refetch } = useQuery({
        queryKey: ['currectUser'],
        queryFn: async () => {
            const res = await fetch(`https://final-12-server-sayyed-ahsan.vercel.app/currectUser?email=${user?.email}`);
            const data = await res.json();
            return data;
        }
    })
    console.log(currectUser)






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
                    <ul className="menu p-2 w-46 bg-base-100 text-base-content">

                        {
                            currectUser?.status === "buyer" &&
                            <li><Link to={'/dashboard/mybooking'}>My Orders</Link></li>
                        }
                        {
                            currectUser?.status === "seller" &&
                            <>
                                <li><Link to={'/dashboard/addProduct'}>Add Product</Link></li>
                                <li><Link to={'/dashboard/myProducts'}>My Products</Link></li>
                            </>
                        }
                        {
                            currectUser?.status === "admin" &&
                            <>
                                <li><Link to={'/dashboard/allSellers'}>All Sellers</Link></li>
                                <li><Link to={'/dashboard/allBuyers'}>All Buyers</Link></li>
                                <li><Link to={'/dashboard/report'}>Reported Items</Link></li>
                            </>
                        }







                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;