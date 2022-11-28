import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';
import { MdBookmarkAdded } from 'react-icons/md';
import { FcAdvertising } from 'react-icons/fc';
import toast from 'react-hot-toast'

const MyProducts = () => {


    const { user } = useContext(AuthContext);
    const url = `http://localhost:5000/myProducts?email=${user?.email}`;


    const { data: myProducts, isLoading, refetch } = useQuery({
        queryKey: ['myProducts', user?.email],
        queryFn: async () => {
            const res = await fetch(url);
            const data = await res.json();
            return data;
        }
    })


    //-------------------------------------------
    const handleAdvertise = (id) => {
        fetch(`http://localhost:5000/advertise/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Advertised successful.')
                    refetch();
                }
            })
    }
    //-------------------------------------------
    //----------------
    if (isLoading) {
        <div>loding...</div>
    }
    //----------------
    // console.log(myProducts);


    return (
        <div>
            <h1 className='text-center text-2xl my-3'>My listed Products{myProducts?.length}</h1>

            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>

                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th>Advertise</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <!-- row 1 --> */}



                        {
                            myProducts?.map((product, i) =>
                                <tr key={product._id}>

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
                                        {
                                            product.advertise ?
                                                <>
                                                    <div className='flex'>
                                                        <h1 className='text-success font-bold'>Advertised </h1>
                                                        <h1 className='text-blue-300 w-5 text-center'><MdBookmarkAdded className='text-blue text-[24px]'></MdBookmarkAdded> </h1>
                                                    </div>
                                                </>
                                                :
                                                <>
                                                    <div className='flex'>
                                                        <h1><button onClick={() => handleAdvertise(product._id)} className="btn btn-outline btn-info">Advertise<FcAdvertising className='text-green ml-3 text-[24px]'></FcAdvertising>
                                                        </button> </h1>

                                                    </div>
                                                </>
                                        }
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

export default MyProducts;