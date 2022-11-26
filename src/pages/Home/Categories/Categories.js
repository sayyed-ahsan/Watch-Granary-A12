import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {

    const { data: categories = [] } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const result = await fetch('http://localhost:5000/categories')
            const data = await result.json();
            return data
        }
    })



    return (
        <section className=''>

            <div className='mx-8 my-10'>
                <h1 className='text-3xl text-center my-3'>Categories {categories?.length}</h1>
                <div className='flex justify-center'>


                    {
                        categories?.map(category =>
                            <div className="card w-96 mx-4 bg-base-100 shadow-xl image-full">
                                <figure><img src={category?.image} alt="Shoes" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">{category?.category}</h2>
                                    <p>Visite this {category?.category} and buy for your beloved one...!</p>
                                    <div className="card-actions justify-end">
                                        <Link to={`/categories/${category?.category}`}><button className="btn glass">{category?.category} Cullection</button></Link>
                                    </div>
                                </div>
                            </div>
                        )
                    }



                </div>
            </div>
        </section>
    );
};

export default Categories;