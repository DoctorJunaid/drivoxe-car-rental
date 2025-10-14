import React from 'react'
import {Route, Routes} from "react-router-dom";
import Home from "./Pages/Home.jsx";
import CarDetails from "@/Pages/CarDetails.jsx";
import ScrollToTop from "@/Components/ScrollToTop.jsx";
import Cars from "@/Pages/Cars.jsx";
import CartPage from "@/Pages/CartPage.jsx";
import ContactPage from "@/Pages/ContactPage.jsx";
import Faqs from "@/Pages/Faqs.jsx";
import About from "@/Pages/About.jsx";
import NotFound from "@/Pages/NotFound.jsx";
import { ReactLenis } from 'lenis/react'
import Login from "@/Pages/LoginScreen.jsx";


const App = () => {
    return (
        <ReactLenis 
            root 
            options={{ 
                lerp: 0.05,
                duration: 1.2,
                smoothWheel: true,
                smoothTouch: false,
                wheelMultiplier: 1,
                touchMultiplier: 2,
                infinite: false,
            }}
        >
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cars" element={<Cars />} />
                <Route path={`cars/:id`} element={<CarDetails />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/faqs" element={<Faqs />} />
                <Route path="/about" element={<About />} />
                <Route path="/signup" element={<Login />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </ReactLenis>
    )
}
export default <App></App>