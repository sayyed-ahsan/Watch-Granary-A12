import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';


const AllBuyers = () => {


    const { data: buyers, isLoading, refetch } = useQuery({
        queryKey: ['bayers'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/buyers`);
            const data = await res.json();
            return data;
        }
    })

    // console.log(buyers)


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



    //----------------
    if (isLoading) {
        <div>loding...</div>
    }
    //----------------

    return (
        <div>
            <h1 className='text-center text-2xl my-3'>All Buyers of Watch Granary</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th>number</th>
                            <th>Image</th>
                            <th>Email</th>
                            <th>Delet</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <!-- row 1 --> */}

                        {
                            buyers?.map((buyer, i) =>
                                <tr className="hover" key={buyer._id}>
                                    <th>{i + 1}</th>
                                    <th>
                                        <div className="avatar">
                                            <div className="w-9 rounded-full">
                                                <img src="https://placeimg.com/192/192/people" />
                                            </div>
                                        </div>
                                    </th>
                                    <th>{buyer.email}</th>
                                    <td>
                                        <button onClick={() => hendleDelet(buyer._id)} className="btn btn-error btn-circle btn-outline">
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

export default AllBuyers;