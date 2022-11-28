import React from 'react';
import img1 from '../../../../imges/sctionImg/1.png';
import img2 from '../../../../imges/sctionImg/2.png';
import img3 from '../../../../imges/sctionImg/3.png';


const SectionA = () => {
    return (
        <div>
            <section>
                <div className="hero">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <img src={img3} className="max-w-sm rounded-lg shadow-2xl" />
                        <div className='max-w-[600px]'>
                            <h1 className="text-5xl font-bold">Buy a New Watch!</h1>
                            <p className="py-6">It can create a strong impression when she shakes hands or holds phones. That little thing on her wrist helps to perfect any appearance from a minimal look, a posh outfit to an office dress. While women have a wide selection of fashion accessories and jewelry, men have only watches as their truly choice.</p>
                            <button className="btn btn-primary">BYy a Watch</button>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="hero  bg-base-200">
                    <div className="hero-content flex-col lg:flex-row">
                        <img src={img2} className="max-w-sm rounded-lg shadow-2xl" />
                        <div className='max-w-[600px]'>
                            <h1 className="text-5xl font-bold">And sell your old Watch!</h1>
                            <p className="py-6">It not only keeps you on track on most things but also lets you value the time you do have. In fact, it help you spend it right with the people you love, and understanding that value is something that will change your life.</p>
                            <button className="btn btn-primary">sell old one</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SectionA;