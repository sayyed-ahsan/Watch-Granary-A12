import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { IoCheckmarkDoneCircleOutline } from 'react-icons/io5';

const Advertisement = () => {




    const { data: advertisedProducts, isLoading, refetch } = useQuery({
        queryKey: ['advertisedProduct'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/advertisedProduct`);
            const data = await res.json();
            return data;
        }
    })



    return (
        <div>
            {advertisedProducts?.length > 0 &&

                < div className='my-8'>
                    <h1 className='text-center text-3xl my-3'>Advertisement Section {advertisedProducts.length}</h1>
                    <div className='px-10'>
                        <div className="carousel carousel-center p-4 space-x-4 bg-neutral rounded-box">

                            {
                                advertisedProducts?.map(product =>

                                    <div key={product._id}>

                                        <div className="carousel-item card card-compact w-80 bg-base-100 shadow-xl">
                                            <figure><img src={product.PhotoUrl} alt="Shoes" /></figure>
                                            <div className="card-body">
                                                <h2 className="card-title">{product.name}</h2>
                                                <h2 className="card-title">
                                                    Condition
                                                    <div className="badge badge-secondary"> {product?.condition}</div>
                                                </h2>
                                                <p>{product?.porductDescription}</p>
                                                {
                                                    product.verify ?
                                                        <>
                                                            <div className='flex'>
                                                                <h1 className='text-success font-bold'>Verified </h1>
                                                                <h1 className='text-blue-300 w-5 text-center'><IoCheckmarkDoneCircleOutline className='text-blue text-[24px]'></IoCheckmarkDoneCircleOutline> </h1>
                                                            </div>
                                                        </>
                                                        :
                                                        <><h1 className='text-success'>Not Verified</h1></>
                                                }
                                                <div className="card-actions justify-between">
                                                    <h2 className="card-title">Price: ${product?.resellPrice}</h2>
                                                    <div><button className="btn btn-sm btn-primary">Buy Now</button></div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>


                                )
                            }

                        </div>
                    </div>
                </div>
            }
        </div >
    );
};

export default Advertisement;