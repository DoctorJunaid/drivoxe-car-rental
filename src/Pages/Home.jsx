import React, { useState, useEffect } from 'react';
import Navbar from "../Components/Navbar.jsx";
import Hero from "@/Components/Hero.jsx";
import Carousal from "@/Components/Carousal.jsx";
import BuySection from "@/Components/BuySection.jsx";

// A simple utility to get the base image URL

const Home = () => {


    return (
        <div>
            <Navbar />
            <Hero />
            <Carousal />
            <BuySection />


        </div>
    );
};

export default Home;