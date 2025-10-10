

import React from 'react';
import { FaArrowRight, FaArrowUp } from 'react-icons/fa';
import footerImage from '@/assets/footer.webp';
import appStoreBadge from '@/assets/App-store.webp';
import googlePlayBadge from '@/assets/Google.webp';

const Footer = () => {
    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const footerLinks = {
        'Quick Link': [
            { name: 'About us', href: '#' },
            { name: 'Who we are', href: '#' },
            { name: 'Contact Us', href: '#' }
        ],
        'The Cars': [
            { name: 'How it works', href: '#' },
            { name: 'Pick a car', href: '#' },
            { name: 'FAQs', href: '#' }
        ],
        'Social Media': [
            { name: 'Facebook', href: '#' },
            { name: 'Instagram', href: '#' },
            { name: 'Twitter', href: '#' }
        ],
    };

    return (
        <footer className="relative font-poppins bg-white w-full mt-30">
            {/* Main Container */}
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">

                {/* ===== Top Section with Car Banner ===== */}
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
                </div>

                {/* ===== Bottom Section ===== */}
                <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_2fr] gap-8 lg:gap-16 mb-8">
                    {/* Left - Newsletter */}
                    <div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                            Don't Miss a Thing
                        </h3>
                        <p className="text-sm text-gray-500 mb-5 lg:mb-6">
                            Subscribe to our newsletter for exclusive deals and updates
                        </p>

                        <form className="relative group">
                            <input
                                type="email"
                                placeholder="Enter email address for newsletter"
                                className="w-full px-5 py-3 lg:py-3.5 pr-14 border border-gray-300 rounded-full text-sm placeholder:text-gray-400 focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-200 transition-all duration-300"
                            />
                            <button
                                type="submit"
                                aria-label="Subscribe"
                                className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-brand-red  hover:bg-red-600 bg-red-400 w-9 h-9 lg:w-10 lg:h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                            >
                                <FaArrowRight className="w-4 h-4" style={{ color: 'white' }} />
                            </button>
                        </form>
                    </div>

                    {/* Right - Links and Social */}
                    <div className="flex flex-col sm:flex-row justify-between gap-8 sm:gap-4">
                        {/* Link Columns */}
                        {Object.entries(footerLinks).map(([title, links]) => (
                            <div key={title}>
                                <h3 className="font-bold text-gray-900 text-base mb-4">
                                    {title}
                                </h3>
                                <ul className="space-y-2.5">
                                    {links.map((link) => (
                                        <li key={link.name} className="footer-link">
                                            <a
                                                href={link.href}
                                                className="text-gray-600 text-sm hover:text-red-500 hover:text-brand-red transition-colors duration-300 relative inline-block pb-0.5"
                                            >
                                                {link.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}


                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-200 pt-6 lg:pt-8">
                    <p className="text-xs text-gray-500 text-center">
                        Copyright © 2025 GoCar. All rights reserved.
                    </p>
                </div>
            </div>

            {/* Custom CSS for underline animation */}
            <style>{`
                .footer-link a::after {
                    content: '';
                    position: absolute;
                    width: 0;
                    height: 2px;
                    bottom: 0;
                    left: 0;
                    background-color: #ef4444; /* brand-red */
                    transition: width 0.3s ease-in-out;
                }
                
                .footer-link a:hover::after {
                    width: 100%;
                }
            `}</style>
        </footer>
    );
};

export default Footer;