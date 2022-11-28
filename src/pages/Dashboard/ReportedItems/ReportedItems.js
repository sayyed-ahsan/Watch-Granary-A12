import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast'
import Loder from '../../Shared/Loder/Loder';


const ReportedItems = () => {


    const { data: reportedProducts = [], isLoading, refetch } = useQuery({
        queryKey: ['reportedProducts'],
        queryFn: async () => {
            const res = await fetch(`https://final-12-server-sayyed-ahsan.vercel.app/reportedProducts`);
            const data = await res.json();
            return data;
        }
    });

    const hendleDelet = (id) => {
        fetch(`https://final-12-server-sayyed-ahsan.vercel.app/reportedProduct/${id}`, {
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


    if (isLoading) {
        return <Loder></Loder>
    }

    return (
        <div>
            <h1 className='text-center text-2xl my-3'>Total Reported Products: {reportedProducts?.length}</h1>

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
                            reportedProducts?.map((product, i) =>
                                <tr key={product._id} className='hover'>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="w-16 rounded">
                                                    <img src={product?.PhotoUrl} alt="Tailwind-CSS-Avatar-component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {product?.name}

                                    </td>

                                    <td>
                                        {product?.resellPrice}
                                    </td>

                                    <td>
                                        <button onClick={() => hendleDelet(product._id)} className="btn btn-warning btn-circle btn-outline">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                        </button>
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

export default ReportedItems;