    import React, { useState } from "react";
    import {Trash2, Plus, Minus, ShoppingBag, ArrowLeft, CreditCard, Tag, Truck, Calendar,Package,} from "lucide-react";
    import { useSelector, useDispatch } from "react-redux";
    import {Link} from "react-router-dom";
    import Navbar from "@/Components/Navbar.jsx";
    import Footer from "@/Components/Footer.jsx";
    import { removeFromCart } from "@/Redux/cartSlice.js";
    
    const CartPage = () => {
        const { cart } = useSelector((state) => state.cart);
        const dispatch = useDispatch();
    
        const [promoCode, setPromoCode] = useState("");
        const [appliedPromo, setAppliedPromo] = useState(false);
    
        const [cartItems, setCartItems] = useState(
            cart.map((item) => ({
                ...item,
                quantity: item.quantity || 1,
                rentalDays: item.rentalDays || 1,
                purchaseType: item.purchaseType || null,
                rentPerDay: item.price || 0,
            }))
        );
    
        const calculateItemTotal = (item) => {
            if (item.purchaseType === "buy") {
                return item.carPrice * item.quantity;
            } else if (item.purchaseType === "rent") {
                return item.rentPerDay * item.rentalDays;
            }
            return 0;
        };
    
        const subtotal = cartItems.reduce(
            (sum, item) => sum + calculateItemTotal(item),
            0
        );
        const tax = subtotal * 0.1;
        const discount = appliedPromo ? subtotal * 0.15 : 0;
        const total = subtotal + tax - discount;
    
        const formatPrice = (price) =>
            price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    
        const setPurchaseType = (id, type) => {
            setCartItems(
                cartItems.map((item) =>
                    item.id === id ? { ...item, purchaseType: type } : item
                )
            );
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
    
        const updateRentalDays = (id, change) => {
            setCartItems(
                cartItems.map((item) =>
                    item.id === id
                        ? { ...item, rentalDays: Math.max(1, item.rentalDays + change) }
                        : item
                )
            );
        };
    
        const removeItem = (id) => {
            dispatch(removeFromCart(id));
            setCartItems(cartItems.filter((item) => item.id !== id));
    
        };
    
        const applyPromoCode = () => {
            if (promoCode.toLowerCase() === "save15") {
                setAppliedPromo(true);
            }
        };
    
        // ✅ Empty Cart Screen
        if (cartItems.length === 0) {
            return (
                <div className="min-h-screen bg-white flex flex-col">
                    <div className="flex-1 flex items-center justify-center px-4">
                        <div className="text-center space-y-6 max-w-md">
                            <div className="flex justify-center">
                                <div className="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center">
                                    <ShoppingBag className="w-16 h-16 text-slate-400" />
                                </div>
                            </div>
                            <h2 className="text-3xl font-bold text-slate-900">
                                Your Cart is Empty
                            </h2>
                            <p className="text-slate-600">
                                Looks like you haven't added any cars yet. Start exploring our
                                impressive fleet!
                            </p>
                            <Link to={ "/cars"}  >    <button className="inline-flex items-center gap-2 px-8 py-3 bg-red-500 text-white rounded-full font-semibold hover:bg-red-600 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl">
                                <ArrowLeft className="w-5 h-5" />
                                Browse Cars
                            </button></Link>
                        </div>
                    </div>
                </div>
            );
        }
    
        // ✅ Main Cart Layout
        return (
            <div>
                <Navbar />
            <div className="min-h-screen bg-white">
                <div className="px-4 sm:px-8 py-8 max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
                            Shopping Cart
                        </h1>
                     <Link to={"/cars"}> <button className="cursor-pointer flex items-center gap-2 text-red-500 hover:text-red-600 font-medium transition-colors duration-300">
                            <ArrowLeft className="w-4 h-4" />
                            <span className="hidden sm:inline">Continue Shopping</span>
                        </button></Link>
                </div>
    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* ✅ Cart Items Section */}
                        <div className="lg:col-span-2 space-y-6">
                            {cartItems.map((item, index) => (
                                <div
                                    key={item.id}
                                    className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
                                    style={{
                                        animation: `fadeInUp 0.5s ease-out ${index * 0.1}s backwards`,
                                    }}
                                >
                                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                        <div className="w-full sm:w-40 h-32 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
    
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start gap-4 mb-2">
                                                <div>
                                                    <h3 className="text-xl font-bold text-slate-900 mb-1">
                                                        {item.name}
                                                    </h3>
                                                    <div className="flex flex-wrap gap-3 text-sm text-slate-600">
                              <span className="flex items-center gap-1">
                                <Package className="w-4 h-4" />
                                Buy: ${item.carPrice}
                              </span>
                                                        <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                Rent: ${item.rentPerDay}/day
                              </span>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300 transform hover:scale-110"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
    
                                    {/* ✅ Purchase Type */}
                                    <div className="mb-6">
                                        <label className="text-sm font-semibold text-slate-700 mb-3 block">
                                            Select Purchase Type:
                                        </label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {["buy", "rent"].map((type) => (
                                                <button
                                                    key={type}
                                                    onClick={() => setPurchaseType(item.id, type)}
                                                    className={`py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                                                        item.purchaseType === type
                                                            ? "bg-red-500 text-white shadow-lg transform scale-105"
                                                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                                    }`}
                                                >
                                                    {type === "buy" ? (
                                                        <Package className="w-5 h-5" />
                                                    ) : (
                                                        <Calendar className="w-5 h-5" />
                                                    )}
                                                    <div className="text-left">
                                                        <div className="text-sm font-bold capitalize">
                                                            {type}
                                                        </div>
                                                        <div className="text-xs opacity-90">
                                                            {type === "buy"
                                                                ? `$${(item.carPrice)}`
                                                                : `$${item.rentPerDay}/day`}
                                                        </div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
    
    
                                    {item.purchaseType && (
                                        <div className="space-y-4 p-4 bg-slate-50 rounded-xl">
                                            <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-slate-700">
                            {item.purchaseType === "buy"
                                ? "Quantity"
                                : "Rental Days"}
                              :
                          </span>
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={() =>
                                                            item.purchaseType === "buy"
                                                                ? updateQuantity(item.id, -1)
                                                                : updateRentalDays(item.id, -1)
                                                        }
                                                        disabled={
                                                            item.purchaseType === "buy"
                                                                ? item.quantity <= 1
                                                                : item.rentalDays <= 1
                                                        }
                                                        className="w-9 h-9 flex items-center justify-center bg-white border-2 border-slate-300 text-slate-700 hover:border-red-500 hover:text-red-500 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        <Minus className="w-4 h-4" />
                                                    </button>
                                                    <span className="w-12 text-center font-bold text-lg text-slate-900">
                              {item.purchaseType === "buy"
                                  ? item.quantity
                                  : item.rentalDays}
                            </span>
                                                    <button
                                                        onClick={() =>
                                                            item.purchaseType === "buy"
                                                                ? updateQuantity(item.id, 1)
                                                                : updateRentalDays(item.id, 1)
                                                        }
                                                        className="w-9 h-9 flex items-center justify-center bg-white border-2 border-slate-300 text-slate-700 hover:border-red-500 hover:text-red-500 rounded-lg transition-all duration-300"
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
    
    
                                            <div className="flex justify-between items-center pt-3 mt-2 border-t border-slate-300">
                          <span className="text-base font-bold text-slate-900">
                            Item Total:
                          </span>
                                                <span className="text-2xl font-bold text-red-500">
                            ${formatPrice(calculateItemTotal(item))}
                          </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
    
                        {/* ✅ Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white border border-slate-200 rounded-2xl p-6 sticky top-4 space-y-6">
                                <h3 className="text-xl font-bold text-slate-900">Order Summary</h3>
    
                                {/* Promo Code */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">
                                        Promo Code
                                    </label>
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
    
                                {/* Summary */}
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
                                            <span className="font-semibold">
                          -${formatPrice(discount)}
                        </span>
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
    
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold text-slate-900">Total</span>
                                    <span className="text-2xl font-bold text-red-500">
                      ${formatPrice(total)}
                    </span>
                                </div>
    
                                <button className="w-full py-3 bg-red-500 text-white rounded-full font-bold hover:bg-red-600 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                                    <CreditCard className="w-5 h-5" />
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
    
                {/* Animation */}
                <style>{`
            @keyframes fadeInUp {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
            </div>
                <Footer />
            </div>
        );
    };
    
    export default CartPage;
