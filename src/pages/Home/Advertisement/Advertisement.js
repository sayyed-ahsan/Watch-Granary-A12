import React from 'react';

const Advertisement = () => {
    return (
        <div className='my-8'>
            <h1 className='text-center text-3xl my-3'>Advertisement Section</h1>
            <div className='px-10'>
                <div className="carousel carousel-center p-4 space-x-4 bg-neutral rounded-box">
                    <div className="carousel-item">
                        <img src="https://placeimg.com/250/180/arch" className="rounded-box" />
                    </div>
                    <div className="carousel-item">
                        <img src="https://placeimg.com/250/180/arch" className="rounded-box" />
                    </div>
                    <div className="carousel-item">
                        <img src="https://placeimg.com/250/180/arch" className="rounded-box" />
                    </div>
                    <div className="carousel-item">
                        <img src="https://placeimg.com/250/180/arch" className="rounded-box" />
                    </div>
                    <div className="carousel-item">
                        <img src="https://placeimg.com/250/180/arch" className="rounded-box" />
                    </div>
                    <div className="carousel-item">
                        <img src="https://placeimg.com/250/180/arch" className="rounded-box" />
                    </div>
                    <div className="carousel-item">
                        <img src="https://placeimg.com/250/180/arch" className="rounded-box" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Advertisement;