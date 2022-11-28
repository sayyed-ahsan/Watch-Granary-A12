import React from 'react';
import Loder from '../../Shared/Loder/Loder';
import Advertisement from '../Advertisement/Advertisement';
import Banner from '../Banner/Banner';
import Categories from '../Categories/Categories';
import SectionA from './SectionA/SectionA';

const Home = () => {
    return (
        <div className='mx-'>
            <Banner></Banner>
            <Advertisement></Advertisement>
            <Categories></Categories>
            <SectionA></SectionA>
            <Loder></Loder>
        </div>
    );
};

export default Home;