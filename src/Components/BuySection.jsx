// ParentComponent.jsx
import React, { useState } from 'react';
import Card from './Card/Card.jsx';

const BuySection = () => {
    const [selectedCarId, setSelectedCarId] = useState(null);
    const [currentPage , setcurrentPage ] = useState(1);
    const [cardsPerPage , setcardsPerPage ] = useState(6);


    const cars = [
            {
                "id": 1,
                "name": "Horizon Mirage Convertible",
                "price": 49,
                "image": "src/assets/car-images/image1.webp"
            },
            {
                "id": 2,
                "name": "Zephyr A4 Stratos",
                "price": 79,
                "image": "src/assets/car-images/image2.webp"
            },
            {
                "id": 3,
                "name": "Aurora X5 Nebula",
                "price": 99,
                "image": "src/assets/car-images/image3.webp"
            },
            {
                "id": 4,
                "name": "Vanguard CX2 Convertible",
                "price": 59,
                "image": "src/assets/car-images/image4.webp"
            },
            {
                "id": 5,
                "name": "Stellar Orion Hybrid",
                "price": 39,
                "image": "src/assets/car-images/image5.webp"
            },
            {
                "id": 6,
                "name": "Vanguard C-Class Coupe",
                "price": 69,
                "image": "src/assets/car-images/image6.webp"
            },
            {
                "id": 7,
                "name": "Equinox F-Eclipse",
                "price": 109,
                "image": "src/assets/car-images/image7.webp"
            },
            {
                "id": 8,
                "name": "Radiant Solstice Automobiles",
                "price": 89,
                "image": "src/assets/car-images/image8.webp"
            },
            {
                "id": 9,
                "name": "Zenith Tempest",
                "price": 129,
                "image": "src/assets/car-images/image9.webp"
            },
            {
                "id": 10,
                "name": "Horizon Mirage Convertible",
                "price": 59,
                "image": "src/assets/car-images/image10.webp"
            },
            {
                "id": 11,
                "name": "Vanguard Phoenix C-Class",
                "price": 49,
                "image": "src/assets/car-images/image11.webp"
            },
            {
                "id": 12,
                "name": "Apex Autos Typhoon Model 3",
                "price": 79,
                "image": "src/assets/car-images/image12.webp"
            },
            {
                "id": 13,
                "name": "Radiant Solstice Convertible",
                "price": 59,
                "image": "src/assets/car-images/image13.webp"
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