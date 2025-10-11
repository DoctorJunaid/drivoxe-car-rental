import React, { useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes } from 'react-icons/fa';

// Corrected reusable component for desktop navigation links
const AnimatedNavLink = ({ to, children }) => (
    <li>
        {/* The NavLink now uses its 'children' prop as a function to provide scope */}
        <NavLink to={to}>
            {({ isActive }) => (
                // We use a simple span as a container for the text and the underline.
                // The 'group' and 'relative' classes are now on this container.
                <span className="relative group py-2 font-medium">
                    {/* The text color is determined by isActive */}
                    <span className={`transition-colors duration-300 ${isActive ? "text-[#FD3B3B]" : "text-[#222222] group-hover:text-[#FD3B3B]"}`}>
                        {children}
                    </span>

                    {/* The underline span now has access to isActive */}
                    <span
                        className={`
                            absolute bottom-0 left-0 w-full h-[2px] bg-[#FD3B3B]
                            transform transition-transform duration-300 ease-out
                            ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                        `}
                    />
                </span>
            )}
        </NavLink>
    </li>
);

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMobileMenu = () => setIsMenuOpen(false);

    return (
        <nav className="flex justify-between items-center px-5 py-2 bg-[#F5F5F5] shadow-md relative">
            {/* Logo */}
            <div className="text-3xl font-bold">
                <Link to="/" onClick={closeMobileMenu}>DRIVOXE</Link>
            </div>

            {/* Desktop Menu - No changes needed here */}
            <ul className="hidden md:flex gap-10 justify-center items-center">
                <AnimatedNavLink to="/">HOME</AnimatedNavLink>
                <AnimatedNavLink to="/cars">CARS</AnimatedNavLink>
                <AnimatedNavLink to="/about">ABOUT</AnimatedNavLink>
                <AnimatedNavLink to="/faqs">FAQS</AnimatedNavLink>
            </ul>

            {/* Desktop Action Buttons */}
            <div className="hidden md:flex gap-5 justify-center items-center">
                <Link
                    className="font-medium text-[#FD3B3B] hover:opacity-80 transform hover:-translate-y-0.5 transition-transform duration-300"
                    to="/contact"
                >
                    CONTACT
                </Link>
                <div className="h-6 w-[3px] bg-[#FD3B3B]" />
                <Link
                    className="px-6 py-2 bg-[#FD3B3B] border-2 border-transparent rounded-full text-white hover:bg-white hover:text-[#FD3B3B] hover:border-[#FD3B3B] transform hover:-translate-y-0.5 transition-all duration-300"
                    to="/signup"
                >
                    Sign up
                </Link>
            </div>

            {/* Mobile Menu Icon */}
            <div className="md:hidden">
                <button onClick={toggleMenu} aria-label="Menu" className="text-2xl text-[#222222]">
                    {isMenuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`
                    absolute top-full left-0 w-full bg-[#F5F5F5] z-50 md:hidden
                    transition-all duration-300 ease-in-out transform
                    ${isMenuOpen ? 'opacity-100 translate-y-0 shadow-lg' : 'opacity-0 -translate-y-4 pointer-events-none'}
                `}
            >
                <ul className="flex flex-col items-center gap-6 py-8 text-[#222222]">
                    <li><Link onClick={closeMobileMenu} className="hover:text-[#FD3B3B]" to="/">Home</Link></li>
                    <li><Link onClick={closeMobileMenu} className="hover:text-[#FD3B3B]" to="/car">Car</Link></li>
                    <li><Link onClick={closeMobileMenu} className="hover:text-[#FD3B3B]" to="/about">ABOUT</Link></li>
                    <li><Link onClick={closeMobileMenu} className="hover:text-[#FD3B3B]" to="/faqs">FAQS</Link></li>
                </ul>
                <div className="flex flex-col items-center gap-5 pb-8 px-5">
                    <Link onClick={closeMobileMenu} className="font-medium text-[#FD3B3B]" to="/contact">Contact</Link>
                    <div className="h-6 w-[3px] bg-[#FD3B3B]" />
                    <Link onClick={closeMobileMenu} className="w-full text-center px-6 py-2 bg-[#FD3B3B] border-2 border-transparent rounded-full text-white" to="/signup">Sign up</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;