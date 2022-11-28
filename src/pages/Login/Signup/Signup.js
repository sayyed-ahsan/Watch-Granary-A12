import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import toast from 'react-hot-toast';


const Signup = () => {
    //-----------------------------------------------------------------
    const { user, createUser, updateUser } = useContext(AuthContext);
    //-----------------------------------------------------------------
    const navigate = useNavigate('');
    //-----------------------------------------------------------------
    //-----------------------------------------------------------------
    const { register, handleSubmit, formState: { errors } } = useForm();
    //-----------------------------------------------------------------
    const signUp = (data) => {
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast('User Created Successfully.')
                saveUser(data.name, data.email, data.status)

            })
            .catch(error => {
                console.log(error)
                // setSignUPError(error.message)
            });

    }
    //-----------------------------------------------------------------
    const saveUser = (name, email, status) => {
        const user = { name, email, status };
        fetch('https://final-12-server-sayyed-ahsan.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                getUserToken(email)
            })
    }
    //-----------------------------------------------------------------
    const getUserToken = (email) => {
        fetch(`https://final-12-server-sayyed-ahsan.vercel.app/jwt?email=${email}`)
            .then(res => res.json())
            .then(data => {
                if (data.accessToken) {
                    localStorage.setItem('accesstoken', data.accessToken);
                    navigate('/')
                }
            })
    }
    //-----------------------------------------------------------------
    //-----------------------------------------------------------------


    return (
        <div>
            <section className='mx-5 '>
                <div className='h-[800px] text-3xl flex justify-center items-center'>
                    <div className='bg-white w-96 p-12 rop-shadow-lg border-2 border-sky-300'>
                        <h2 className='text-3xl text-center'>Signup</h2>
                        <form onSubmit={handleSubmit(signUp)}>
                            {/*---------- name -----------*/}
                            <div className="form-control w-full max-w-xs">
                                <label className="label"><span className="label-text">Name</span></label>
                                <input  {...register("name", {
                                    required: "Name is Required"
                                })} type="name" className="input input-bordered w-full max-w-xs" />
                                {errors.name && <p className='text-red-600 text-sm'>{errors.name?.message}</p>}
                            </div>
                            {/*---------- status -----------*/}
                            <div className="form-control w-full max-w-xs">
                                <label className="label mt-"><span className="label-text">Account Type</span></label>
                                <select {...register("status")} name="status" className="select select-bordered w-full">
                                    <option>buyer</option>
                                    <option>seller</option>
                                </select>
                            </div>
                            {/*---------- email -----------*/}
                            <div className="form-control w-full max-w-xs">
                                <label className="label"><span className="label-text">Email</span></label>
                                <input  {...register("email", {
                                    required: "Email Address is required"
                                })} type="email" className="input input-bordered w-full max-w-xs" />
                                {errors.email && <p className='text-red-600 text-sm'>{errors.email?.message}</p>}
                            </div>
                            {/*---------- password -----------*/}
                            <div className="form-control w-full max-w-xs">
                                <label className="label"><span className="label-text">Password</span></label>
                                <input  {...register("password", {
                                    required: "pasword is required",
                                    minLength: { value: 6, message: 'Password must be 6 characters or longer' },
                                    pattern: { value: /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]/, message: 'please enter a strong password' }
                                })} type="password" className="input input-bordered w-full max-w-xs" />
                                <label className="label"><span className="label-text">Already have an account?</span></label>
                                {errors.password && <p className='text-red-600 text-sm'>{errors.password?.message}</p>}
                            </div>
                            {/*---------- button -----------*/}
                            <input className='btn w-full' value={'Signup'} type="submit" />
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Signup;