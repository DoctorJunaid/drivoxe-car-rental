import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, CarFront, AlertCircle, ArrowLeft } from 'lucide-react';
import Navbar from "@/Components/Navbar.jsx";

const NotFound = () => {
    const navigate = useNavigate();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 12
            }
        }
    };

    const carAnimation = {
        x: [-1000, 100],
        transition: {
            duration: 2,
            ease: 'easeOut'
        }
    };

    return (


        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden flex items-center justify-center">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                    className="absolute top-20 left-20 w-96 h-96 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.1, 0.15, 0.1]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                    className="absolute bottom-20 right-20 w-96 h-96 bg-red-700 rounded-full mix-blend-multiply filter blur-3xl"
                />
            </div>

            {/* Road Lines Animation */}
            <div className="absolute inset-0 opacity-20">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            x: [-100, 2000]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 0.6,
                            ease: 'linear'
                        }}
                        className="absolute top-1/2 w-32 h-1 bg-white"
                        style={{ left: -100 }}
                    />
                ))}
            </div>

            {/* Main Content */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 max-w-4xl mx-auto px-6 py-4 text-center"
            >
                {/* Animated Car Icon */}
                <motion.div
                    animate={carAnimation}
                    className="flex justify-center mb-2"
                >
                    <CarFront className="w-32 h-32 text-red-500" strokeWidth={1.5} />
                </motion.div>

                {/* 404 Number */}
                <motion.div variants={itemVariants} className="mb-4">
                    <h1 className="text-9xl md:text-[130px] font-bold text-white tracking-tight leading-none">
                        404
                    </h1>
                </motion.div>

                {/* Alert Icon */}
                <motion.div
                    variants={itemVariants}
                    className="flex justify-center mb-6"
                >
                    <div className="relative">
                        <AlertCircle className="w-16 h-16 text-red-500" strokeWidth={2} />
                        <motion.div
                            animate={{
                                scale: [1, 1.3, 1],
                                opacity: [0.5, 0, 0.5]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity
                            }}
                            className="absolute inset-0 bg-red-500 rounded-full blur-lg"
                        />
                    </div>
                </motion.div>

                {/* Title */}
                <motion.h2
                    variants={itemVariants}
                    className="text-4xl md:text-3xl font-bold text-white mb-3"
                >
                    Oops! Wrong Turn
                </motion.h2>

                {/* Description */}
                <motion.p
                    variants={itemVariants}
                    className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
                >
                    Looks like you've driven off the map! The page you're looking for doesn't exist or has been moved.
                </motion.p>

                {/* Buttons */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 px-8 py-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-red-500/50"
                    >
                        <Home className="w-5 h-5" />
                        Back to Homepage
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white/30 hover:border-white/50 text-white font-bold rounded-full transition-all duration-300"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Go Back
                    </motion.button>
                </motion.div>

                {/* Suggestion Links */}
                <motion.div
                    variants={itemVariants}
                    className="mt-12 pt-8 border-t border-white/10"
                >
                    <p className="text-gray-400 mb-4">Quick Links:</p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        {[
                            { label: 'Browse Cars', path: '/cars' },
                            { label: 'Contact Us', path: '/contact' },
                            { label: 'FAQs', path: '/faqs' }
                        ].map((link, index) => (
                            <motion.button
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                onClick={() => navigate(link.path)}
                                className="px-6 py-2 text-gray-300 hover:text-white transition-colors duration-200"
                            >
                                {link.label}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default NotFound;
