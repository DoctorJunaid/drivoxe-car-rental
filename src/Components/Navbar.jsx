import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from 'react-icons/fa';
import { useSelector, useDispatch } from "react-redux";
import { User, LogOut, ShoppingCart, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { setLoggedInUser } from "@/Redux/userInfoSlice.js";

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
    // All hooks must be called first, before any conditional logic
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // All selectors at the top
    const currentUser = useSelector((state) => state.userInfo.currentUser) || null;
    const carts = useSelector((state) => state.cart.carts) || {};

    // Get cart item count for current user (safe calculation)
    const cartItemCount = currentUser?.email && carts[currentUser.email] 
        ? carts[currentUser.email].length 
        : 0;

    // Close dropdown when clicking outside - always called
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isDropdownOpen]);

    // Reset dropdown when user logs out
    useEffect(() => {
        if (!currentUser) {
            setIsDropdownOpen(false);
        }
    }, [currentUser]);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMobileMenu = () => setIsMenuOpen(false);

    const handleLogout = () => {
        setIsDropdownOpen(false);
        setIsMenuOpen(false);
        dispatch(setLoggedInUser(null));
        // Use setTimeout to ensure state updates before navigation
        setTimeout(() => {
            navigate('/', { replace: true });
        }, 0);
    };

    const handleProfileClick = () => {
        setIsDropdownOpen(false);
        setIsMenuOpen(false);
        navigate('/profile');
    };

    return (
        <nav className="flex justify-between items-center px-5 py-4 bg-white shadow-lg relative z-50 border-b border-gray-100">
            {/* Logo */}
            <motion.div 
                className="text-3xl font-bold bg-gradient-to-r from-[#FD3B3B] to-[#ff6b6b] bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                <Link to="/" onClick={closeMobileMenu}>DRIVOXE</Link>
            </motion.div>

            {/* Desktop Menu */}
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

                <div className="h-6 w-[2px] bg-gray-200" />

                {/* Cart Icon */}
                {currentUser && (
                    <Link to="/cart" className="relative">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <ShoppingCart className="w-6 h-6 text-gray-700" />
                            {cartItemCount > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-1 -right-1 bg-[#FD3B3B] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                                >
                                    {cartItemCount}
                                </motion.span>
                            )}
                        </motion.div>
                    </Link>
                )}

                {/* User Dropdown or Login Button */}
                {currentUser ? (
                    <div className="relative" ref={dropdownRef}>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-full border border-gray-200 hover:border-[#FD3B3B] hover:shadow-md transition-all duration-300"
                        >
                            <div className="w-8 h-8 bg-gradient-to-br from-[#FD3B3B] to-[#ff6b6b] rounded-full flex items-center justify-center text-white font-bold">
                                {currentUser.name?.charAt(0).toUpperCase() || 'U'}
                            </div>
                            <span className="font-semibold text-sm text-gray-900">
                                {currentUser.name || 'User'}
                            </span>
                            <motion.div
                                animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ChevronDown className="w-4 h-4 text-gray-600" />
                            </motion.div>
                        </motion.button>

                        {/* Dropdown Menu */}
                        <AnimatePresence>
                            {isDropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
                                >
                                    {/* User Info Header */}
                                    <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                                        <p className="text-sm font-semibold text-gray-900">
                                            {currentUser.name || 'User'}
                                        </p>
                                        <p className="text-xs text-gray-500 truncate">
                                            {currentUser.email || ''}
                                        </p>
                                    </div>

                                    {/* Menu Items */}
                                    <div className="py-2">
                                        <motion.button
                                            whileHover={{ backgroundColor: '#fef2f2', x: 4 }}
                                            onClick={handleProfileClick}
                                            className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:text-[#FD3B3B] transition-colors"
                                        >
                                            <User className="w-5 h-5" />
                                            <span className="font-medium">My Profile</span>
                                        </motion.button>

                                        <motion.button
                                            whileHover={{ backgroundColor: '#fef2f2', x: 4 }}
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:text-[#FD3B3B] transition-colors"
                                        >
                                            <LogOut className="w-5 h-5" />
                                            <span className="font-medium">Logout</span>
                                        </motion.button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ) : (
                    <Link
                        className="px-6 py-2 bg-gradient-to-r from-[#FD3B3B] to-[#ff6b6b] border-2 border-transparent rounded-full text-white font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                        to="/login"
                    >
                        LOGIN
                    </Link>
                )}
            </div>

            {/* Mobile Menu Icon */}
            <div className="md:hidden flex items-center gap-4">
                {/* Mobile Cart Icon */}
                {currentUser && (
                    <Link to="/cart" className="relative">
                        <motion.div
                            whileTap={{ scale: 0.9 }}
                            className="relative p-2"
                        >
                            <ShoppingCart className="w-6 h-6 text-gray-700" />
                            {cartItemCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-[#FD3B3B] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {cartItemCount}
                                </span>
                            )}
                        </motion.div>
                    </Link>
                )}

                <button onClick={toggleMenu} aria-label="Menu" className="text-2xl text-[#222222]">
                    {isMenuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute top-full left-0 w-full bg-white shadow-2xl z-50 md:hidden overflow-hidden border-t border-gray-100"
                    >
                        <ul className="flex flex-col items-center gap-6 py-8 text-[#222222]">
                            <motion.li whileHover={{ scale: 1.05, x: 10 }}>
                                <Link onClick={closeMobileMenu} className="hover:text-[#FD3B3B] font-medium" to="/">
                                    HOME
                                </Link>
                            </motion.li>
                            <motion.li whileHover={{ scale: 1.05, x: 10 }}>
                                <Link onClick={closeMobileMenu} className="hover:text-[#FD3B3B] font-medium" to="/cars">
                                    CARS
                                </Link>
                            </motion.li>
                            <motion.li whileHover={{ scale: 1.05, x: 10 }}>
                                <Link onClick={closeMobileMenu} className="hover:text-[#FD3B3B] font-medium" to="/about">
                                    ABOUT
                                </Link>
                            </motion.li>
                            <motion.li whileHover={{ scale: 1.05, x: 10 }}>
                                <Link onClick={closeMobileMenu} className="hover:text-[#FD3B3B] font-medium" to="/faqs">
                                    FAQS
                                </Link>
                            </motion.li>
                        </ul>

                        <div className="flex flex-col items-center gap-5 pb-8 px-5">
                            <Link
                                onClick={closeMobileMenu}
                                className="font-medium text-[#FD3B3B]"
                                to="/contact"
                            >
                                CONTACT
                            </Link>

                            <div className="h-[2px] w-20 bg-gray-200" />

                            {currentUser ? (
                                <div className="w-full space-y-3">
                                    <div className="text-center pb-3 border-b border-gray-200">
                                        <div className="w-16 h-16 mx-auto mb-2 bg-gradient-to-br from-[#FD3B3B] to-[#ff6b6b] rounded-full flex items-center justify-center text-white font-bold text-2xl">
                                            {currentUser.name?.charAt(0).toUpperCase() || 'U'}
                                        </div>
                                        <p className="font-semibold text-gray-900">{currentUser.name}</p>
                                        <p className="text-xs text-gray-500">{currentUser.email}</p>
                                    </div>

                                    <Link
                                        onClick={closeMobileMenu}
                                        to="/profile"
                                        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 rounded-full text-gray-700 font-semibold hover:bg-gray-200 transition-colors"
                                    >
                                        <User className="w-5 h-5" />
                                        My Profile
                                    </Link>

                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            closeMobileMenu();
                                        }}
                                        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#FD3B3B] rounded-full text-white font-semibold hover:bg-[#e02f2f] transition-colors"
                                    >
                                        <LogOut className="w-5 h-5" />
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    onClick={closeMobileMenu}
                                    className="w-full text-center px-6 py-3 bg-gradient-to-r from-[#FD3B3B] to-[#ff6b6b] rounded-full text-white font-semibold shadow-lg"
                                    to="/login"
                                >
                                    LOGIN
                                </Link>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;