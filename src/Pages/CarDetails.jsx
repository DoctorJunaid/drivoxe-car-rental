import React, { useState } from 'react';
import { Star, Calendar, CreditCard, MapPin, Users, Fuel, Gauge } from 'lucide-react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router";
import Navbar from "@/Components/Navbar.jsx";
import Footer from "@/Components/Footer.jsx";
import {Link} from "react-router-dom";
import Cart from "@/Components/Cart.jsx";
import {addToCart} from "@/Redux/cartSlice.js";
import carDetailsFooter from "@/assets/carDetailsFooter.webp";
import {toast} from "react-toastify";
const CarDetails = () => {
    const dispatch = useDispatch()
    const { id } = useParams();
    const cars = useSelector((state) => state.car.cars);
    const navigate = useNavigate();
    const currentUser  = useSelector((state)=> state.userInfo.currentUser)

    const car = cars.find(e => e.id === parseInt(id));
    if (!car) {
        return <h2 className="text-center text-red-500 mt-10">Car not found!</h2>;
    }

    // State for button animations
    const [rentHovered, setRentHovered] = useState(false);
    const [buyHovered, setBuyHovered] = useState(false);


    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    const rentCar = (e) => {
        if(!currentUser || !currentUser.email) {
           toast.error("please log in first")
            return ;

        }
        dispatch(
            addToCart({
                userEmail: currentUser.email, 
                item: {
                    ...car,
                    purchaseType: "rent",
                    rentalDays: 1,
                    rentPerDay: car.price
                }
            }),
        );
        navigate('/cart')
    }
    const buyCar = (e) => {
        if(!currentUser || !currentUser.email) {
            toast.error("please log in first")
            return ;

        }
        dispatch(
            addToCart({
                userEmail: currentUser.email, 
                item: {
                    ...car,
                    purchaseType: "buy",
                    quantity: 1,
                    carPrice: car.carPrice || car.price * 30 // Assuming car price is 30x daily rate if not set
                }
            }),
        );
        navigate('/cart')
    }
    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <div className="px-4 sm:px-8 py-4 text-sm text-slate-600 bg-slate-50 border-b border-slate-200">
                <div className="max-w-7xl mx-auto"><Link to={"/"}>HOME</Link> / CAR DETAILS / {car.name.toUpperCase()}</div>
            </div>


            <div className="px-4 sm:px-8 py-8 max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-slate-900 mb-8">Car Details</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Left Side - Images */}
                    <div className="space-y-6">
                        {/* Main Image */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                            <img
                                src={car.image}
                                alt={car.name}
                                className="w-full h-64 sm:h-80 object-contain transition-transform duration-500 hover:scale-150"
                            />
                        </div>
                    </div>

                    {/* Right Side - Details */}
                    <div className="space-y-6">
                        {/* Title and Price */}
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                            <div>
                                <h3 className="text-3xl font-bold text-slate-900 mb-2">{car.name}</h3>
                                <div className="flex  gap-2 mb-4 items-center">
                                    <div className="flex items-center gap-1 justify-center">
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        <span className="font-semibold text-slate-900 ">{car.rating}</span>
                                        <span className="text-slate-500">({car.reviews} reviews)</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-3xl font-bold text-slate-900">${formatPrice(car.price)}</p>
                                <p className="text-sm text-slate-600">/day</p>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-slate-700 leading-relaxed">
                            {car.description}
                        </p>

                        {/* Action Buttons - Positioned to the right like in reference */}
                        <div className="flex   sm:justify-start gap-4 pt-4">
                         <button
                                className={`flex items-center justify-center gap-2 py-3 px-6 rounded-full font-bold text-white shadow-md transition-all duration-300 transform ${
                                    rentHovered ? 'scale-[1.02]  -translate-y-2 cursor-pointer' : 'scale-100'
                                } bg-red-500 hover:bg-red-600`}
                                onMouseEnter={() => setRentHovered(true)}
                                onMouseLeave={() => setRentHovered(false)}
                                onClick={(e) => rentCar(car.id)}
                            >
                                <Calendar className="w-4 h-4" />
                                Rent Now
                            </button>

                     <button
                                className={`flex items-center justify-center gap-2 py-3 px-6 rounded-full font-bold text-white shadow-md transition-all duration-300 transform ${
                                    buyHovered ? 'scale-[1.02] -translate-y-1 cursor-pointer' : 'scale-100'
                                } bg-red-500 hover:bg-red-600`}
                                onMouseEnter={() => setBuyHovered(true)}
                                onMouseLeave={() => setBuyHovered(false)}
                                onClick={(e) => buyCar(car.id)}
                            >
                                <CreditCard className="w-4 h-4" />
                                Buy Now
                            </button>
                    </div>

                        {/* Key Features */}
                        <div className="grid grid-cols-2 gap-4 pt-4">
                            <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200">
                                <div className="p-2 bg-red-100 rounded-lg">
                                    <Users className="w-5 h-5 text-red-600" />
                                </div>
                                <div>
                                    <p className="text-slate-500 text-sm">Seats</p>
                                    <p className="font-semibold text-slate-900">{car.specs.seats}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200">
                                <div className="p-2 bg-red-100 rounded-lg">
                                    <Fuel className="w-5 h-5 text-red-600" />
                                </div>
                                <div>
                                    <p className="text-slate-500 text-sm">Fuel</p>
                                    <p className="font-semibold text-slate-900">{car.specs.fuelType}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200">
                                <div className="p-2 bg-red-100 rounded-lg">
                                    <Gauge className="w-5 h-5 text-red-600" />
                                </div>
                                <div>
                                    <p className="text-slate-500 text-sm">Engine</p>
                                    <p className="font-semibold text-slate-900">{car.specs.engine}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200">
                                <div className="p-2 bg-red-100 rounded-lg">
                                    <MapPin className="w-5 h-5 text-red-600" />
                                </div>
                                <div>
                                    <p className="text-slate-500 text-sm">Location</p>
                                    <p className="font-semibold text-slate-900">New York</p>
                                </div>
                            </div>
                        </div>

                        {/* Specifications */}
                        <div className="bg-white rounded-xl p-3 border border-slate-200">
                            <h4 className="font-bold text-slate-900 mb-4 text-lg">Specifications</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-3">
                                    <div className="flex justify-between py-2 border-b border-slate-100">
                                        <span className="text-slate-600 text-sm">Horsepower</span>
                                        <span className="font-semibold text-slate-900 text-sm">{car.specs.horsepower}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-slate-100">
                                        <span className="text-slate-600 text-sm">Top Speed</span>
                                        <span className="font-semibold text-slate-900 text-sm">{car.specs.topSpeed}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-slate-100">
                                        <span className="text-slate-600 text-sm">Drivetrain</span>
                                        <span className="font-semibold text-slate-900 text-sm">{car.specs.drivetrain}</span>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between py-2 border-b border-slate-100">
                                        <span className="text-slate-600 text-sm">Fuel Efficiency</span>
                                        <span className="font-semibold text-slate-900 text-sm">{car.specs.fuelEfficiency}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-slate-100">
                                        <span className="text-slate-600 text-sm">Weight</span>
                                        <span className="font-semibold text-slate-900 text-sm">{car.specs.weight}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-slate-100">
                                        <span className="text-slate-600 text-sm">Transmission</span>
                                        <span className="font-semibold text-slate-900 text-sm">{car.specs.transmission}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modes*/}
                        <div className="bg-white rounded-xl p-6 border border-slate-200">
                            <h4 className="font-bold text-slate-900 mb-4">Available Modes</h4>
                            <div className="flex gap-3">
                                {
                                    car.modes.map((mode, index) => (
                                        <button key={index} className="border px-4 py-3 rounded-2xl border-red-400 hover:bg-red-100 hover:bg-red-500 transition-all duration-300">{mode}</button>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>

                {/* Car Features Section */}
                <div className="mt-16">
                    <h3 className="text-2xl font-bold text-slate-900 mb-8">Car Features</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {car.features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md transition-all duration-300 hover:border-slate-300"
                            >
                                <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    {feature}
                                </h4>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Cart />

            {/* Footer */}
            <Footer children={
                <div className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-[24px] sm:rounded-[32px] lg:rounded-[40px] overflow-hidden mb-8 lg:mb-12">
                    <div className="relative w-full min-h-[280px] sm:min-h-[320px] lg:min-h-[350px]">
                        <div className="absolute inset-0 w-full h-full ">
                            <img
                                src={carDetailsFooter}
                                alt="Red Sports Car"
                                className="w-full h-full object-cover object-center"
                                style={{ objectPosition: '60% center' }}
                            />


                        </div>

                        {/* Content Overlay - Top Right */}
                        <div className="relative z-20 h-full flex flex-col  justify-center   items-center gap-10 px-6 py-8 sm:py-10 lg:px-12 lg:py-16">
                            <div className="w-full sm:w-[55%] lg:w-[50%]">
                                <h3 className="text-3xl font-semibold  mb-2 text-white text-center">Book Your Adventure Today and Feel the Power of the Open Road.</h3>

                            </div>

                            <div className="flex flex-wrap gap-3 lg:gap-4 justify-start">
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-full
                                    hover:scale-105 transition-transform duration-300 shadow-md
                                    text-sm sm:text-base lg:text-lg cursor-pointer"
                                >
                                    Let’s Drive with Us
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

            } />
        </div>
    );
};

export default CarDetails;