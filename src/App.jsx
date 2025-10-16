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
import Profile from "@/Pages/Profile.jsx";
import Checkout from "@/Pages/Checkout.jsx";
import PrivateRoutes from "@/Routes/privateRoutes.jsx";
import PublicRoutes from "@/Routes/PublicRoutes.jsx";
import {ToastContainer, Zoom} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
    return (
        <ReactLenis 
            root 
            options={{
                duration: 2.5,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                smoothTouch: true,
                wheelMultiplier: 1.5,
                touchMultiplier: 2,
                infinite: false,
            }}
        >
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cars" element={<Cars />} />
                <Route path={`cars/:id`} element={<CarDetails />} />
                <Route path="/faqs" element={<Faqs />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/login" element={
                    <PublicRoutes>
                    <Login />
                    </PublicRoutes>
                } />

                <Route path="/cart" element={
                    <PrivateRoutes>
                    <CartPage />
                    </PrivateRoutes>
                } />
                <Route path="/profile" element={
                    <PrivateRoutes>
                    <Profile />
                    </PrivateRoutes>
                } />
                <Route path="/checkout" element={
                    <PrivateRoutes>
                        <Checkout />
                    </PrivateRoutes>
                } />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <ToastContainer
                position="top-center"
                autoClose={1000}
                limit={3}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
                theme="light"
                transition={Zoom}
            />
        </ReactLenis>
    )
}
export default App;