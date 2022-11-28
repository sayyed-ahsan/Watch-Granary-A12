import React from 'react';
import Lottie from "lottie-react";
import loading from '../../../imges/lotti/loding.json';


const Loder = () => {
    return (
        <div className='flex justify-center items-center'>
            <div className=''>

                <div className=''> <Lottie className='bg-blac w-[300px] mx-auto' animationData={loading} loop={true} ></Lottie>

                </div>
                <h1 className='text-[25px] text center ml-[110px] mt-[-40px]'>loding...</h1>
            </div>
        </div>

    );
};

export default Loder;