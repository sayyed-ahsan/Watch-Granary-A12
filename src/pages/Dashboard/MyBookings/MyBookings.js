import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../contexts/AuthProvider';
import { Link } from 'react-router-dom';

const MyBookings = () => {

    const { user } = useContext(AuthContext)


    const [myBookings, setMyBookings] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/mybookings?email=${user?.email}`)
            .then(data => {
                console.log(data)
                setMyBookings(data.data)
            })
    }, [user])

    return (
        <div>
            <h1 className='text-center text-2xl my-3'>My Booked Products{myBookings?.length}</h1>

            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>

                            <th>Image</th>
                            <th>Name</th>
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
                                                    <img src={product?.PhotoUrl} alt="Tailwind-CSS-Avatar-component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{product.name}</div>
                                                <div className="text-sm opacity-50">{product.listingDate}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        Zemlak, Daniel and Leannon
                                        <br />
                                        <span className="badge badge-ghost badge-sm">{product.location}</span>
                                    </td>
                                    <td>
                                        <Link to={`/dashboard/payment/${product._id}`}>
                                            <button className="btn btn-sm btn-xs">pay</button>
                                        </Link>
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