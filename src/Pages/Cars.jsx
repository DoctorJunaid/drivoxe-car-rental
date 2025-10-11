import React, {useRef, useState} from 'react';
import Card from '/src/Components/Card/Card.jsx';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {setSelectedCarId} from "@/Redux/carSlice.js";
import {ToastContainer, Zoom} from "react-toastify";
import Navbar from "@/Components/Navbar.jsx";
import Cart from "@/Components/Cart.jsx";
import footerImage from "@/assets/carPagefoooter.webp";
import Footer from "@/Components/Footer.jsx";
import {Link} from "react-router-dom";
import carHero from "@/assets/carHero.webp";


const Cars = () => {


    const [currentPage , setcurrentPage ] = useState(1);
    const [cardsPerPage , setcardsPerPage ] = useState(9)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const carSectionRef = useRef(null);

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

    const handlePageChange = (page) => {
        setcurrentPage(page);
        carSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    return (
        <div>
            <Navbar />
            <div className=" px-4 sm:px-8 py-4 text-sm text-slate-600 bg-slate-50 border-b border-slate-200">
                <div className="max-w-7xl mx-auto">
                    <Link to="/" className="hover:text-red-500 transition-colors">HOME</Link> / CARS
                </div>
            </div>
            <h1 className={"text-5xl m-10   font-semibold text-center"}>Our Impressive Fleet</h1>

            <div className="w-full aspect-[16/9] md:aspect-[21/9] lg:aspect-[32/9] overflow-hidden">
                <img
                    src={carHero}
                    alt="carImage"
                    className="w-full h-full object-cover object-center"
                />
            </div>

            <div ref={carSectionRef} style={{
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
                            onClick={() => handlePageChange(page)}
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
            <Cart />
            <Footer children={
                <div className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-[24px] sm:rounded-[32px] lg:rounded-[40px] overflow-hidden mb-8 lg:mb-12">
                    <div className="relative w-full min-h-[280px] sm:min-h-[320px] lg:min-h-[350px]">
                        {/* Car Image - Full Width Background */}
                        <div className="absolute inset-0 w-full h-full ">
                            <img
                                src={footerImage}
                                alt="Red Sports Car"
                                className="w-full h-full object-cover object-center"
                                style={{ objectPosition: '60% center' }}
                            />
                            <div className="absolute inset-0 bg-black opacity-60"></div>


                        </div>

                        {/* Content Overlay - Top Right */}
                        <div className="relative z-20 flex justify-end items-start h-full">
                            <div className="w-full sm:w-[55%] lg:w-[50%] px-6 py-8 sm:py-10 lg:px-12 lg:py-16">
                                <p className="text-sm sm:text-base lg:text-lg text-gray-300 mb-6 lg:mb-8 leading-relaxed text-right">
                                    Find Your Perfect Ride
                                </p>
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 lg:mb-4 justify-end">
                                    Explore Our Fleet and Book Your Dream Car Today!
                                </h1>
                                <div className="flex flex-wrap gap-3 lg:gap-4 justify-end">
                                  <button className={"bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full hover:scale-110 cursor-pointer hover:brightness-110 transition-all duration-300 "}>Let’s Drive with Us</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            } />
        </div>
    );
};
export default Cars;