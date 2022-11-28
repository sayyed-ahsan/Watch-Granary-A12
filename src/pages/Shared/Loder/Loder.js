import React from 'react';
import Lottie from "lottie-react";
import ball from '../../../imges/lotti/football.json';
import loading from '../../../imges/lotti/loding.json';


const Loder = () => {
    return (
        <div className='flex flex-col justify-center items-center'>
            <div className='w-[700px]'> <Lottie className='bg-blac w-[60%]' animationData={ball} loop={true} ></Lottie></div>
        </div>
    );
};

export default Loder;