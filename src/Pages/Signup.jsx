import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { RiMailSendLine } from 'react-icons/ri'
import Navbar from '../Components/Navbar'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [isSubscribed, setIsSubscribed] = useState(false)
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    })

    // Fixed launch date - October 31, 2025, 23:59:59
    const LAUNCH_DATE = new Date('2025-10-31T23:59:59').getTime()

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime()
            console.log(now)
            const distance = LAUNCH_DATE - now

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    const handleSubscribe = (e) => {
        e.preventDefault()
        if (email) {
            setIsSubscribed(true)
            setTimeout(() => {
                setEmail('')
                setIsSubscribed(false)
            }, 3000)
        }
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 100 }
        }
    }

    return (
        <div className="min-h-screen bg-[#F5F5F5]">
            <Navbar />

            <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-5 py-12 relative overflow-hidden">
                {/* Animated background circles matching your theme */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            x: [0, 50, 0],
                            y: [0, 30, 0],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute -top-20 -right-20 w-96 h-96 bg-[#FD3B3B]/5 rounded-full blur-3xl"
                    />
                    <motion.div
                        animate={{
                            scale: [1.1, 1, 1.1],
                            x: [0, -30, 0],
                            y: [0, 50, 0],
                        }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#FD3B3B]/5 rounded-full blur-3xl"
                    />
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-5xl w-full relative z-10"
                >
                    <div className="text-center">
                        {/* Logo */}
                        <motion.div
                            variants={itemVariants}
                            className="mb-8"
                        >
                            <motion.div
                                animate={{
                                    y: [0, -10, 0],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="inline-block"
                            >
                                <div className="w-24 h-24 bg-[#FD3B3B] rounded-full flex items-center justify-center mx-auto shadow-xl">
                                    <span className="text-5xl">🚗</span>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Heading */}
                        <motion.h1
                            variants={itemVariants}
                            className="text-5xl md:text-7xl font-bold text-[#222222] mb-4"
                        >
                            Coming <span className="text-[#FD3B3B]">Soon</span>
                        </motion.h1>

                        <motion.p
                            variants={itemVariants}
                            className="text-xl md:text-2xl text-gray-700 mb-12 max-w-2xl mx-auto"
                        >
                            We're building something amazing for you. Sign up feature launching soon!
                        </motion.p>

                        {/* Countdown Timer */}
                        <motion.div
                            variants={itemVariants}
                            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 max-w-3xl mx-auto"
                        >
                            {Object.entries(timeLeft).map(([unit, value]) => (
                                <motion.div
                                    key={unit}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border-2 border-[#FD3B3B]/20 shadow-lg hover:shadow-xl hover:border-[#FD3B3B] transition-all duration-300"
                                >
                                    <motion.div
                                        key={value}
                                        initial={{ scale: 1.2, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="text-4xl md:text-6xl font-bold text-[#FD3B3B] mb-2"
                                    >
                                        {value.toString().padStart(2, '0')}
                                    </motion.div>
                                    <div className="text-sm md:text-base text-[#222222] uppercase tracking-wider font-semibold">
                                        {unit}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Progress Bar */}
                        <motion.div
                            variants={itemVariants}
                            className="mb-12 max-w-2xl mx-auto bg-white/70 backdrop-blur-sm rounded-2xl p-6 border-2 border-[#FD3B3B]/20"
                        >
                            <div className="flex justify-between text-sm text-[#222222] font-semibold mb-3">
                                <span>Development Progress</span>
                                <span>75%</span>
                            </div>
                            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '75%' }}
                                    transition={{ duration: 2, ease: 'easeOut' }}
                                    className="h-full bg-[#FD3B3B] rounded-full"
                                />
                            </div>
                        </motion.div>

                        {/* Email Subscription */}
                        <motion.div
                            variants={itemVariants}
                            className="mb-12 max-w-md mx-auto"
                        >
                            <h3 className="text-xl font-semibold text-[#222222] mb-4">Get Notified When We Launch</h3>
                            <form onSubmit={handleSubscribe} className="relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full px-6 py-4 bg-white border-2 border-[#FD3B3B]/20 rounded-full text-[#222222] placeholder-gray-400 focus:outline-none focus:border-[#FD3B3B] transition-all"
                                    required
                                />
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    type="submit"
                                    className={`absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 rounded-full font-semibold flex items-center gap-2 shadow-lg transition-all duration-300
                                        ${isSubscribed 
                                            ? 'bg-green-500 text-white' 
                                            : 'bg-[#FD3B3B] text-white hover:bg-white hover:text-[#FD3B3B] border-2 border-transparent hover:border-[#FD3B3B]'
                                        }`}
                                >
                                    {isSubscribed ? (
                                        <>
                                            ✓ Subscribed
                                        </>
                                    ) : (
                                        <>
                                            Notify Me
                                            <RiMailSendLine className="text-xl" />
                                        </>
                                    )}
                                </motion.button>
                            </form>
                            {isSubscribed && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-green-600 mt-3 text-sm font-semibold"
                                >
                                    ✓ Thank you! We'll notify you when we launch.
                                </motion.p>
                            )}
                        </motion.div>

                        {/* Social Media Links */}
                        <motion.div
                            variants={itemVariants}
                            className="flex justify-center gap-4"
                        >
                            {[
                                { icon: FaFacebookF },
                                { icon: FaTwitter },
                                { icon: FaInstagram },
                                { icon: FaLinkedinIn }
                            ].map((social, index) => (
                                <motion.a
                                    key={index}
                                    href="#"
                                    whileHover={{ scale: 1.1, y: -3 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-12 h-12 bg-white border-2 border-[#FD3B3B]/20 rounded-full flex items-center justify-center text-[#FD3B3B] hover:bg-[#FD3B3B] hover:text-white hover:border-[#FD3B3B] transition-all duration-300 shadow-md"
                                >
                                    <social.icon className="text-lg" />
                                </motion.a>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default Signup
