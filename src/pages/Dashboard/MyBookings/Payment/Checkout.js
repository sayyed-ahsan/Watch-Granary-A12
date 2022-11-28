import React, { useContext, useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { AuthContext } from '../../../../contexts/AuthProvider';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

const Checkout = ({ bookedProduct }) => {

    const { user } = useContext(AuthContext);

    //----------------------------
    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const [clientSecret, setClientSecret] = useState("");

    //----------------------------
    const navigate = useNavigate('');

    //----------------------------
    const stripe = useStripe();
    const elements = useElements();
    const { price, userEmail, _id } = bookedProduct;
    //----------------------------
    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("https://final-12-server-sayyed-ahsan.vercel.app/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem('accesstoken')}`
            },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [price]);


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            console.log(error);
            setCardError(error.message);
        }
        else {
            setCardError('');
        }
        setSuccess('');
        setProcessing(true);
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user.displayName,
                        email: userEmail
                    },
                },
            },
        );

        console.log(userEmail)

        if (confirmError) {
            setCardError(confirmError.message);
            return;
        }
        if (paymentIntent.status === "succeeded") {
            console.log('card info', card);
            // store payment info in the database
            const payment = {
                price,
                transactionId: paymentIntent.id,
                email: userEmail,
                bookingId: _id
            }
            console.log(payment)
            fetch('https://final-12-server-sayyed-ahsan.vercel.app/payments', {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.modifiedCount) {
                        oldCulletionUpdate(bookedProduct.oldCullectionId)
                        setSuccess('Congrats! your payment completed');
                        setTransactionId(paymentIntent.id);
                    }
                })
        }

    }



    const oldCulletionUpdate = (oldId) => {
        console.log(oldId)
        fetch(`https://final-12-server-sayyed-ahsan.vercel.app/paymentsOld/${oldId}`, {
            method: 'PUT',
        })
            .then(res => res.json())
            .then(data => {
                toast.success(`successful`);
                console.log(data);
                setProcessing(false);
                navigate('/dashboard/mybooking')

            })
    }



    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button
                    className='btn btn-sm mt-4 btn-primary'
                    type="submit"
                    disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            <p className="text-red-500">{cardError}</p>
            {
                success && <div>
                    <p className='text-green-500'>{success}</p>
                    <p>Your transactionId: <span className='font-bold'>{transactionId}</span></p>
                </div>
            }
        </>
    );
};

export default Checkout;