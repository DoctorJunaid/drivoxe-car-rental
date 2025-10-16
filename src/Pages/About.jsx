import React from 'react'
import Navbar from "@/Components/Navbar.jsx";
import {Link, NavLink} from "react-router-dom";
import aboutHero from "@/assets/aboutHero.webp";
import Footer from "@/Components/Footer.jsx";
import  aboutFooter from "@/assets/aboutFooter.webp";
import Carousel from "@/Components/Carousal.jsx";
import aboutHeroImage from '@/assets/aboutHeroImage.webp'
import {MoveRight} from "lucide-react";


const About = () => {
    return (
        <div>
            <Navbar />
            <div className="px-4 sm:px-8 py-4 text-sm text-slate-600 bg-slate-50 border-b border-slate-200">
                <div className="max-w-7xl mx-auto">
                    <Link  to={"/"} className="hover:text-red-500 transition-colors">HOME</Link> / ABOUT US
                </div>
            </div>
            <h1 className="text-4xl text-center py-3 font-bold ">Who We are</h1>
            <div className="w-full aspect-[16/9] md:aspect-[21/9] lg:aspect-[32/9] overflow-hidden">
                <img
                    src={aboutHero}
                    alt="carImage"
                    className="w-full h-full object-cover object-top-left"
                />
            </div>
            <Carousel />
            <section className="relative flex flex-col lg:flex-row items-center justify-between w-full bg-white overflow-hidden py-8 sm:py-12 lg:py-16 px-4 sm:px-8 lg:px-12 xl:px-16">

                <div className="relative w-full lg:w-[55%] flex flex-col items-start">

                    <NavLink to={"/cars"}>
                    <div className="flex items-center gap-3 mb-4 sm:mb-6">
                        <div className="flex items-center justify-center h-10 w-10 bg-red-500 rounded-full cursor-pointer hover:scale-110 transition-transform duration-300">
                            <MoveRight size={20} className="text-white" />
                        </div>
                        <h3 className="text-sm font-semibold tracking-wider text-gray-800">
                            PICK THE CAR!
                        </h3>
                    </div>
                        </NavLink>


                    <div className="w-full">
                        <img
                            src={aboutHeroImage}
                            alt="Red Sports Car"
                            className="w-full h-auto object-contain drop-shadow-2xl"
                        />
                    </div>
                </div>

                {/* Right Side */}
                <div className="relative w-full lg:w-[42%] bg-white shadow-2xl rounded-xl p-6 sm:p-8 lg:p-10 mt-6 lg:mt-0 lg:-ml-12">
                    <p className="text-gray-500 uppercase tracking-widest font-semibold mb-2 text-xs">
                        Our Journey
                    </p>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">
                        Pioneering Premium Car Rentals
                    </h2>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                        Drivoxe embarked on a remarkable journey over a decade ago, driven by a
                        relentless passion for redefining the travel experience. From the outset,
                        our mission was clear: to provide the finest vehicles and exceptional
                        service to make every journey unforgettable. We've upheld our commitment
                        to delivering quality and variety, offering a diverse range of
                        meticulously maintained vehicles to ensure you always drive in style.
                    </p>
                </div>
            </section>

            <Footer children={
                <div className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-[24px] sm:rounded-[32px] lg:rounded-[40px] overflow-hidden mb-8 lg:mb-12">
                    <div className="relative w-full min-h-[280px] sm:min-h-[320px] lg:min-h-[350px]">
                        <div className="absolute inset-0 w-full h-full ">
                            <img
                                src={aboutFooter}
                                alt="Red Sports Car"
                                className="w-full h-full object-cover object-center"
                                style={{ objectPosition: '60% center' }}
                            />


                        </div>

                        {/* Content Overlay - Top Right */}
                        <div className="relative z-20 h-full flex flex-col items-start justify-around gap-10 px-6 py-8 sm:py-10 lg:px-12 lg:py-16">
                            <div className="w-full sm:w-[55%] lg:w-[50%]">
                                <h3 className="text-3xl font-semibold text-start mb-2 text-white">Reserve Your Dream Car Today and Feel Best Experience Travel</h3>

                            </div>

                            <div className="flex flex-wrap gap-3 lg:gap-4 justify-start">
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-full
                                    hover:scale-105 transition-transform duration-300 shadow-md
                                    text-sm sm:text-base lg:text-lg"
                                >
                                    Let’s Drive with Us
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

            } />
        </div>
    )
}
export default About
