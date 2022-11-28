import React from 'react';
import { useLoaderData } from 'react-router-dom';
//---------------
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Checkout from './Checkout';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);


const Payment = () => {
    console.log(stripePromise)


    const bookedProduct = useLoaderData();
    console.log(bookedProduct)

    return (
        <section className='flex justify-center'>
            <div>

                <div className='p-5 flex justify-center'>
                    <div className="card  max-w-[300px] bg-base-100 shadow-xl image-full">
                        <figure><img src={bookedProduct.photo} alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{bookedProduct.name}</h2>
                            <h2 className="card-title">$ {bookedProduct.price}</h2>
                            <p>If a dog chews shoes whose shoes does he choose?</p>
                            <div className="card-actions justify-end">
                                { }
                            </div>
                        </div>
                    </div>
                </div>
                {/* ------------------- */}

                <div className='p-5'>
                    <div className='bg-green-300 w-96 p-5 rounded-lg'>
                        <Elements stripe={stripePromise}>
                            <Checkout
                                bookedProduct={bookedProduct}
                            ></Checkout>
                        </Elements>
                    </div>
                </div>

                {/* ------------------- */}

            </div>


        </section>
    );
};

export default Payment;