import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import toast from 'react-hot-toast';
import { IoCheckmarkDoneCircleOutline } from 'react-icons/io5';

import { useForm } from "react-hook-form";
import Loder from '../Shared/Loder/Loder';
import useCurrectUser from '../../hooks/useCurrentUser';


const Categories = () => {
    const { user } = useContext(AuthContext);
    const userEmail = user?.email
    const userName = user?.displayName

    const [currentUsername, setcurrentUsername] = useState('');


    const [bookedProduct, setProduct] = useState(null)
    const navigate = useNavigate('');

    // console.log(user, userEmail, userName)

    const { register, handleSubmit, reset, formState: { errors } } = useForm();


    // const products = useLoaderData();

    const params = useParams();

    useEffect(() => {
        fetch(`http://localhost:5000/currectUser?email=${userEmail}`)
            .then(res => res.json())
            .then(data => {
                setcurrentUsername(data.name);
            })

    }, [])

    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/categories/${params?.cullection}`, {
                headers: {
                    authuraization: `bearer ${localStorage.getItem('accesstoken')}`
                }
            });
            const data = await res.json();
            console.log(res)
            return data;
        }
    });


    //-------------------------------------------
    const handleBooking = (data) => {
        // event.preventDefault();
        // console.log('ssssssssssssssss', data)
        const buyerEmail = user?.email;

        const photo = bookedProduct.PhotoUrl
        const price = bookedProduct.resellPrice
        const name = bookedProduct.name
        const yearOfUse = bookedProduct.yearOfUse
        const oldCullectionId = bookedProduct._id

        const allInfo = {
            ...data,
            photo,
            price,
            name,
            yearOfUse,
            oldCullectionId
        }


        console.log(buyerEmail);
        console.log(allInfo);
        fetch(`http://localhost:5000/categories/${bookedProduct?._id}`, {
            method: 'POST',
            headers: {
                bookingProduct: JSON.stringify(allInfo),
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                toast.success('successful.')
                console.log('ssssssssss')
                refetch();
                reset()
                // navigate('/dashboard')


            })
    }
    //-------------------------------------------


    //-------------------------------------------
    const handleReport = (id) => {
        fetch(`http://localhost:5000/product/report/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Report submit successful.')
                    refetch();
                }
            })
    }
    //-------------------------------------------


    //----------------
    if (isLoading) {
        return <Loder></Loder>
    }
    //----------------


    return (
        <div>

            <h2 className='text-center text-2xl my-10'>This is the cullection of all <br />{products[0]?.category} Watches</h2>


            <div className='grid gap-6 justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    products?.map(product => <div key={product?._id}>
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
                                    {
                                        product?.verify ?
                                            <>
                                                <div className='flex'>
                                                    <h1 className='text-success font-bold'>Verified </h1>
                                                    <h1 className='text-blue-300 w-5 text-center'><IoCheckmarkDoneCircleOutline className='text-blue text-[24px]'></IoCheckmarkDoneCircleOutline> </h1>
                                                </div>
                                            </>
                                            :
                                            <><h1 className='text-success'>Not Verified</h1></>
                                    }
                                    <p>Orginal Price: {product?.orginalPrice}</p>
                                    <p>Category: {product?.category}</p>
                                    <p>Use of Year: {product?.yearOfUse}</p>


                                    <div className="">
                                        <button onClick={() => handleReport(product._id)} className="btn btn-xs btn-error">Report</button>
                                    </div>

                                    <div className="card-actions ">

                                        {/* The button to open modal */}
                                        <label onClick={() => setProduct(product)} htmlFor="booking-modal" className="btn btn-outline  w-full btn-success">Book Now</label>

                                    </div>

                                </div>
                            </div>
                        }
                    </div>

                    )
                }
            </div>
            {/* -------------------------------------- */}
            {/* -------------------------------------- */}
            <>
                <input type="checkbox" id="booking-modal" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box relative">
                        <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                        <h3 className="text-lg font-bold">Name</h3>
                        <form onSubmit={handleSubmit(handleBooking)} className='grid grid-cols-1 gap-3 mt-10'>


                            {/*---------- user name -----------*/}
                            <div className="form-control w-full">
                                <label className="label mt-4"><span className="label-text"> name</span></label>
                                <input  {...register("userName")} name="userName" value={currentUsername} className="input input-bordered w-full " />
                            </div>
                            {/*---------- user email -----------*/}
                            <div className="form-control w-full">
                                <label className="label mt-4"><span className="label-text">email</span></label>
                                <input  {...register("userEmail")} name="userEmail" value={userEmail} className="input input-bordered w-full " />
                            </div>
                            {/*---------- product name -----------*/}
                            <div className="form-control w-full">
                                <label className="label mt-4"><span className="label-text"> product name</span></label>
                                <input  {...register("productName")} name="productName" value={bookedProduct?.name} className="input input-bordered w-full " />
                            </div>
                            {/*---------- price -----------*/}
                            <div className="form-control w-full">
                                <label className="label mt-4"><span className="label-text">price</span></label>
                                <input  {...register("productPrice")} name="productPrice" value={bookedProduct?.resellPrice} className="input input-bordered w-full " />
                            </div>



                            {/*---------- Phone Number -----------*/}
                            <div className="form-control w-full">
                                <label className="label mt-4"><span className="label-text">Phone Number</span></label>
                                <input  {...register("PhonNumber", {
                                    required: "Product Name Required"
                                })} type="name" name="PhonNumber" className="input input-bordered w-full " />
                                {errors.PhonNumber && <p className='text-red-600 text-sm'>{errors.PhonNumber?.message}</p>}
                            </div>
                            {/*---------- loction -----------*/}
                            <div className="form-control w-full">
                                <label className="label mt-4"><span className="label-text">Meting Location</span></label>
                                <input  {...register("mettinglocation", {
                                    required: "metting location Name Required"
                                })} type="name" name="mettinglocation" className="input input-bordered w-full " />
                                {errors.mettinglocation && <p className='text-red-600 text-sm'>{errors.mettinglocation?.message}</p>}
                            </div>



                            <input className='btn mt-8 w-full btn-success' value={'Confirm Booking'} type="submit" />
                        </form>
                    </div>
                </div>
            </>
            {/* -------------------------------------- */}
            {/* -------------------------------------- */}
        </div>
    );
};

export default Categories;