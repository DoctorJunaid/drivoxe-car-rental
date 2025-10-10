import React, { useState } from 'react';
import Card from './Card/Card.jsx';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {setSelectedCarId} from "@/Redux/carSlice.js";
import {ToastContainer, Zoom} from "react-toastify";


const BuySection = () => {


    const [currentPage , setcurrentPage ] = useState(1);
    const [cardsPerPage , setcardsPerPage ] = useState(6)
    const navigate = useNavigate();
    const dispatch = useDispatch();


        const cars = useSelector((state)=> state.car.cars);

    const handleRentClick = (id) => {
       dispatch(setSelectedCarId(id));
        navigate(`/cars/${id}`)
    };
    // pagination
    const lastCardIndex = currentPage * cardsPerPage;
    const firstCardIndex = lastCardIndex - cardsPerPage;
    const currentCards = cars.slice(firstCardIndex, lastCardIndex);
    let pages = [];
    for (let i = 1; i <= Math.ceil(cars.length / cardsPerPage); i++) {
        pages.push(i);
    }
    return (
        <div>
            <h2 className={"text-2xl text-gray-800 mt-30 font-bold text-center "} >THE CARS</h2>
            <h1 className={"text-5xl m-10   font-semibold text-center"}>Our Impressive Fleet</h1>
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
            padding: '20px',
            maxWidth: '1200px', // Prevents the container from growing wide enough for a 4th column
            margin: '0 auto'
        }}>
            {currentCards.map((car) => (
                <Card
                    key={car.id}
                    car={car}
                    onRentClick={handleRentClick}
                />
            ))}
        </div>
            <div className={"flex justify-center items-center mt-10"}>
                {pages.map((page,index) =>{
                    return (
                        <button
                            key={index}
                            className={"bg-transparent border-red-500 text-red-500 w-10 h-10 rounded-full border mr-2 hover:bg-red-500 hover:text-white cursor-pointer"}
                            onClick={() => setcurrentPage(page)}
                            disabled={currentPage === page}
                        >
                            {page}
                        </button>
                    )
                })}
            </div>
            <ToastContainer
                position="top-center"
                autoClose={1000}
                limit={3}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
                theme="light"
                transition={Zoom}
            />
        </div>
    );
};
export default BuySection;