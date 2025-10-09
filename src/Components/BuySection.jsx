// ParentComponent.jsx
import React, { useState } from 'react';
import Card from './Card/Card.jsx';

const BuySection = () => {
    const [selectedCarId, setSelectedCarId] = useState(null);
    const [currentPage , setcurrentPage ] = useState(1);
    const [cardsPerPage , setcardsPerPAge ] = useState(6);


    const cars = [
            {
                "id": 1,
                "name": "Horizon Mirage Convertible",
                "price": 49,
                "image": "https://via.placeholder.com/300x200?text=Horizon+Mirage"
            },
            {
                "id": 2,
                "name": "Zephyr A4 Stratos",
                "price": 79,
                "image": "https://via.placeholder.com/300x200?text=Zephyr+A4+Stratos"
            },
            {
                "id": 3,
                "name": "Aurora X5 Nebula",
                "price": 99,
                "image": "https://via.placeholder.com/300x200?text=Aurora+X5+Nebula"
            },
            {
                "id": 4,
                "name": "Vanguard CX2 Convertible",
                "price": 59,
                "image": "https://via.placeholder.com/300x200?text=Vanguard+CX2"
            },
            {
                "id": 5,
                "name": "Stellar Orion Hybrid",
                "price": 39,
                "image": "https://via.placeholder.com/300x200?text=Stellar+Orion"
            },
            {
                "id": 6,
                "name": "Vanguard C-Class Coupe",
                "price": 69,
                "image": "https://via.placeholder.com/300x200?text=Vanguard+C-Class"
            },
            {
                "id": 7,
                "name": "Vanguard X-Class Coupe",
                "price": 89,
                "image": "https://via.placeholder.com/300x200?text=Vanguard+X-Class"
            },
            {
                "id": 8,
                "name": "Apex GT Sport",
                "price": 85,
                "image": "https://via.placeholder.com/300x200?text=Apex+GT+Sport"
            },
            {
                "id": 9,
                "name": "Nova EV Cruiser",
                "price": 45,
                "image": "https://via.placeholder.com/300x200?text=Nova+EV+Cruiser"
            },
            {
                "id": 10,
                "name": "Titan XR SUV",
                "price": 110,
                "image": "https://via.placeholder.com/300x200?text=Titan+XR+SUV"
            },
            {
                "id": 11,
                "name": "Phantom Shadow Coupe",
                "price": 129,
                "image": "https://via.placeholder.com/300x200?text=Phantom+Shadow"
            },
            {
                "id": 12,
                "name": "Sentinel Voyager",
                "price": 75,
                "image": "https://via.placeholder.com/300x200?text=Sentinel+Voyager"
            },
            {
                "id": 13,
                "name": "Vortex R-Line Sedan",
                "price": 62,
                "image": "https://via.placeholder.com/300x200?text=Vortex+R-Line"
            },
            {
                "id": 14,
                "name": "Quantum Bolt EV",
                "price": 55,
                "image": "https://via.placeholder.com/300x200?text=Quantum+Bolt+EV"
            },
            {
                "id": 15,
                "name": "Velocity Stratus",
                "price": 95,
                "image": "https://via.placeholder.com/300x200?text=Velocity+Stratus"
            },
            {
                "id": 16,
                "name": "Zenith Apex Hybrid",
                "price": 48,
                "image": "https://via.placeholder.com/300x200?text=Zenith+Apex"
            },
            {
                "id": 17,
                "name": "Echo Drive Sedan",
                "price": 35,
                "image": "https://via.placeholder.com/300x200?text=Echo+Drive+Sedan"
            },
            {
                "id": 18,
                "name": "Pulse GT Roadster",
                "price": 105,
                "image": "https://via.placeholder.com/300x200?text=Pulse+GT+Roadster"
            },
            {
                "id": 19,
                "name": "Striker Fury Sport",
                "price": 92,
                "image": "https://via.placeholder.com/300x200?text=Striker+Fury"
            },
            {
                "id": 20,
                "name": "Raider Nomad SUV",
                "price": 88,
                "image": "https://via.placeholder.com/300x200?text=Raider+Nomad+SUV"
            },
            {
                "id": 21,
                "name": "Comet Celestial",
                "price": 77,
                "image": "https://via.placeholder.com/300x200?text=Comet+Celestial"
            },
            {
                "id": 22,
                "name": "Pulsar ZL1 Coupe",
                "price": 135,
                "image": "https://via.placeholder.com/300x200?text=Pulsar+ZL1"
            },
            {
                "id": 23,
                "name": "Orion Skybrid Hybrid",
                "price": 52,
                "image": "https://via.placeholder.com/300x200?text=Orion+Skybrid"
            },
            {
                "id": 24,
                "name": "Nebula X Electric",
                "price": 68,
                "image": "https://via.placeholder.com/300x200?text=Nebula+X+Electric"
            },
            {
                "id": 25,
                "name": "Galaxy Runner",
                "price": 59,
                "image": "https://via.placeholder.com/300x200?text=Galaxy+Runner"
            },
            {
                "id": 26,
                "name": "Cosmos Interstellar",
                "price": 149,
                "image": "https://via.placeholder.com/300x200?text=Cosmos+Interstellar"
            },
            {
                "id": 27,
                "name": "Terra Rover SUV",
                "price": 99,
                "image": "https://via.placeholder.com/300x200?text=Terra+Rover+SUV"
            },
            {
                "id": 28,
                "name": "Aqua Marine Convertible",
                "price": 79,
                "image": "https://via.placeholder.com/300x200?text=Aqua+Marine"
            },
            {
                "id": 29,
                "name": "Ignis Blaze Hatchback",
                "price": 42,
                "image": "https://via.placeholder.com/300x200?text=Ignis+Blaze"
            },
            {
                "id": 30,
                "name": "Solstice Flare Coupe",
                "price": 89,
                "image": "https://via.placeholder.com/300x200?text=Solstice+Flare"
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
    for ( let i = 1; i <= Math.ceil(cars.length / cardsPerPage); i++) {
        pages.push(i);

    }
    return (
        <div>
            <h2 className={"text-2xl text-gray-800 mt-8 font-bold text-center "} >THE CARS</h2>
            <h1 className={"text-5xl m-10   font-semibold text-center"}>Our Impressive Fleet</h1>
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 2fr))',
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