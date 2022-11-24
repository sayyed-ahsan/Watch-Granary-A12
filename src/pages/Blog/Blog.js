import React from 'react';

const Blog = () => {
    return (
        <div className='p-5'>
            <div className="flex flex-col w-full">
                {/* ----------- */}
                <div className="grid card bg-base-300 rounded-box place-items-center">
                    <div className='py-4'>
                        <h1 className='text-center text-2xl'>How does prototypical inheritance work?</h1>
                        <p className='p-3'>Image result for How does prototypical inheritance work?
                            The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the Prototype of an object, we use Object. getPrototypeOf and Object.
                        </p>
                    </div>
                </div>
                {/* ------------ */}
                <div className="divider"></div>
                {/* ------------ */}
                <div className="grid card bg-base-300 rounded-box place-items-center">
                    <div className='py-4'>
                        <h1 className='text-center text-2xl'>What is a unit test? Why should we write unit tests?</h1>
                        <p className='p-3'>The main objective of unit testing is to isolate written code to test and determine if it works as intended. Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages.</p>
                    </div>
                </div>
                {/* ------------ */}
                <div className="divider"></div>
                {/* ------------ */}
                <div className="grid card bg-base-300 rounded-box place-items-center">
                    <div className='py-4'>
                        <h1 className='text-center text-2xl'>What are the different ways to manage a state in a React application?</h1>
                        <p className='p-3'>Not only are there are a lot of different kinds of state, but there often dozens of ways of managing each kind. Which should you choose?
                            There are four main types of state you need to properly manage in your React apps:

                            Local state,
                            Global state,
                            Server state,
                            URL state.

                            1.local state would be needed to show or hide a modal component or to track values for a form component, such as form submission, when the form is disabled and the values of a form’s inputs.
                            2.Global state is necessary when we want to get and update data anywhere in our app, or in multiple components at least.

                            A common example of global state is authenticated user state. If a user is logged into our app, it is necessary to get and change their data throughout our application.
                            3.URL state is often missing as a category of state, but it is an important one.
                            In many cases, a lot of major parts of our application rely upon accessing URL state. Try to imagine building a blog without being able to fetch a post based off of its slug or id that is located in the URL!
                            4.There are several pieces of state that must be managed every time you fetch or update data from an external server, including loading and error state.
                        </p>
                    </div>
                </div>
                {/* ------------ */}
                <div className="divider"></div>
                {/* ------------ */}
                <div className="grid card bg-base-300 rounded-box place-items-center">
                    <div className='py-4'>
                        <h1 className='text-center text-2xl'>React vs. Angular vs. Vue?</h1>
                        <p className='p-3'>Which is more popular React Vue or Angular?
                            Popularity. According to a survey by Stack Overflow 40.13% of the developers believe that React is the most commonly used JavaScript Framework. Angular and Vue follow it with 22.96% and 18.97%, respectively.</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Blog;