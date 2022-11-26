import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const Categories = () => {
    const { user } = useContext(AuthContext);



    // const products = useLoaderData();

    const params = useParams();

    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/categories/${params.cullection}`);
            const data = await res.json();
            return data;
        }
    });



    const handlebooking = (id, user) => {
        const buyerEmail = user?.email;
        console.log(buyerEmail);
        fetch(`http://localhost:5000/categories/${id}?email=${buyerEmail}`, {
            method: 'PUT',
            // headers: {
            //     authorization: `bearer ${localStorage.getItem('accessToken')}`
            // }
            body: JSON.stringify({ buyerEmail }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    // toast.success('Make admin successful.')
                    console.log('ssssssssss')
                    refetch();
                }
            })
    }

    //-------------------------------------------
    const handleReport = (id) => {
        fetch(`http://localhost:5000/categories/report/${id}`, {
            method: 'PUT',
            // headers: {
            //     authorization: `bearer ${localStorage.getItem('accessToken')}`
            // }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    // toast.success('Make admin successful.')
                    console.log('ssssssssss')
                    refetch();
                }
            })
    }
    console.log(products)

    //----------------
    if (isLoading) {
        <div>loding...</div>
    }
    //----------------


    return (
        <div>

            <h2 className='text-center text-2xl my-10'>This is the cullection of all <br />{products[0]?.category} Watches</h2>


            <div className='grid gap-6 justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    products?.map(product => <>
                        {
                            product?.stoke == "available" && <div className="card w-80 bg-base-100 shadow-xl hover:shadow-2xl">
                                <figure><img src={product?.PhotoUrl} alt="Shoes" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">
                                        {product?.name}

                                    </h2>
                                    <h2 className="card-title">
                                        Condition
                                        <div className="badge badge-secondary"> {product?.condition}</div>
                                    </h2>
                                    <p>{product?.porductDescription}</p>
                                    <div className="card-actions justify-between">

                                        <div className="badge badge-outline">Orginal Price: {product?.orginalPrice}</div>
                                    </div>

                                    <p>Posting Date: {product?.listingDate}</p>
                                    <p>Location: {product?.location}</p>
                                    <p>Resell Price: {product?.resellPrice}</p>
                                    <p>Orginal Price: {product?.orginalPrice}</p>
                                    <p>Category: {product?.category}</p>
                                    <p>Use of Year: {product?.yearOfUse}</p>

                                    <div className="">
                                        <button onClick={() => handleReport(product._id)} className="btn btn-xs btn-error">Report</button>
                                    </div>

                                    <div className="card-actions ">
                                        <button onClick={() => handlebooking(product._id, user)} className="btn btn-outline  w-full btn-success">Book</button>
                                    </div>

                                </div>
                            </div>
                        }
                    </>

                    )
                }
            </div>
        </div>
    );
};

export default Categories;