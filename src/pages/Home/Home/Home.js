import React from 'react';
import Advertisement from '../Advertisement/Advertisement';
import Banner from '../Banner/Banner';
import Categories from '../Categories/Categories';
import Reviews from './Reviews/Reviews';
import SectionA from './SectionA/SectionA';
import SectionB from './SectionB/SectionB';
import Subscribe from './Subscribe/Subscribe';

const Home = () => {
    return (
        <div className='mx-'>
            <Banner></Banner>
            <SectionB></SectionB>
            <Advertisement></Advertisement>
            <Categories></Categories>
            <SectionA></SectionA>
            <Reviews></Reviews>
            <Subscribe></Subscribe>
        </div>
    );
};

export default Home;