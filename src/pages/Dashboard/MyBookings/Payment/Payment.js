import React from 'react';
import { useLoaderData } from 'react-router-dom';
//---------------
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Checkout from './Checkout';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
console.log(stripePromise)


const Payment = () => {


    const bookedProduct = useLoaderData();
    console.log(bookedProduct)

    return (
        <div className='flex justify-center my-5'>
            <div className="mockup-phone border-info">
                <div className="camera"></div>
                <div className="display">
                    <div className="artboard artboard-demo phone-1">

                        <div className='p-5'>
                            <div className="card  bg-base-100 shadow-xl image-full">
                                <figure><img src={bookedProduct.PhotoUrl} alt="Shoes" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">Shoes!</h2>
                                    <p>If a dog chews shoes whose shoes does he choose?</p>
                                    <div className="card-actions justify-end">
                                        { }
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* ------------------- */}
                        <div className='p-5'>
                            <div className='bg-green-200 w-96 p-5 rounded-lg'>
                                <Elements stripe={stripePromise}>
                                    <Checkout
                                        bookedProduct={bookedProduct}
                                    ></Checkout>
                                </Elements>
                            </div>
                        </div>
                        {/* ------------------- */}

                        <button className="btn btn-outline btn-success">pay</button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;