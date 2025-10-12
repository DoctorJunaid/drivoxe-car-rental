import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Mail,
    Phone,
    MapPin,
    Send,
    Clock,
    MessageSquare,
    Check,
    ArrowRight,
    Sparkles
} from 'lucide-react';
import Navbar from "@/Components/Navbar.jsx";
import Footer from "@/Components/Footer.jsx";
import Cart from "@/Components/Cart.jsx";
import { Link } from "react-router-dom";
import footerImage from "@/assets/footer.webp";
import appStoreBadge from "@/assets/App-store.webp";
import googlePlayBadge from "@/assets/Google.webp";

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const [focusedField, setFocusedField] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => {
            setFormData({ name: '', email: '', phone: '', message: '' });
            setIsSubmitted(false);
        }, 3000);
    };

    const contactCards = [
        {
            icon: Phone,
            title: 'Call Us',
            info: '+92 300 1234567',
            delay: 0.2
        },
        {
            icon: Mail,
            title: 'Email Us',
            info: 'Junaid.aurangzeb1@gmail.com',
            delay: 0.2
        },
        {
            icon: MapPin,
            title: 'Visit Us',
            info: 'Hastnagri Gate Peshawar City',
            delay: 0.3
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <div className="px-4 sm:px-8 py-4 text-sm text-slate-600 bg-slate-50 border-b border-slate-200">
                <div className="max-w-7xl mx-auto">
                    <Link to="/" className="hover:text-red-500 transition-colors">HOME</Link> / CONTACT
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 md:py-24">

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >


                    <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6">
                        Get in Touch
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </motion.div>


                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                    {contactCards.map((card, index) => {
                        const Icon = card.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: card.delay }}
                                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                                className="group bg-white border border-slate-200 rounded-2xl p-8 relative overflow-hidden cursor-pointer"
                            >
                                <motion.div
                                    className="absolute inset-0 bg-red-500 opacity-0 group-hover:opacity-5"
                                    initial={false}
                                    transition={{ duration: 0.3 }}
                                />

                                <motion.div
                                    className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-red-500 transition-colors duration-300"
                                    whileHover={{ rotate: 5 }}
                                >
                                    <Icon className="w-6 h-6 text-red-500 group-hover:text-white transition-colors duration-300" />
                                </motion.div>

                                <h3 className="text-lg font-bold text-slate-900 mb-2">{card.title}</h3>
                                <p className="text-slate-600">{card.info}</p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

                    {/* Form Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-3"
                    >
                        <div className="bg-slate-50 rounded-3xl p-8 md:p-12">
                            <AnimatePresence mode="wait">
                                {!isSubmitted ? (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.3 }}
                                        onSubmit={handleSubmit}
                                        className="space-y-6"
                                    >
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-900 mb-3">
                                                Your Name
                                            </label>
                                            <motion.input
                                                whileFocus={{ scale: 1.01 }}
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                onFocus={() => setFocusedField('name')}
                                                onBlur={() => setFocusedField(null)}
                                                required
                                                className="w-full px-5 py-4 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:border-red-500 transition-colors duration-300 text-slate-900"
                                                placeholder="Your Full Name"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-semibold text-slate-900 mb-3">
                                                    Email Address
                                                </label>
                                                <motion.input
                                                    whileFocus={{ scale: 1.01 }}
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    onFocus={() => setFocusedField('email')}
                                                    onBlur={() => setFocusedField(null)}
                                                    required
                                                    className="w-full px-5 py-4 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:border-red-500 transition-colors duration-300 text-slate-900"
                                                    placeholder="your@mail.com"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-slate-900 mb-3">
                                                    Phone Number
                                                </label>
                                                <motion.input
                                                    whileFocus={{ scale: 1.01 }}
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    onFocus={() => setFocusedField('phone')}
                                                    onBlur={() => setFocusedField(null)}
                                                    className="w-full px-5 py-4 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:border-red-500 transition-colors duration-300 text-slate-900"
                                                    placeholder="+92 300 1234567"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-slate-900 mb-3">
                                                Your Message
                                            </label>
                                            <motion.textarea
                                                whileFocus={{ scale: 1.01 }}
                                                name="message"
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                onFocus={() => setFocusedField('message')}
                                                onBlur={() => setFocusedField(null)}
                                                required
                                                rows="6"
                                                className="w-full px-5 py-4 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:border-red-500 transition-colors duration-300 resize-none text-slate-900"
                                                placeholder="Tell us about your requirements..."
                                            />
                                        </div>

                                        <motion.button
                                            type="submit"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="group w-full bg-red-500 text-white font-bold py-4 px-8 rounded-full hover:bg-red-600 transition-colors duration-300 flex items-center justify-center gap-2"
                                        >
                                            <span>Send Message</span>
                                            <motion.div
                                                animate={{ x: [0, 5, 0] }}
                                                transition={{ duration: 1.5, repeat: Infinity }}
                                            >
                                                <ArrowRight className="w-5 h-5" />
                                            </motion.div>
                                        </motion.button>
                                    </motion.form>
                                ) : (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5, type: "spring" }}
                                        className="py-20 text-center"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                                        >
                                            <Check className="w-10 h-10 text-green-600" />
                                        </motion.div>
                                        <motion.h3
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                            className="text-3xl font-bold text-slate-900 mb-3"
                                        >
                                            Message Sent!
                                        </motion.h3>
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.4 }}
                                            className="text-slate-600 text-lg"
                                        >
                                            We'll get back to you within 24 hours.
                                        </motion.p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>

                    {/* Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="lg:col-span-2 space-y-6"
                    >
                        {/* Office Hours */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            transition={{ duration: 0.3 }}
                            className="bg-slate-900 text-white rounded-3xl p-8"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold">Office Hours</h3>
                            </div>

                            <div className="space-y-4">
                                {[
                                    { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
                                    { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
                                    { day: 'Sunday', hours: 'Closed' }
                                ].map((schedule, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 + index * 0.1 }}
                                        className="flex justify-between items-center pb-4 border-b border-slate-800 last:border-0"
                                    >
                                        <span className="font-semibold">{schedule.day}</span>
                                        <span className="text-slate-400">{schedule.hours}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Emergency Contact */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            transition={{ duration: 0.3 }}
                            className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-3xl p-8"
                        >
                            <h3 className="text-2xl font-bold mb-3">Need Help Now?</h3>
                            <p className="text-red-100 mb-6">Available 24/7 for emergencies</p>
                            <motion.a
                                href="tel:+923123456789"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center gap-2 bg-white text-red-500 px-6 py-3 rounded-full font-bold"
                            >
                                <Phone className="w-5 h-5" />
                                Call Now
                            </motion.a>
                        </motion.div>

                        {/* Info Card */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white border border-slate-200 rounded-3xl p-8"
                        >
                            <MessageSquare className="w-12 h-12 text-red-500 mb-4" />
                            <h3 className="text-xl font-bold text-slate-900 mb-2">
                                Quick Response
                            </h3>
                            <p className="text-slate-600 leading-relaxed">
                                Our dedicated team typically responds within 2-4 hours during business hours.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Map Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-20"
                >
                    <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden">
                        <div className="p-8 bg-slate-900 text-white">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold">Visit Our Showroom</h3>
                                    <p className="text-slate-400">123 Auto Street, New York, NY 10001</p>
                                </div>
                            </div>
                        </div>
                        <div className="h-96 bg-slate-100 flex items-center justify-center">

                                    <iframe
                                        className={"w-full h-full border-none"}
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3307.205665920275!2d71.57800377555479!3d34.01293141980532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38d93d7b32e9b495%3A0xb847191c9c31f982!2sHashtnagri%20Rd%2C%20Hashtnagri%2C%20Peshawar%2C%20Pakistan!5e0!3m2!1sen!2s!4v1760175473466!5m2!1sen!2s"
                                         allowFullScreen=""
                                        referrerPolicy="no-referrer-when-downgrade">
                                    </iframe>
                        </div>
                    </div>
                </motion.div>
            </div>

            <Cart/>
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
                </div>
            }/>
        </div>
    );
};

export default ContactPage;
