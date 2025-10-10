import React, { useState, useEffect } from 'react';
import Tooltip from "@/Components/Tooltip.jsx";
import { FaArrowRightLong } from "react-icons/fa6";

const getImageUrl = () => new URL('../assets/hero-img.png', import.meta.url).href;

const Hero = () => {
    // State to track if the screen is mobile-sized
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    // Effect to update the state when the window is resized
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        // Cleanup the event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div>
            {/* Main container is now a positioning context */}
            <div className="relative min-h-screen w-full">

                {/* 1. Background Layer with Conditional Blur */}
                <div
                    className={`absolute inset-0 bg-cover bg-center ${isMobile ? 'blur-sm' : ''}`}
                    style={{ backgroundImage: `url(${getImageUrl()})` }}
                />

                {/* 2. Content Layer (sits on top of the background) */}

                <div className={`relative z-10 flex min-h-screen w-full flex-col items-center justify-center gap-12 p-6 pt-10 md:flex-row md:justify-between md:px-20 ${isMobile ? 'bg-black/30' : ''}`}>

                    {/* --- LEFT SECTION --- */}
                    <div id={"left"}
                         className={`flex flex-col w-full max-w-md md:max-w-[300px] text-center md:text-left items-center md:items-start
                                    transition-all duration-300
                                    ${!isMobile ? 'bg-white/20 backdrop-blur-sm rounded-xl p-6' : ''}`}
                    >
                        <h1 className={`text-3xl sm:text-4xl font-bold leading-relaxed tracking-tight ${isMobile ? 'text-white' : 'text-black'}`}>
                            Your Journey, Your Car, Your Way
                        </h1>
                        <p className={`mt-4 ${isMobile ? 'text-gray-200' : 'text-gray-800'}`}>
                            Experience the ultimate freedom of choice with GoCar - tailor your adventure by choosing from our premium fleet of vehicles.
                        </p>
                        <button
                            className={
                                `mt-8 w-[150px] rounded-full border-2 border-transparent
                                bg-[#FD3B3B] px-4 py-2 text-white
                                transition-all duration-300 transform
                                hover:-translate-y-0.5 hover:border-[#FD3B3B] hover:bg-white hover:text-[#FD3B3B]
                                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FD3B3B] hover:cursor-pointer`
                            }
                            style={{ animation: 'pulse-dramatic 3s infinite' }}
                        >
                            Get Started
                        </button>
                    </div>

                    {/* --- RIGHT SECTION --- */}
                    <div id={"right"} className={"flex flex-col w-full max-w-sm md:w-auto items-center text-center"}>
                        <div className={`flex flex-col items-center justify-center 
                                        ${!isMobile ? 'bg-white/20 backdrop-blur-sm rounded-xl p-4' : ''}`}
                        >
                            <Tooltip />
                            <h3 className={`text-3xl font-semibold ${isMobile ? 'text-white' : 'text-black'}`}>
                                12.5K+ People
                            </h3>
                            <p className={`${isMobile ? 'text-gray-200' : 'text-gray-800'}`}>
                                have used our services such as renting, buying, or even selling their car.
                            </p>
                        </div>
                        <div className={"flex flex-wrap items-center justify-center gap-3 mt-10"}>
                            {/* ... Your four buttons ... */}
                            <button className={`px-6 border-2 border-[#FD3B3B] py-3 text-xl text-[#FD3B3B] rounded-full hover:bg-[#FD3B3B] hover:text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white hover:cursor-pointer  ${!isMobile ? 'bg-white/70' : 'bg-[#F5F5F5]'}`}>Rent</button>
                            <button className={`px-7 border-2 border-[#FD3B3B] py-3 text-xl text-[#FD3B3B] rounded-full hover:bg-[#FD3B3B] hover:text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white hover:cursor-pointer ${!isMobile ? 'bg-white/70' : 'bg-[#F5F5F5]'}`}>Buy</button>
                            <button className={`px-8 border-2 border-[#FD3B3B] py-3 text-xl text-[#FD3B3B] rounded-full hover:bg-[#FD3B3B] hover:text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white hover:cursor-pointer ${!isMobile ? 'bg-white/70' : 'bg-[#F5F5F5]'}`}>Sell</button>
                            <button className={`px-5 border-2 border-[#FD3B3B] py-3 text-xl text-[#FD3B3B] rounded-full hover:bg-[#FD3B3B] hover:text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white hover:cursor-pointer ${!isMobile ? 'bg-white/70' : 'bg-[#F5F5F5]'}`}>Consult</button>
                        </div>
                        <div className={`flex gap-3 text-2xl items-center justify-center mt-10 transition-all duration-300 hover:text-[#FD3B3B] hover:gap-5 hover:cursor-pointer ${isMobile ? 'text-gray-200' : 'text-gray-800'}`}>
                            Learn more <FaArrowRightLong />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Hero;