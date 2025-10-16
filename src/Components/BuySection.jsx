import React, {useEffect, useRef, useState} from 'react';
import Card from './Card/Card.jsx';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {setSelectedCarId} from "@/Redux/carSlice.js";
import {useLenis} from "lenis/react";



const BuySection = () => {


    const [currentPage , setcurrentPage ] = useState(1);
    const [cardsPerPage , setcardsPerPage ] = useState(6);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const carSectionRef = useRef(null);
    const titleRef = useRef(null);
    const lenis = useLenis();
    const [initialScrollPosition, setInitialScrollPosition] = useState(null);



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
        <div className="pb-16">
            <div ref={titleRef} className="scroll-mt-20">
                <h2 className={"text-2xl text-gray-800 mt-30 font-bold text-center "} >THE CARS</h2>
                <h1 className={"text-5xl m-10 font-semibold text-center"}>Our Impressive Fleet</h1>
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
                margin: '0 auto',
                minHeight: '600px' // Prevents layout shift
            }}
        >
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

                {/* Page Numbers */}


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

        </div>
    );
};
export default BuySection;