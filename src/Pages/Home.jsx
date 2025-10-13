import React, { useState, useEffect } from 'react';
import Navbar from "../Components/Navbar.jsx";
import Hero from "@/Components/Hero.jsx";
import Carousal from "@/Components/Carousal.jsx";
import BuySection from "@/Components/BuySection.jsx";
import AnimatedTestimonialsData from "@/Components/AnimatedTestimonialsData.jsx";
import Footer from "@/Components/Footer.jsx";
import ShoppingCartButton from "@/Components/Cart.jsx";
import footerImage from "@/assets/footer.webp";
import appStoreBadge from "@/assets/App-store.webp";
import googlePlayBadge from "@/assets/Google.webp";


const Home = () => {


    return (
        <div>
            <Navbar />
            <Hero />
            <Carousal />
            <BuySection />
            <AnimatedTestimonialsData />
            <Footer children={
                <div className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-[24px] sm:rounded-[32px] lg:rounded-[40px] overflow-hidden mb-8 lg:mb-12">
                    <div className="relative w-full min-h-[280px] sm:min-h-[320px] lg:min-h-[350px]">
                        {/* Car Image - Full Width Background */}
                        <div className="absolute inset-0 w-full h-full">
                            <img
                                src={footerImage}
                                alt="Red Sports Car"
                                className="w-full h-full object-cover object-center"
                                style={{ objectPosition: '60% center' }}
                            />

                        </div>

                        {/* Content Overlay - Top Right */}
                        <div className="relative z-20 flex justify-end items-start h-full">
                            <div className="w-full sm:w-[55%] lg:w-[50%] px-6 py-8 sm:py-10 lg:px-12 lg:py-16">
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 lg:mb-4">
                                    Ready to Go?
                                </h1>
                                <p className="text-sm sm:text-base lg:text-lg text-gray-300 mb-6 lg:mb-8 leading-relaxed">
                                    Book your car wherever you are<br />and ride with us now!
                                </p>

                                {/* App Store Buttons */}
                                <div className="flex flex-wrap gap-3 lg:gap-4">
                                    <img
                                        src={appStoreBadge}
                                        alt="Download on the App Store"
                                        className="h-10 sm:h-11 lg:h-12 cursor-pointer transform hover:scale-105 hover:brightness-110 transition-all duration-300"
                                    />
                                    <img
                                        src={googlePlayBadge}
                                        alt="Get it on Google Play"
                                        className="h-10 sm:h-11 lg:h-12 cursor-pointer transform hover:scale-105 hover:brightness-110 transition-all duration-300"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
            />
            <ShoppingCartButton />
        </div>
    );
};

export default Home;