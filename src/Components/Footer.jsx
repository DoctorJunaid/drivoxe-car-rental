

import React from 'react';
import { FaArrowRight, FaArrowUp } from 'react-icons/fa';
import footerImage from '@/assets/footer.webp';
import appStoreBadge from '@/assets/App-store.webp';
import googlePlayBadge from '@/assets/Google.webp';

const Footer = ({children}) => {
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
                {children}

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