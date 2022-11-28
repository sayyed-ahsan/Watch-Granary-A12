import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../contexts/AuthProvider';
import { Link } from 'react-router-dom';
import Loder from '../../Shared/Loder/Loder';

const MyBookings = () => {



    const { user } = useContext(AuthContext)


    const [myBookings, setMyBookings] = useState([]);


    useEffect(() => {
        axios.get(`https://final-12-server-sayyed-ahsan.vercel.app/mybookings?email=${user?.email}`, {
            headers: {
                authuraization: `bearer ${localStorage.getItem('accesstoken')}`
            }
        })
            .then(data => {
                console.log(data)
                setMyBookings(data.data)
            })
    }, [user])


    // if (myBookings.length == 0) {
    //     return <Loder></Loder>
    // }



    return (
        <div>
            <h1 className='text-center text-2xl my-3'>My Booked Products{myBookings?.length}</h1>

            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>

                            <th>Image</th>
                            <th>Titel</th>
                            <th>Price</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <!-- row 1 --> */}



                        {
                            myBookings?.map((product, i) =>
                                <tr key={product._id} className='hover'>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="w-16 rounded">
                                                    <img src={product?.photo} alt="Tailwind-CSS-Avatar-component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {product?.name}

                                    </td>

                                    <td>
                                        {product?.price}
                                    </td>

                                    <td>
                                        {
                                            !product.paid &&
                                            <Link to={`/dashboard/payment/${product?._id}`}>
                                                <button className="btn btn-outline btn-success btn-sm btn-xs">pay</button>
                                            </Link>
                                        }
                                        {
                                            product.paid && <span className='text-green-500'>Paid</span>
                                        }
                                    </td>
                                </tr>
                            )
                        }


                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default MyBookings;