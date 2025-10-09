// ParentComponent.jsx
import React, { useState } from 'react';
import Card from './Card/Card.jsx';
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

const BuySection = () => {
    const [selectedCarId, setSelectedCarId] = useState(null);
    const [currentPage , setcurrentPage ] = useState(1);
    const [cardsPerPage , setcardsPerPage ] = useState(6);


    const cars = [
            {
                "id": 1,
                "name": "Horizon Mirage Convertible",
                "price": 49,
                "image": car1
            },
            {
                "id": 2,
                "name": "Zephyr A4 Stratos",
                "price": 79,
                "image": car2
            },
            {
                "id": 3,
                "name": "Aurora X5 Nebula",
                "price": 99,
                "image": car3
            },
            {
                "id": 4,
                "name": "Vanguard CX2 Convertible",
                "price": 59,
                "image": car4
            },
            {
                "id": 5,
                "name": "Stellar Orion Hybrid",
                "price": 39,
                "image": car5
            },
            {
                "id": 6,
                "name": "Vanguard C-Class Coupe",
                "price": 69,
                "image": car6
            },
            {
                "id": 7,
                "name": "Equinox F-Eclipse",
                "price": 109,
                "image": car7
            },
            {
                "id": 8,
                "name": "Radiant Solstice Automobiles",
                "price": 89,
                "image": car8
            },
            {
                "id": 9,
                "name": "Zenith Tempest",
                "price": 129,
                "image": car9
            },
            {
                "id": 10,
                "name": "Horizon Mirage Convertible",
                "price": 59,
                "image": car10
            },
            {
                "id": 11,
                "name": "Vanguard Phoenix C-Class",
                "price": 49,
                "image": car11
            },
            {
                "id": 12,
                "name": "Apex Autos Typhoon Model 3",
                "price": 79,
                "image": car12
            },
            {
                "id": 13,
                "name": "Radiant Solstice Convertible",
                "price": 59,
                "image": car13
            },
        ];

    const handleRentClick = (id) => {
        console.log(`Renting car: ${id}`);
        setSelectedCarId(id);
    };
    // pagination
    const lastCardIndex = currentPage * cardsPerPage;
    const firstCardIndex = lastCardIndex - cardsPerPage;
    const currentCards = cars.slice(firstCardIndex, lastCardIndex);
    let pages = [];
    for (let i = 1; i <= Math.ceil(cars.length / cardsPerPage); i++) {
        pages.push(i);
    }
    return (
        <div>
            <h2 className={"text-2xl text-gray-800 mt-8 font-bold text-center "} >THE CARS</h2>
            <h1 className={"text-5xl m-10   font-semibold text-center"}>Our Impressive Fleet</h1>
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
            padding: '20px',
            maxWidth: '1200px', // Prevents the container from growing wide enough for a 4th column
            margin: '0 auto'
        }}>
            {currentCards.map((car) => (
                <Card
                    key={car.id}
                    car={car}
                    isSelected={selectedCarId === car.id}
                    onRentClick={handleRentClick}
                />
            ))}
        </div>
            <div className={"flex justify-center items-center mt-10"}>
                {pages.map((page,index) =>{
                    return (
                        <button
                            key={index}
                            className={"bg-transparent border-red-500 text-red-500 w-10 h-10 rounded-full border mr-2 hover:bg-red-500 hover:text-white cursor-pointer"}
                            onClick={() => setcurrentPage(page)}
                            disabled={currentPage === page}
                        >
                            {page}
                        </button>
                    )
                })}
            </div>

    </div>
    );
};
export default BuySection;