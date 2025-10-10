import React, { useState } from 'react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, CreditCard, Tag, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/Components/Navbar.jsx';
import Footer from '@/Components/Footer.jsx';
import { useSelector } from 'react-redux';

const CartPage = () => {
    // Mock cart items - replace with Redux state later
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: 'Horizon Mirage Convertible',
            price: 49,
            quantity: 2,
            image: useSelector((state) => state.car.cars[0]?.image) || '',
            rentalDays: 3
        },
        {
            id: 2,
            name: 'Zephyr A4 Stratos',
            price: 79,
            quantity: 1,
            image: useSelector((state) => state.car.cars[1]?.image) || '',
            rentalDays: 5
        }
    ]);

    const [promoCode, setPromoCode] = useState('');
    const [appliedPromo, setAppliedPromo] = useState(false);

    // Calculate totals
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity * item.rentalDays, 0);
    const tax = subtotal * 0.1; // 10% tax
    const discount = appliedPromo ? subtotal * 0.15 : 0; // 15% discount
    const shipping = cartItems.length > 0 ? 0 : 0; // Free shipping
    const total = subtotal + tax - discount + shipping;

    const formatPrice = (price) => {
        return price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    const updateQuantity = (id, change) => {
        setCartItems(
            cartItems.map((item) =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + change) }
                    : item
            )
        );
    };

    const removeItem = (id) => {
        setCartItems(cartItems.filter((item) => item.id !== id));
    };

    const applyPromoCode = () => {
        if (promoCode.toLowerCase() === 'save15') {
            setAppliedPromo(true);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-white flex flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center px-4">
                    <div className="text-center space-y-6 max-w-md">
                        <div className="flex justify-center">
                            <div className="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center">
                                <ShoppingBag className="w-16 h-16 text-slate-400" />
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900">Your Cart is Empty</h2>
                        <p className="text-slate-600">
                            Looks like you haven't added any cars to your cart yet. Start exploring our impressive fleet!
                        </p>
                        <Link
                            to="/cars"
                            className="inline-flex items-center gap-2 px-8 py-3 bg-red-500 text-white rounded-full font-semibold hover:bg-red-600 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Browse Cars
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* Breadcrumb */}
            <div className="px-4 sm:px-8 py-4 text-sm text-slate-600 bg-slate-50 border-b border-slate-200">
                <div className="max-w-7xl mx-auto">
                    <Link to="/">HOME</Link> / <span className="text-slate-900 font-medium">SHOPPING CART</span>
                </div>
            </div>

            <div className="px-4 sm:px-8 py-8 max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">Shopping Cart</h1>
                    <Link
                        to="/cars"
                        className="flex items-center gap-2 text-red-500 hover:text-red-600 font-medium transition-colors duration-300"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="hidden sm:inline">Continue Shopping</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((item, index) => (
                            <div
                                key={item.id}
                                className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                                style={{
                                    animation: `fadeInUp 0.5s ease-out ${index * 0.1}s backwards`
                                }}
                            >
                                <div className="flex flex-col sm:flex-row gap-4">
                                    {/* Car Image */}
                                    <div className="w-full sm:w-40 h-32 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-contain hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>

                                    {/* Item Details */}
                                    <div className="flex-1 space-y-3">
                                        <div className="flex justify-between items-start gap-4">
                                            <div>
                                                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">
                                                    {item.name}
                                                </h3>
                                                <p className="text-sm text-slate-600">
                                                    ${item.price}/day × {item.rentalDays} days
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300 transform hover:scale-110"
                                                aria-label="Remove item"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>

                                        {/* Quantity and Price */}
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-3">
                                                <span className="text-sm text-slate-600 font-medium">Quantity:</span>
                                                <div className="flex items-center gap-2 bg-slate-50 rounded-lg p-1">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, -1)}
                                                        className="w-8 h-8 flex items-center justify-center text-slate-700 hover:bg-white hover:text-red-500 rounded-md transition-all duration-300"
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <Minus className="w-4 h-4" />
                                                    </button>
                                                    <span className="w-8 text-center font-semibold text-slate-900">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, 1)}
                                                        className="w-8 h-8 flex items-center justify-center text-slate-700 hover:bg-white hover:text-red-500 rounded-md transition-all duration-300"
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Item Total */}
                                            <div className="text-right">
                                                <p className="text-2xl font-bold text-slate-900">
                                                    ${formatPrice(item.price * item.quantity * item.rentalDays)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white border border-slate-200 rounded-2xl p-6 sticky top-4 space-y-6">
                            <h3 className="text-xl font-bold text-slate-900">Order Summary</h3>

                            {/* Promo Code */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Promo Code</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Enter code"
                                        value={promoCode}
                                        onChange={(e) => setPromoCode(e.target.value)}
                                        disabled={appliedPromo}
                                        className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-slate-100"
                                    />
                                    <button
                                        onClick={applyPromoCode}
                                        disabled={appliedPromo}
                                        className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors duration-300 flex items-center gap-2"
                                    >
                                        <Tag className="w-4 h-4" />
                                        Apply
                                    </button>
                                </div>
                                {appliedPromo && (
                                    <p className="text-sm text-green-600 font-medium">
                                        ✓ Promo code applied successfully!
                                    </p>
                                )}
                            </div>

                            {/* Price Breakdown */}
                            <div className="space-y-3 py-4 border-y border-slate-200">
                                <div className="flex justify-between text-slate-700">
                                    <span>Subtotal</span>
                                    <span className="font-semibold">${formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-slate-700">
                                    <span>Tax (10%)</span>
                                    <span className="font-semibold">${formatPrice(tax)}</span>
                                </div>
                                {appliedPromo && (
                                    <div className="flex justify-between text-green-600">
                                        <span>Discount (15%)</span>
                                        <span className="font-semibold">-${formatPrice(discount)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-slate-700">
                                    <span className="flex items-center gap-1">
                                        <Truck className="w-4 h-4" />
                                        Shipping
                                    </span>
                                    <span className="font-semibold text-green-600">Free</span>
                                </div>
                            </div>

                            {/* Total */}
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-bold text-slate-900">Total</span>
                                <span className="text-2xl font-bold text-red-500">${formatPrice(total)}</span>
                            </div>

                            {/* Checkout Button */}
                            <button className="w-full py-3 bg-red-500 text-white rounded-full font-bold hover:bg-red-600 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                                <CreditCard className="w-5 h-5" />
                                Proceed to Checkout
                            </button>

                            {/* Additional Info */}
                            <div className="space-y-2 pt-4 border-t border-slate-200">
                                <div className="flex items-start gap-2 text-sm text-slate-600">
                                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-green-600 text-xs font-bold">✓</span>
                                    </div>
                                    <span>Free cancellation up to 24 hours before pickup</span>
                                </div>
                                <div className="flex items-start gap-2 text-sm text-slate-600">
                                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-green-600 text-xs font-bold">✓</span>
                                    </div>
                                    <span>24/7 customer support available</span>
                                </div>
                                <div className="flex items-start gap-2 text-sm text-slate-600">
                                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-green-600 text-xs font-bold">✓</span>
                                    </div>
                                    <span>Secure payment processing</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />

            {/* Add keyframe animation */}
            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default CartPage;
