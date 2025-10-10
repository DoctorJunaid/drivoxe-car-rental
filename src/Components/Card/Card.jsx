
import React, { useState } from 'react';
import './Card.css';
import {useDispatch, useSelector} from "react-redux";
import {addToCart} from "@/Redux/cartSlice.js";


const Card = ({ car, isSelected = false, onRentClick }) => {
    const [isHovered, setIsHovered] = useState(false);
    const dispatch = useDispatch();
    const data = useSelector((state)=> state.cart)

    return (
        <div
            className={`card ${isSelected ? 'selected' : ''} ${isHovered ? 'hovered' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => onRentClick(car.id)}
        >
            <div className="car-image-container">
                <img loading={"lazy"} src={car.image} alt={car.name} className="car-image" />
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
                        dispatch(
                            addToCart(car),
                        );
                    }}
                >
                    Add To Cart
                </button>

            </div>
        </div>
    );
};

export default Card;