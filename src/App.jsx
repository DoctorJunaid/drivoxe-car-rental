import React from 'react'
import Navbar from "./Components/Navbar.jsx";
import {Route, Routes} from "react-router";
import Home from "./Pages/Home.jsx";

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                {/*<Route path="/services" element={<Services />} />*/}
                {/*<Route path="/car" element={<Car />} />*/}
                {/*<Route path="/pricing" element={<Pricing />} />*/}
                {/*<Route path="/about" element={<About />} />*/}
                {/*<Route path="/login" element={<Login />} />*/}
                {/*<Route path="/signup" element={<Signup />} />*/}
                {/*<Route path="/contact" element={<Contact />} />*/}
            </Routes>
        </div>
    )
}
export default App
