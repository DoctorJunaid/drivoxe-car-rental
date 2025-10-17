import  React, {useEffect, useRef, useState} from 'react';
import {ToastContainer, Zoom} from "react-toastify";
import Navbar from "@/Components/Navbar.jsx";
import Cart from "@/Components/Cart.jsx";
import footerImage from "@/assets/carPagefoooter.webp";
import Footer from "@/Components/Footer.jsx";
import {Link} from "react-router-dom";
import carHero from "@/assets/carHero.webp";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {setSelectedCarId} from "@/Redux/carSlice.js";
import Card from "@/Components/Card/Card.jsx";
import { useLenis, ReactLenis } from 'lenis/react';


const Cars = () => {


    const [currentPage , setcurrentPage ] = useState(1);
    const [cardsPerPage , setcardsPerPage ] = useState(9)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const carSectionRef = useRef(null);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const cars = useSelector((state)=> state.car.cars);

    const handleRentClick = (id) => {
        dispatch(setSelectedCarId(id));
        navigate(`/cars/${id}`)
    };
    // pagination
    const lastCardIndex = currentPage * cardsPerPage;
    const firstCardIndex = lastCardIndex - cardsPerPage;
    const currentCards = cars.slice(firstCardIndex, lastCardIndex);
    const lenis = useLenis();
    const [initialScrollPosition, setInitialScrollPosition] = useState(null);
    let pages = [];
    for (let i = 1; i <= Math.ceil(cars.length / cardsPerPage); i++) {
        pages.push(i);
    }


// 1. EFFECT TO CAPTURE POSITION ONCE
    useEffect(() => {
        // Run only if the ref and Lenis are ready, and position is not yet set
        if (carSectionRef.current && lenis && initialScrollPosition === null) {
            const navbarHeight = 80;

            const captureTimeout = setTimeout(() => {

                // --- CAPTURE THE ELEMENT'S ABSOLUTE POSITION ---
                // Use lenis.scroll for the current scroll offset
                const rect = carSectionRef.current.getBoundingClientRect();
                const currentScrollPosition = lenis.scroll; // Lenis uses 'scroll' for the value
                const elementTop = rect.top + currentScrollPosition;
                // ----------------------------------------------

                const offsetPosition = Math.max(0, elementTop - navbarHeight);
                setInitialScrollPosition(offsetPosition);
            }, 100);

            return () => clearTimeout(captureTimeout);
        }
    }, [lenis, initialScrollPosition]);
    const handlePageChange = (page) => {
        if (page === currentPage) return;

        setcurrentPage(page);
        setIsTransitioning(true);

        // Reset transition state after the smooth scroll completes
        setTimeout(() => {
            setIsTransitioning(false);
        }, 650);
    };

// 2. EFFECT FOR PAGINATION SCROLL (The crucial Lenis API call)
    useEffect(() => {
        // Exit if not transitioning, position is null, or Lenis is not ready
        if (!isTransitioning || initialScrollPosition === null || !lenis) return;

        // --- THE FIX: Use lenis.scrollTo() ---
        // Pass the cached position to the Lenis instance
        lenis.scrollTo(initialScrollPosition, {
            duration: 0.6, // Matches your 600ms transition time
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
        // ---------------------------------------------

        // Cleanup is minimal here as lenis.scrollTo returns immediately
        return () => {};

    }, [isTransitioning, initialScrollPosition, lenis]);


    return (
        <div    >
            <Navbar />
            <div className=" px-4 sm:px-8 py-4 text-sm text-slate-600 bg-slate-50 border-b border-slate-200">
                <div className="max-w-7xl mx-auto">
                    <Link to="/" className="hover:text-red-500 transition-colors">HOME</Link> / CARS
                </div>
            </div>
            <h1  className={"text-5xl m-10   font-semibold text-center"}>Our Impressive Fleet</h1>

            <div className="w-full aspect-[16/9] md:aspect-[21/9] lg:aspect-[32/9] overflow-hidden">
                <img
                    loading={"eager"}
                    decoding={"async"}
                    fetchPriority={"high"}
                    src={carHero}
                    alt="carImage"
                    className="w-full h-full object-cover object-center"
                />
            </div>

            <div
                ref={carSectionRef}
                className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '30px',
                    padding: '20px',
                    maxWidth: '1200px',
                    margin: '40px auto 0'
                }}>
                {currentCards.map((car) => (
                    <Card
                        key={car.id}
                        car={car}
                        onRentClick={handleRentClick}
                    />
                ))}
            </div>
            <div className={"flex justify-center items-center mt-10 gap-2 flex-wrap px-4"}>
                {/* Previous Button */}
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                        currentPage === 1
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-white border-2 cursor-pointer border-red-500 text-red-500 hover:bg-red-500 hover:text-white hover:scale-105'
                    }`}
                >
                    Previous
                </button>




                {/* Next Button */}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === pages.length}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                        currentPage === pages.length
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-white border-2 border-red-500 text-red-500 hover:bg-red-500 cursor-pointer hover:text-white hover:scale-105'
                    }`}
                >
                    Next
                </button>
            </div>

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