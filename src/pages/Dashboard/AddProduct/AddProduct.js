import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { format } from 'date-fns';

import { AuthContext } from '../../../contexts/AuthProvider';

const AddProduct = () => {
    //-----------------------------------------------------------------
    const { user } = useContext(AuthContext);
    //-----------------------------------------------------------------
    const { register, handleSubmit, formState: { errors } } = useForm();
    //-----------------------------------------------------------------
    const imgHostKey = process.env.REACT_APP_imagebb_key;
    const listingDate = format(new Date(), 'PP')

    console.log(" listingDate.......", listingDate)
    //-----------------------------------------------------------------
    const handleAddProduct = (data) => {
        // console.log(data)
        const image = data.photo[0];
        // console.log(image)
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imgHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    console.log("imag--------", imgData.data.url);

                    const productInfo = { ...data, PhotoUrl: imgData?.data.url, email: user?.email }
                    console.log(productInfo)

                    // save product information to the database
                    fetch('http://localhost:5000/addproduct', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            // authorization: `bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(productInfo)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);
                            // toast.success(`${data.name} is added successfully`);
                            // navigate('/dashboard')
                        })
                }
            })
    }
    //-----------------------------------------------------------------

    return (
        <div>
            <div>
                <section className='mx-5 '>
                    <div className='py-10 text-3xl flex justify-center items-center'>
                        <div className='bg-white w-96 p-12 rop-shadow-lg border-2 border-orange-400 rounded-lg'>
                            <h2 className='text-3xl text-center'>List a Product</h2>
                            <form onSubmit={handleSubmit(handleAddProduct)}>
                                {/*---------- name -----------*/}
                                <div className="form-control w-full max-w-xs">
                                    <label className="label mt-4"><span className="label-text">Product Name</span></label>
                                    <input  {...register("name", {
                                        required: "Product Name Required"
                                    })} type="name" className="input input-bordered w-full max-w-xs" />
                                    {errors.name && <p className='text-red-600 text-sm'>{errors.name?.message}</p>}
                                </div>
                                {/*---------- porductDescription -----------*/}
                                <div className="form-control w-full max-w-xs">
                                    <label className="label mt-4"><span className="label-text">Product Description</span></label>
                                    <input  {...register("porductDescription", {
                                        required: "Description Required"
                                    })} type="text" className="input input-bordered w-full max-w-xs" />
                                    {errors.porductDescription && <p className='text-red-600 text-sm'>{errors.porductDescription?.message}</p>}
                                </div>
                                {/*---------- location -----------*/}
                                <div className="form-control w-full max-w-xs">
                                    <label className="label mt-4"><span className="label-text">Product Location</span></label>
                                    <input  {...register("location", {
                                        required: "Product Location Required"
                                    })} type="name" className="input input-bordered w-full max-w-xs" />
                                    {errors.location && <p className='text-red-600 text-sm'>{errors.location?.message}</p>}
                                </div>
                                {/*---------- photo -----------*/}
                                <div className="form-control w-full max-w-xs">
                                    <label className="label mt-4"><span className="label-text">Product Photo</span></label>
                                    <input  {...register("photo", {
                                        required: "Product Photo Required"
                                    })} type="file" className="input input-bordered w-full max-w-xs" />
                                    {errors.photo && <p className='text-red-600 text-sm'>{errors.photo?.message}</p>}
                                </div>

                                {/*---------- resellPrice -----------*/}
                                <div className="form-control w-full max-w-xs">
                                    <label className="label mt-4"><span className="label-text">Product Resll Price</span></label>
                                    <input  {...register("resellPrice", {
                                        required: "Product Resll Price Required"
                                    })} type="number" className="input input-bordered w-full max-w-xs" />
                                    {errors.resellPrice && <p className='text-red-600 text-sm'>{errors.resellPrice?.message}</p>}
                                </div>
                                {/*---------- yearOfUse -----------*/}
                                <div className="form-control w-full max-w-xs">
                                    <label className="label mt-4"><span className="label-text">Year of Use</span></label>
                                    <input  {...register("yearOfUse", {
                                        required: "Year of Use Required"
                                    })} type="number" className="input input-bordered w-full max-w-xs" />
                                    {errors.yearOfUse && <p className='text-red-600 text-sm'>{errors.yearOfUse?.message}</p>}
                                </div>
                                {/*---------- orginalPrice -----------*/}
                                <div className="form-control w-full max-w-xs">
                                    <label className="label mt-4"><span className="label-text">Orginal Price</span></label>
                                    <input  {...register("orginalPrice", {
                                        required: "Orginal Price Required"
                                    })} type="number" className="input input-bordered w-full max-w-xs" />
                                    {errors.orginalPrice && <p className='text-red-600 text-sm'>{errors.orginalPrice?.message}</p>}
                                </div>
                                {/*---------- date -----------*/}
                                <div className="form-control w-full max-w-xs">
                                    <label className="label mt-4"><span className="label-text">Listing Date</span></label>
                                    <input  {...register("listingDate")} value={listingDate} className="input input-bordered w-full max-w-xs" />
                                </div>

                                {/*---------- stoke -----------*/}
                                <div className="form-control w-full max-w-xs">
                                    <label className="label mt-4"><span className="label-text">Stoke</span></label>
                                    <select {...register("stoke")} name="stoke" className="select select-bordered w-full">
                                        <option>available</option>
                                        <option>sold</option>
                                    </select>
                                </div>
                                {/*---------- condition -----------*/}
                                <div className="form-control w-full max-w-xs">
                                    <label className="label mt-4"><span className="label-text">Condition</span></label>
                                    <select {...register("condition")} name="condition" className="select select-bordered w-full">
                                        <option>Like New</option>
                                        <option>New</option>
                                        <option>Good</option>
                                        <option>Very Used</option>
                                    </select>
                                </div>
                                {/*---------- category -----------*/}
                                <div className="form-control w-full max-w-xs">
                                    <label className="label mt-4"><span className="label-text">Category</span></label>
                                    <select {...register("category")} name="category" className="select select-bordered w-full">
                                        <option>Men</option>
                                        <option>Women</option>
                                        <option>Smart</option>
                                    </select>
                                </div>

                                {/*---------- email -----------*/}
                                {/* <div className="form-control w-full max-w-xs">
                                    <label className="label mt-4"><span className="label-text">Your Email</span></label>
                                    <input  {...register("sellerEmail")} name="sellerEmail" Value={user?.email} type="email" className="input input-bordered w-full max-w-xs" />
                                </div> */}
                                {/*---------- Add Button -----------*/}
                                <input className='btn mt-8 w-full' value={'Confirm'} type="submit" />

                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AddProduct;