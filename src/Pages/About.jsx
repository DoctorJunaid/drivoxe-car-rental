import React from 'react'
import Navbar from "@/Components/Navbar.jsx";
import {Link} from "react-router-dom";
import aboutHero from "@/assets/aboutHero.webp";
import Footer from "@/Components/Footer.jsx";
import  aboutFooter from "@/assets/aboutFooter.webp";
import Carousel from "@/Components/Carousal.jsx";


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
            <Section>


            </Section>




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
