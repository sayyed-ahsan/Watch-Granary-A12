import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../contexts/AuthProvider';

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
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <!-- row 1 --> */}



                        {
                            myBookings?.map((product, i) =>
                                <tr>
                                    <th>
                                        <label>
                                            <input type="checkbox" className="checkbox" />
                                        </label>
                                    </th>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="w-16 rounded">
                                                    <img src={product?.PhotoUrl} alt="Tailwind-CSS-Avatar-component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">Hart Hagerty</div>
                                                <div className="text-sm opacity-50">United States</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        Zemlak, Daniel and Leannon
                                        <br />
                                        <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
                                    </td>
                                    <td>Purple</td>
                                    <th>
                                        <button className="btn btn-ghost btn-xs">details</button>
                                    </th>
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