// Card.jsx
import React, { useState } from 'react';
import './Card.css';

const Card = ({ car, isSelected = false, onRentClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={`card ${isSelected ? 'selected' : ''} ${isHovered ? 'hovered' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => onRentClick(car.id)} // Optional: make whole card clickable
        >
            <div className="car-image-container">
                <img src={car.image} alt={car.name} className="car-image" />
            </div>
            <div className="card-content">
                <h3 className="car-name">{car.name}</h3>
                <div className="price-info">
                    <span className="price-label">Starting at</span>
                    <span className="price-amount">${car.price}/day</span>
                </div>
                <button
                    className="rent-button"
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering card click
                        onRentClick(car.id);
                    }}
                >
                    Rent
                </button>
            </div>
        </div>
    );
};

export default Card;