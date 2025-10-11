import React from 'react'
import {Route, Routes} from "react-router-dom";
import Home from "./Pages/Home.jsx";
import CarDetails from "@/Pages/CarDetails.jsx";
import ScrollToTop from "@/Components/ScrollToTop.jsx";
import Cars from "@/Pages/Cars.jsx";
import CartPage from "@/Pages/CartPage.jsx";
import ContactPage from "@/Pages/ContactPage.jsx";

const App = () => {
    return (
        <div>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cars" element={<Cars />} />
                <Route path={`cars/:id`} element={<CarDetails />} />
                <Route path="/cart" element={<CartPage />} />

                {/*<Route path="/services" element={<Services />} />*/}
                {/*<Route path="/pricing" element={<Pricing />} />*/}
                {/*<Route path="/about" element={<About />} />*/}
                {/*<Route path="/login" element={<Login />} />*/}
                {/*<Route path="/signup" element={<Signup />} />*/}
                <Route path="/contact" element={<ContactPage />} />
            </Routes>
        </div>
    )
}
export default App
