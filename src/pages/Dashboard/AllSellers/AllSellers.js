import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import { IoCheckmarkDoneCircleOutline } from 'react-icons/io5';


const AllSellers = () => {


    const { data: sellers, isLoading, refetch } = useQuery({
        queryKey: ['sellers'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/sellers`);
            const data = await res.json();
            return data;
        }
    })

    // console.log(sellers)

    const hendleDelet = (id) => {
        console.log(id)
        fetch(`http://localhost:5000/users/${id}`, {
            method: 'DELETE',
            // headers: {
            //     authorization: `bearer ${localStorage.getItem('accessToken')}`
            // }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    console.log(data)
                    toast.error(' Dilete successful.')
                    refetch();
                }
            })
    }


    //-------------------------------------------
    const handleVerifySeller = (id, email) => {
        fetch(`http://localhost:5000/verifySeller/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Verified successful.')
                    refetch();
                    handleVerifyProduct(email)
                }
            })
    }
    //-------------------------------------------
    //-------------------------------------------
    const handleVerifyProduct = (email) => {
        fetch(`http://localhost:5000/verifyProduct?email=${email}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Verified successful.')
                    refetch();
                }
            })
    }
    //-------------------------------------------

    //----------------
    if (isLoading) {
        <div>loding...</div>
    }



    return (
        <div>
            <h1 className='text-center text-2xl my-3'>All Sellers of Watch Granary</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th>number</th>
                            <th>Image</th>
                            <th>Email</th>
                            <th>Veryfication</th>
                            <th>Delet</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <!-- row 1 --> */}

                        {
                            sellers?.map((seller, i) =>
                                <tr className="hover" key={seller._id}>
                                    <th>{i + 1}</th>
                                    <th>
                                        <div className="avatar">
                                            <div className="w-9 rounded-full">
                                                <img src="https://placeimg.com/192/192/people" />
                                            </div>
                                        </div>
                                    </th>

                                    <th>{seller.email}</th>

                                    <th>
                                        {
                                            seller.verify ?
                                                <>
                                                    <div className='flex'>
                                                        <h1 className='text-success font-bold'>Verified </h1>
                                                        <h1 className='text-blue-300 w-5 text-center'><IoCheckmarkDoneCircleOutline className='text-blue text-[24px]'></IoCheckmarkDoneCircleOutline> </h1>
                                                    </div>
                                                </>
                                                :
                                                <><button onClick={() => handleVerifySeller(seller._id, seller.email)} className="btn btn-outline btn-warning">Verify This Seller</button></>
                                        }

                                    </th>

                                    <td>
                                        <button onClick={() => hendleDelet(seller._id)} className="btn btn-circle btn-error btn-outline">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                        </button>
                                    </td>
                                </tr>
                            )
                        }


                        {/* <!-- row 2 --> */}

                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default AllSellers;