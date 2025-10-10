import React, { useState, useEffect } from 'react';
import Navbar from "../Components/Navbar.jsx";
import Hero from "@/Components/Hero.jsx";
import Carousal from "@/Components/Carousal.jsx";
import BuySection from "@/Components/BuySection.jsx";
import AnimatedTestimonialsData from "@/Components/AnimatedTestimonialsData.jsx";
import Footer from "@/Components/Footer.jsx";
import Cart from "@/Components/Cart.jsx";
import ShoppingCartButton from "@/Components/Cart.jsx";


// A simple utility to get the base image URL

const Home = () => {


    return (
        <div>
            <Navbar />
            <Hero />
            <Carousal />
            <BuySection />
            <AnimatedTestimonialsData />
            <Footer />
            <ShoppingCartButton />
        </div>
    );
};

export default Home;