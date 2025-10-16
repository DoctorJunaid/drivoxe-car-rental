
import {createSlice} from "@reduxjs/toolkit";
import  car1 from '../assets/car-images/image1.webp';
import  car2 from '../assets/car-images/image2.webp';
import  car3 from '../assets/car-images/image3.webp';
import  car4 from '../assets/car-images/image4.webp';
import  car5 from '../assets/car-images/image5.webp';
import  car6 from '../assets/car-images/image6.webp';
import  car7 from '../assets/car-images/image7.webp';
import  car8 from '../assets/car-images/image8.webp';
import  car9 from '../assets/car-images/image9.webp';
import  car10 from '../assets/car-images/image10.webp';
import  car11 from '../assets/car-images/image11.webp';
import  car12 from '../assets/car-images/image12.webp';
import  car13 from '../assets/car-images/image13.webp';
import {useState} from "react";



const initialState = {
    cars: [
        {
            "id": 1,
            "name": "Horizon Mirage Convertible",
            "price": 49,
            "carPrice": 180544,
            "image": car1,
            "description": "Experience the ultimate open-top driving pleasure with the Horizon Mirage Convertible. This sleek sports car combines luxury and performance in a stunning package.",
            "rating": 3,
            "reviews": 5,
            "features": [
                "2.0L Turbocharged Engine",
                "8-Speed Automatic Transmission",
                "Leather Interior",
                "Heated Seats",
                "Premium Sound System",
                "Sunroof"
            ],
            "specs": {
                "engine": "2.0L Turbocharged",
                "horsepower": "250 HP",
                "topSpeed": "240 km/h",
                "fuelEfficiency": "12 L/100km",
                "drivetrain": "Rear-Wheel Drive",
                "weight": "1500 kg",
                "transmission": "Automatic",
                "seats": 4,
                "fuelType": "Gasoline"
            },
            "modes": ["Eco", "Sport", "Comfort"]
        },
        {
            "id": 2,
            "name": "Zephyr A4 Stratos",
            "price": 79,
            "carPrice": 235999,
            "image": car2,
            "description": "The Zephyr A4 Stratos delivers exceptional performance with its aerodynamic design and powerful engine. Perfect for those who crave speed and precision.",
            "rating": 4,
            "reviews": 12,
            "features": [
                "3.0L V6 Engine",
                "6-Speed Manual Transmission",
                "Carbon Fiber Body",
                "Performance Brakes",
                "Driver-Adjustable Suspension",
                "Digital Dashboard"
            ],
            "specs": {
                "engine": "3.0L V6",
                "horsepower": "350 HP",
                "topSpeed": "280 km/h",
                "fuelEfficiency": "10 L/100km",
                "drivetrain": "All-Wheel Drive",
                "weight": "1700 kg",
                "transmission": "Manual",
                "seats": 2,
                "fuelType": "Gasoline"
            },
            "modes": ["Normal", "Sport", "Track"]
        },
        {
            "id": 3,
            "name": "Aurora X5 Nebula",
            "price": 99,
            "carPrice": 325000,
            "image": car3,
            "description": "A futuristic electric vehicle that redefines luxury and sustainability. The Aurora X5 Nebula offers cutting-edge technology and zero emissions.",
            "rating": 5,
            "reviews": 18,
            "features": [
                "Electric Powertrain",
                "100 kWh Battery",
                "800V Charging System",
                "Autonomous Driving Mode",
                "Panoramic Roof",
                "Advanced Safety Features"
            ],
            "specs": {
                "engine": "Electric",
                "horsepower": "400 HP",
                "topSpeed": "260 km/h",
                "fuelEfficiency": "0 L/100km (Electric)",
                "drivetrain": "All-Wheel Drive",
                "weight": "2000 kg",
                "transmission": "Single Speed",
                "seats": 5,
                "fuelType": "Electric"
            },
            "modes": ["Eco", "Sport", "Auto", "Off-Road"]
        },
        {
            "id": 4,
            "name": "Vanguard CX2 Convertible",
            "price": 59,
            "carPrice": 210999,
            "image": car4,
            "description": "The Vanguard CX2 Convertible offers premium comfort and style. With its refined interior and smooth ride, it's perfect for long-distance travel.",
            "rating": 4,
            "reviews": 9,
            "features": [
                "2.5L Inline-4 Engine",
                "CVT Transmission",
                "Memory Seats",
                "Dual-Zone Climate Control",
                "Wireless Charging",
                "Lane Departure Warning"
            ],
            "specs": {
                "engine": "2.5L Inline-4",
                "horsepower": "180 HP",
                "topSpeed": "200 km/h",
                "fuelEfficiency": "7 L/100km",
                "drivetrain": "Front-Wheel Drive",
                "weight": "1400 kg",
                "transmission": "CVT",
                "seats": 4,
                "fuelType": "Gasoline"
            },
            "modes": ["Eco", "Comfort", "Snow"]
        },
        {
            "id": 5,
            "name": "Stellar Orion Hybrid",
            "price": 39,
            "carPrice": 159999,
            "image": car5,
            "description": "The Stellar Orion Hybrid combines fuel efficiency with modern styling. Ideal for urban driving and daily commutes.",
            "rating": 4,
            "reviews": 15,
            "features": [
                "1.8L Hybrid Engine",
                "CVT Transmission",
                "Regenerative Braking",
                "Hybrid Display",
                "Keyless Entry",
                "Smart Parking Assist"
            ],
            "specs": {
                "engine": "1.8L Hybrid",
                "horsepower": "140 HP",
                "topSpeed": "180 km/h",
                "fuelEfficiency": "5 L/100km",
                "drivetrain": "Front-Wheel Drive",
                "weight": "1300 kg",
                "transmission": "CVT",
                "seats": 5,
                "fuelType": "Hybrid"
            },
            "modes": ["EV", "Hybrid", "Power"]
        },
        {
            "id": 6,
            "name": "Vanguard C-Class Coupe",
            "price": 69,
            "carPrice": 245000,
            "image": car6,
            "description": "The Vanguard C-Class Coupe blends elegance with performance. Its sophisticated design and powerful engine make it stand out on the road.",
            "rating": 4,
            "reviews": 11,
            "features": [
                "2.0L Turbocharged Engine",
                "8-Speed Automatic",
                "Premium Leather Seats",
                "Bose Sound System",
                "Adaptive Cruise Control",
                "360° Camera"
            ],
            "specs": {
                "engine": "2.0L Turbocharged",
                "horsepower": "280 HP",
                "topSpeed": "250 km/h",
                "fuelEfficiency": "8 L/100km",
                "drivetrain": "Rear-Wheel Drive",
                "weight": "1600 kg",
                "transmission": "Automatic",
                "seats": 4,
                "fuelType": "Gasoline"
            },
            "modes": ["Eco", "Sport", "Comfort"]
        },
        {
            "id": 7,
            "name": "Equinox F-Eclipse",
            "price": 109,
            "carPrice": 475000,
            "image": car7,
            "description": "The Equinox F-Eclipse is a high-performance supercar that delivers breathtaking speed and handling. Experience the thrill of the open road.",
            "rating": 5,
            "reviews": 20,
            "features": [
                "6.2L V8 Engine",
                "7-Speed Dual-Clutch",
                "Carbon Ceramic Brakes",
                "Active Aerodynamics",
                "Customizable Interior",
                "Race Mode"
            ],
            "specs": {
                "engine": "6.2L V8",
                "horsepower": "600 HP",
                "topSpeed": "320 km/h",
                "fuelEfficiency": "14 L/100km",
                "drivetrain": "Rear-Wheel Drive",
                "weight": "1800 kg",
                "transmission": "Dual-Clutch",
                "seats": 2,
                "fuelType": "Gasoline"
            },
            "modes": ["Street", "Track", "Drift"]
        },
        {
            "id": 8,
            "name": "Radiant Solstice Automobiles",
            "price": 89,
            "carPrice": 310000,
            "image": car8,
            "description": "The Radiant Solstice combines luxury with advanced technology. Its spacious interior and innovative features provide an unparalleled driving experience.",
            "rating": 5,
            "reviews": 17,
            "features": [
                "3.5L V6 Engine",
                "8-Speed Automatic",
                "Heated & Ventilated Seats",
                "Head-Up Display",
                "Night Vision",
                "Automatic Parking"
            ],
            "specs": {
                "engine": "3.5L V6",
                "horsepower": "300 HP",
                "topSpeed": "260 km/h",
                "fuelEfficiency": "9 L/100km",
                "drivetrain": "All-Wheel Drive",
                "weight": "1900 kg",
                "transmission": "Automatic",
                "seats": 5,
                "fuelType": "Gasoline"
            },
            "modes": ["Eco", "Sport", "Comfort", "Off-Road"]
        },
        {
            "id": 9,
            "name": "Zenith Tempest",
            "price": 129,
            "carPrice": 525000,
            "image": car9,
            "description": "The Zenith Tempest is the pinnacle of automotive engineering. With its advanced safety systems and state-of-the-art technology, it's the ultimate driving machine.",
            "rating": 5,
            "reviews": 22,
            "features": [
                "4.0L Twin-Turbo V8",
                "8-Speed Automatic",
                "Adaptive Air Suspension",
                "Gesture Control",
                "360° Surround View",
                "Voice Recognition"
            ],
            "specs": {
                "engine": "4.0L Twin-Turbo V8",
                "horsepower": "550 HP",
                "topSpeed": "300 km/h",
                "fuelEfficiency": "11 L/100km",
                "drivetrain": "All-Wheel Drive",
                "weight": "2100 kg",
                "transmission": "Automatic",
                "seats": 4,
                "fuelType": "Gasoline"
            },
            "modes": ["Eco", "Sport", "Comfort", "Race", "Off-Road"]
        },
        {
            "id": 10,
            "name": "Horizon Mirage Convertible",
            "price": 59,
            "carPrice": 199999,
            "image": car10,
            "description": "Experience the ultimate open-top driving pleasure with the Horizon Mirage Convertible. This sleek sports car combines luxury and performance in a stunning package.",
            "rating": 3,
            "reviews": 5,
            "features": [
                "2.0L Turbocharged Engine",
                "8-Speed Automatic Transmission",
                "Leather Interior",
                "Heated Seats",
                "Premium Sound System",
                "Sunroof"
            ],
            "specs": {
                "engine": "2.0L Turbocharged",
                "horsepower": "250 HP",
                "topSpeed": "240 km/h",
                "fuelEfficiency": "12 L/100km",
                "drivetrain": "Rear-Wheel Drive",
                "weight": "1500 kg",
                "transmission": "Automatic",
                "seats": 4,
                "fuelType": "Gasoline"
            },
            "modes": ["Eco", "Sport", "Comfort"]
        },
        {
            "id": 11,
            "name": "Vanguard Phoenix C-Class",
            "price": 49,
            "carPrice": 185000,
            "image": car11,
            "description": "The Vanguard Phoenix C-Class offers premium comfort and style. With its refined interior and smooth ride, it's perfect for long-distance travel.",
            "rating": 4,
            "reviews": 10,
            "features": [
                "2.5L Inline-4 Engine",
                "CVT Transmission",
                "Memory Seats",
                "Dual-Zone Climate Control",
                "Wireless Charging",
                "Lane Departure Warning"
            ],
            "specs": {
                "engine": "2.5L Inline-4",
                "horsepower": "180 HP",
                "topSpeed": "200 km/h",
                "fuelEfficiency": "7 L/100km",
                "drivetrain": "Front-Wheel Drive",
                "weight": "1400 kg",
                "transmission": "CVT",
                "seats": 4,
                "fuelType": "Gasoline"
            },
            "modes": ["Eco", "Comfort", "Snow"]
        },
        {
            "id": 12,
            "name": "Apex Autos Typhoon Model 3",
            "price": 79,
            "carPrice": 255000,
            "image": car12,
            "description": "The Apex Autos Typhoon Model 3 delivers exceptional performance with its aerodynamic design and powerful engine. Perfect for those who crave speed and precision.",
            "rating": 4,
            "reviews": 13,
            "features": [
                "3.0L V6 Engine",
                "6-Speed Manual Transmission",
                "Carbon Fiber Body",
                "Performance Brakes",
                "Driver-Adjustable Suspension",
                "Digital Dashboard"
            ],
            "specs": {
                "engine": "3.0L V6",
                "horsepower": "350 HP",
                "topSpeed": "280 km/h",
                "fuelEfficiency": "10 L/100km",
                "drivetrain": "All-Wheel Drive",
                "weight": "1700 kg",
                "transmission": "Manual",
                "seats": 2,
                "fuelType": "Gasoline"
            },
            "modes": ["Normal", "Sport", "Track"]
        },
        {
            "id": 13,
            "name": "Radiant Solstice Convertible",
            "price": 59,
            "carPrice": 215000,
            "image": car13,
            "description": "The Radiant Solstice Convertible combines luxury with advanced technology. Its spacious interior and innovative features provide an unparalleled driving experience.",
            "rating": 5,
            "reviews": 16,
            "features": [
                "3.5L V6 Engine",
                "8-Speed Automatic",
                "Heated & Ventilated Seats",
                "Head-Up Display",
                "Night Vision",
                "Automatic Parking"
            ],
            "specs": {
                "engine": "3.5L V6",
                "horsepower": "300 HP",
                "topSpeed": "260 km/h",
                "fuelEfficiency": "9 L/100km",
                "drivetrain": "All-Wheel Drive",
                "weight": "1900 kg",
                "transmission": "Automatic",
                "seats": 4,
                "fuelType": "Gasoline"
            },
            "modes": ["Eco", "Sport", "Comfort", "Off-Road"]
        }
    ],

    selectedCarId : null
}
const carSlice = createSlice({
    name: "car",
    initialState,
    reducers: {
        setSelectedCarId(state, action) {
            state.selectedCarIs = action.payload;
        },

    }
});
export const {setSelectedCarId} = carSlice.actions;
export default carSlice.reducer;