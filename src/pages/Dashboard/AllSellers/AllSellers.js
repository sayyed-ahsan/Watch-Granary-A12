import { useQuery } from '@tanstack/react-query';
import React from 'react';

const AllSellers = () => {


    const { data: sellers, isLoading } = useQuery({
        queryKey: ['sellers'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/sellers`);
            const data = await res.json();
            return data;
        }
    })

    console.log(sellers)

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
                                    <td>
                                        <button className="btn btn-circle btn-outline">
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