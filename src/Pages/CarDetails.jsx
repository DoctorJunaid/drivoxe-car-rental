import React, { useState } from 'react';
import { Heart, Share2, Star } from 'lucide-react';
import {useSelector} from "react-redux";
import {useParams} from "react-router";
import Navbar from "@/Components/Navbar.jsx";
import Footer from "@/Components/Footer.jsx";

const CarDetails = () => {
    const {id} = useParams();
    const cars = useSelector((state)=> state.car.cars);

   const car = cars.find(e=> e.id === parseInt(id));
    if (!car) {
        return <h2 className="text-center text-red-500 mt-10">Car not found!</h2>;
    }

    return (
        <div className="min-h-screen bg-white">
          <Navbar />
            {/* Breadcrumb */}
            <div className="px-8 py-4 text-sm text-slate-600 bg-slate-50">
                HOME / CAR DETAILS / {car.name}
            </div>
            {/* Main Content */}
            <div className="px-8 py-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-8">Car Details</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Side - Images */}
                    <div>
                        {/* Main Image */}
                        <div className="bg-gradient-to-br from-slate-100 to-white rounded-2xl p-8 mb-4 shadow-lg">
                            <img
                                src={car.image}
                                alt={car.name}
                                className="w-full h-80 object-contain"
                            />
                        </div>

                    {/* Right Side - Details */}
                    <div>
                        {/* Title and Price */}
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="text-3xl font-bold text-slate-900 mb-2">{car.name}</h3>
                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        <span className="font-semibold text-slate-900">{car.rating}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-3xl font-bold text-slate-900">${car.price}</p>
                                <p className="text-sm text-slate-600">/day</p>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-slate-600 mb-6 leading-relaxed">
                            {car.description}
                        </p>


                        {/* Specifications */}
                        <div className="mb-8">
                            <h4 className="font-bold text-slate-900 mb-4 text-lg">SPECIFICATIONS</h4>
                            <div className="grid grid-cols-2 gap-4">

                                    <div className="flex justify-between items-center py-3 border-b border-slate-200">
                                        <span className="text-slate-600 text-sm">{car.specs.engine}</span>
                                        <span className="text-slate-600 text-sm">{car.specs.horsepower}</span>
                                        <span className="text-slate-600 text-sm">{car.specs.topSpeed}</span>
                                        <span className="text-slate-600 text-sm">{car.specs.fuelEfficiency}</span>
                                        <span className="font-semibold text-slate-900 text-sm">{car.specs.drivetrain}</span>
                                        <span className="font-semibold text-slate-900 text-sm">{car.specs.weight}</span>
                                    </div>
                            </div>
                        </div>

                        {/* Available Colors */}
                        <div>
                            <h4 className="font-bold text-slate-900 mb-3 text-sm">AVAILABLE</h4>
                            <div className="flex gap-3">
                                <button className="w-8 h-8 rounded-full bg-red-500 ring-2 ring-offset-2 ring-red-500"></button>
                                <button className="w-8 h-8 rounded-full bg-slate-800 hover:ring-2 hover:ring-offset-2 hover:ring-slate-800 transition"></button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Car Features Section */}
                <div className="mt-16">
                    <h3 className="text-2xl font-bold text-slate-900 mb-8">Car Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {car.features.map((feature, index) => (
                            <div key={index} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition">
                                <h4 className="font-bold text-slate-900 mb-3">{feature}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
        </div>
    );
};

export default CarDetails;