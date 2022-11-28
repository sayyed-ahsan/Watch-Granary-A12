import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import toast from 'react-hot-toast';


const Login = () => {
    //-----------------------------------------------------------------
    const { user, signIn, googleSignin } = useContext(AuthContext);
    //-----------------------------------------------------------------
    const navigate = useNavigate('');
    //-----------------------------------------------------------------
    const { register, handleSubmit, formState: { errors } } = useForm();
    //-----------------------------------------------------------------
    const handleLogin = (data) => {
        signIn(data.email, data.password)
        getUserToken(data.email);
    }
    //-----------------------------------------------------------------
    const googleLogin = async () => {
        const status = 'buyer'
        googleSignin()
            .then(res => saveUser(res.user.displayName, res.user.email, status))
    }
    //-----------------------------------------------------------------
    //-----------------------------------------------------------------
    const saveUser = (name, email, status) => {
        const user = { name, email, status };
        getUserToken(email)

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
                toast('User Created Successfully.')
            })
    }
    //-----------------------------------------------------------------
    const getUserToken = (email) => {
        console.log(email)
        fetch(`https://final-12-server-sayyed-ahsan.vercel.app/jwt?email=${email}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.accessToken) {
                    localStorage.setItem('accesstoken', data.accessToken);
                    navigate('/')
                }
            })
    }
    //-----------------------------------------------------------------

    return (
        <section className='mx-5 '>
            <div className='h-[800px] text-3xl flex justify-center items-center '>
                <div className='bg-white w-96 p-12 rop-shadow-lg border-2 border-sky-300'>
                    <h2 className='text-3xl text-center'>Login</h2>
                    <form onSubmit={handleSubmit(handleLogin)}>

                        <div className="form-control w-full max-w-xs">
                            <label className="label"><span className="label-text">Email</span></label>
                            <input  {...register("email", {
                                required: "Email Address is required"
                            })} type="email" className="input input-bordered w-full max-w-xs" />
                            {errors.email && <p className='text-red-600 text-sm'>{errors.email?.message}</p>}
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label"><span className="label-text">Password</span></label>
                            <input  {...register("password", {
                                required: "pasword is required",
                                minLength: { value: 6, message: 'Password must be 6 characters or longer' }
                            })} type="password" className="input input-bordered w-full max-w-xs" />
                            <label className="label"><span className="label-text">forget password?</span></label>
                            {errors.password && <p className='text-red-600 text-sm'>{errors.password?.message}</p>}
                        </div>
                        <input className='btn w-full' value={'Login'} type="submit" />

                    </form>
                    <p className='text-sm my-2'> <Link className='text-sky-400' to='/signup'>Signup</Link></p>
                    <div className="divider">OR</div>
                    <button onClick={googleLogin} className='btn btn-outline w-full'>Google</button>
                </div>
            </div>
        </section>
    );
};

export default Login;