import React from 'react';
import linkedIn from '../assets/linkedIn.png'


const About = (props) => {

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const date = new Date()


    const openNewTab = () => {
        window.open('https://www.linkedin.com/in/eden-moyal/');
    }
    return (
        <div className="h-screen bg-gray-200 ">
            <div className="text-center relative">
                <img src="https://images.unsplash.com/photo-1485856407642-7f9ba0268b51?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" className="opacity-30 w-full h-auto max-h-96" alt=""></img>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">

                    <h2 className="text-3xl font-serif md:text-6xl">Eden Ohayon</h2>
                    <h2 className="text-xl font-serif md:text-3xl">{months[date.getMonth()]} {date.getDate()}, {date.getFullYear()}</h2>
                </div>
            </div>
            <div className="flex items-center justify-center ">
                    <button 
                    className="align-center flex justify-between items-center bg-gray-500 text-gray-200 rounded-lg py-2 px-4 pl-2 "
                    onClick={openNewTab}>
                        <img src={linkedIn} width="42" height="42" alt=""></img>
                        <span className="align-middle inline-block font-bold">Go To My Profile</span>
                    </button>
                
                </div>

        </div>
    );


}

export default About;