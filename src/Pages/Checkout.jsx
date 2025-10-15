import React, { useState, useEffect } from 'react';
import { User, ShoppingBag, Settings, Lock, MapPin, CreditCard, Bell, ChevronLeft, Search, Edit2, Trash2, Plus, Menu, X, Save, X as XIcon, MapPin as MapPinIcon, CreditCard as CreditCardIcon, Truck, Calendar, Info } from 'lucide-react';

// Demo user data
const demoUserData = {
    name: 'John Anderson',
    email: 'john.anderson@email.com',
    phone: '+1 (555) 123-4567',
    avatar: 'https://via.placeholder.com/200x200/cccccc/999999?text=USER',
    addresses: [
        {
            id: 1,
            type: 'Home',
            name: 'John Anderson',
            street: '123 Main Street',
            city: 'New York',
            state: 'NY',
            zip: '10001',
            phone: '+1 (555) 123-4567',
            isDefault: true
        },
        {
            id: 2,
            type: 'Work',
            name: 'John Anderson',
            street: '456 Business Ave',
            city: 'New York',
            state: 'NY',
            zip: '10002',
            phone: '+1 (555) 123-4567',
            isDefault: false
        }
    ],
    paymentMethods: [
        {
            id: 1,
            type: 'Visa',
            last4: '4242',
            expiry: '12/25',
            name: 'John Anderson',
            isDefault: true
        },
        {
            id: 2,
            type: 'Mastercard',
            last4: '5678',
            expiry: '09/26',
            name: 'John Anderson',
            isDefault: false
        }
    ],
    orders: [
        {
            id: '#201799',
            date: '09/11/2023',
            car: 'BMW X5 2023',
            type: 'Rental',
            amount: '$1,092.50',
            status: 'Completed',
            duration: '3 days',
            pickupLocation: 'Manhattan, NY, 718',
            paymentMethod: 'Visa •••• 4242',
            trackingNumber: '0287374895'
        },
        {
            id: '#201798',
            date: '08/28/2023',
            car: 'Tesla Model 3',
            type: 'Rental',
            amount: '$850.00',
            status: 'Completed',
            duration: '2 days',
            pickupLocation: 'Brooklyn, NY',
            paymentMethod: 'Mastercard •••• 5678',
            trackingNumber: '0287374894'
        },
        {
            id: '#201797',
            date: '07/15/2023',
            car: 'Audi A6 2022',
            type: 'Purchase',
            amount: '$45,999.00',
            status: 'Delivered',
            duration: 'N/A',
            pickupLocation: 'Same as shipping',
            paymentMethod: 'Bank Transfer',
            trackingNumber: '0287374893'
        }
    ]
};

// Demo cart data
const demoCartData = [
    {
        id: 1,
        name: 'Premium Wheel Set',
        description: 'Aluminum alloy wheels with premium finish',
        price: 1299.99,
        quantity: 1,
        image: 'https://via.placeholder.com/100x100/cccccc/999999?text=Wheel'
    },
    {
        id: 2,
        name: 'Performance Tires',
        description: 'All-season performance tires',
        price: 499.99,
        quantity: 4,
        image: 'https://via.placeholder.com/100x100/cccccc/999999?text=Tire'
    }
];

export default function Checkout() {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phone: '',
        avatar: '',
        addresses: [],
        paymentMethods: [],
        orders: []
    });

    const [cartItems, setCartItems] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [showPaymentForm, setShowPaymentForm] = useState(false);

    // State for form data
    const [newAddress, setNewAddress] = useState({
        type: 'Home',
        name: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        phone: ''
    });

    const [newPaymentMethod, setNewPaymentMethod] = useState({
        type: 'Visa',
        last4: '',
        expiry: '',
        name: ''
    });

    // Initialize data
    useEffect(() => {
        // Simulate fetching from RTK store
        setUserData({
            name: demoUserData.name || '',
            email: demoUserData.email || '',
            phone: demoUserData.phone || '',
            avatar: demoUserData.avatar || 'https://via.placeholder.com/200x200/cccccc/999999?text=USER',
            addresses: demoUserData.addresses || [],
            paymentMethods: demoUserData.paymentMethods || [],
            orders: demoUserData.orders || []
        });

        // Set default address and payment method
        const defaultAddress = demoUserData.addresses.find(addr => addr.isDefault) || demoUserData.addresses[0];
        const defaultPayment = demoUserData.paymentMethods.find(pm => pm.isDefault) || demoUserData.paymentMethods[0];

        setSelectedAddress(defaultAddress || null);
        setSelectedPaymentMethod(defaultPayment || null);

        // Set cart items
        setCartItems(demoCartData);
    }, []);

    // Handle adding new address
    const handleAddAddress = () => {
        setShowAddressForm(true);
        setNewAddress({
            type: 'Home',
            name: userData.name || '',
            street: '',
            city: '',
            state: '',
            zip: '',
            phone: userData.phone || ''
        });
    };

    // Handle form submission for new address
    const submitNewAddress = () => {
        const addressToAdd = {
            id: Date.now(),
            ...newAddress,
            isDefault: false
        };

        setUserData(prev => ({
            ...prev,
            addresses: [...prev.addresses, addressToAdd]
        }));

        // Auto-select the new address
        setSelectedAddress(addressToAdd);

        setShowAddressForm(false);
        setNewAddress({
            type: 'Home',
            name: userData.name || '',
            street: '',
            city: '',
            state: '',
            zip: '',
            phone: userData.phone || ''
        });
    };

    // Handle adding new payment method
    const handleAddPaymentMethod = () => {
        setShowPaymentForm(true);
        setNewPaymentMethod({
            type: 'Visa',
            last4: '',
            expiry: '',
            name: userData.name || ''
        });
    };

    // Handle form submission for new payment method
    const submitNewPaymentMethod = () => {
        const paymentToAdd = {
            id: Date.now(),
            ...newPaymentMethod,
            isDefault: false
        };

        setUserData(prev => ({
            ...prev,
            paymentMethods: [...prev.paymentMethods, paymentToAdd]
        }));

        // Auto-select the new payment method
        setSelectedPaymentMethod(paymentToAdd);

        setShowPaymentForm(false);
        setNewPaymentMethod({
            type: 'Visa',
            last4: '',
            expiry: '',
            name: userData.name || ''
        });
    };

    // Calculate totals
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 49.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-gray-900">DRIVOXE</h1>
                        <div className="flex items-center gap-3">
                            <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-xl">
                                <img
                                    src={userData.avatar}
                                    alt={userData.name}
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                                <span className="font-semibold text-sm text-gray-900">{userData.name || 'User'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Checkout Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm mb-6">
                            <h2 className="text-2xl font-bold mb-6 text-gray-900">Checkout</h2>

                            {/* Cart Items */}
                            <div className="mb-8">
                                <h3 className="text-lg font-bold mb-4 text-gray-900">Order Summary</h3>
                                <div className="space-y-4">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-16 h-16 rounded-lg object-cover"
                                            />
                                            <div className="flex-1">
                                                <h4 className="font-bold text-gray-900">{item.name}</h4>
                                                <p className="text-sm text-gray-500">{item.description}</p>
                                                <p className="text-sm font-bold text-[#fd3b3b]">${item.price.toFixed(2)}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-gray-900">Qty: {item.quantity}</p>
                                                <p className="text-sm font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Shipping Address */}
                            <div className="mb-8">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-bold text-gray-900">Shipping Address</h3>
                                    <button
                                        onClick={handleAddAddress}
                                        className="flex items-center gap-2 px-3 py-1.5 text-[#fd3b3b] font-semibold hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <Plus className="w-4 h-4" />
                                        <span className="text-sm">Add</span>
                                    </button>
                                </div>

                                {selectedAddress ? (
                                    <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#fd3b3b] to-[#ff6b6b] flex items-center justify-center shadow-md">
                                                <MapPinIcon className="w-5 h-5 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <h4 className="font-bold text-gray-900">{selectedAddress.name}</h4>
                                                    {selectedAddress.isDefault && (
                                                        <span className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-bold">
                              Default
                            </span>
                                                    )}
                                                </div>
                                                <p className="text-gray-600 text-sm">{selectedAddress.street}</p>
                                                <p className="text-gray-600 text-sm">{selectedAddress.city}, {selectedAddress.state} {selectedAddress.zip}</p>
                                                <p className="text-gray-600 text-sm">{selectedAddress.phone}</p>
                                                <p className="text-gray-500 text-xs mt-2">{selectedAddress.type}</p>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="p-5 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 text-center">
                                        <p className="text-gray-500">No address selected. Please add an address.</p>
                                        <button
                                            onClick={handleAddAddress}
                                            className="mt-3 px-4 py-2 bg-[#fd3b3b] text-white rounded-lg font-semibold hover:bg-[#e02f2f] transition-colors"
                                        >
                                            Add Address
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Payment Method */}
                            <div className="mb-8">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-bold text-gray-900">Payment Method</h3>
                                    <button
                                        onClick={handleAddPaymentMethod}
                                        className="flex items-center gap-2 px-3 py-1.5 text-[#fd3b3b] font-semibold hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <Plus className="w-4 h-4" />
                                        <span className="text-sm">Add</span>
                                    </button>
                                </div>

                                {selectedPaymentMethod ? (
                                    <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#fd3b3b] to-[#ff6b6b] flex items-center justify-center shadow-md">
                                                <CreditCardIcon className="w-5 h-5 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <h4 className="font-bold text-gray-900">{selectedPaymentMethod.type} •••• {selectedPaymentMethod.last4}</h4>
                                                    {selectedPaymentMethod.isDefault && (
                                                        <span className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-bold">
                              Default
                            </span>
                                                    )}
                                                </div>
                                                <p className="text-gray-600 text-sm">Exp {selectedPaymentMethod.expiry}</p>
                                                <p className="text-gray-600 text-sm">{selectedPaymentMethod.name}</p>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="p-5 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 text-center">
                                        <p className="text-gray-500">No payment method selected. Please add a payment method.</p>
                                        <button
                                            onClick={handleAddPaymentMethod}
                                            className="mt-3 px-4 py-2 bg-[#fd3b3b] text-white rounded-lg font-semibold hover:bg-[#e02f2f] transition-colors"
                                        >
                                            Add Payment Method
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Order Summary */}
                            <div className="mb-6">
                                <h3 className="text-lg font-bold mb-4 text-gray-900">Order Summary</h3>
                                <div className="bg-gray-50 rounded-xl p-5">
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Subtotal</span>
                                            <span className="font-bold">${subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Shipping</span>
                                            <span className="font-bold">${shipping.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Tax</span>
                                            <span className="font-bold">${tax.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between pt-3 border-t border-gray-200">
                                            <span className="text-lg font-bold text-gray-900">Total</span>
                                            <span className="text-lg font-bold text-[#fd3b3b]">${total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Place Order Button */}
                            <button
                                className="w-full px-6 py-4 bg-[#fd3b3b] text-white rounded-xl font-bold text-lg hover:bg-[#e02f2f] transition-colors shadow-lg"
                                disabled={!selectedAddress || !selectedPaymentMethod}
                            >
                                Place Order
                            </button>
                        </div>
                    </div>

                    {/* Right Column - Order Details */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm sticky top-24">
                            <h3 className="text-lg font-bold mb-4 text-gray-900">Order Details</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                        <Truck className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-blue-900">Free Shipping</p>
                                        <p className="text-xs text-blue-600">Estimated delivery: 3-5 business days</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                        <Calendar className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-green-900">Easy Returns</p>
                                        <p className="text-xs text-green-600">30-day return policy</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                                        <Info className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-purple-900">Secure Payment</p>
                                        <p className="text-xs text-purple-600">Your payment is protected</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Address Form Modal */}
            {showAddressForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-gray-900">Add New Address</h3>
                            <button
                                onClick={() => setShowAddressForm(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <XIcon className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
                                <select
                                    value={newAddress.type}
                                    onChange={(e) => setNewAddress({...newAddress, type: e.target.value})}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fd3b3b] focus:border-transparent focus:bg-white transition-all"
                                >
                                    <option value="Home">Home</option>
                                    <option value="Work">Work</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    value={newAddress.name}
                                    onChange={(e) => setNewAddress({...newAddress, name: e.target.value})}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fd3b3b] focus:border-transparent focus:bg-white transition-all"
                                    placeholder="Enter full name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Street Address</label>
                                <input
                                    type="text"
                                    value={newAddress.street}
                                    onChange={(e) => setNewAddress({...newAddress, street: e.target.value})}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fd3b3b] focus:border-transparent focus:bg-white transition-all"
                                    placeholder="Enter street address"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                                    <input
                                        type="text"
                                        value={newAddress.city}
                                        onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fd3b3b] focus:border-transparent focus:bg-white transition-all"
                                        placeholder="Enter city"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">State</label>
                                    <input
                                        type="text"
                                        value={newAddress.state}
                                        onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fd3b3b] focus:border-transparent focus:bg-white transition-all"
                                        placeholder="Enter state"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">ZIP Code</label>
                                    <input
                                        type="text"
                                        value={newAddress.zip}
                                        onChange={(e) => setNewAddress({...newAddress, zip: e.target.value})}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fd3b3b] focus:border-transparent focus:bg-white transition-all"
                                        placeholder="Enter ZIP code"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                                    <input
                                        type="tel"
                                        value={newAddress.phone}
                                        onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fd3b3b] focus:border-transparent focus:bg-white transition-all"
                                        placeholder="Enter phone number"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => setShowAddressForm(false)}
                                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl font-semibold hover:border-gray-300 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={submitNewAddress}
                                className="flex-1 px-4 py-3 bg-[#fd3b3b] text-white rounded-xl font-semibold hover:bg-[#e02f2f] transition-all hover:shadow-md"
                            >
                                Save Address
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Payment Method Form Modal */}
            {showPaymentForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-gray-900">Add New Payment Method</h3>
                            <button
                                onClick={() => setShowPaymentForm(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <XIcon className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Card Type</label>
                                <select
                                    value={newPaymentMethod.type}
                                    onChange={(e) => setNewPaymentMethod({...newPaymentMethod, type: e.target.value})}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fd3b3b] focus:border-transparent focus:bg-white transition-all"
                                >
                                    <option value="Visa">Visa</option>
                                    <option value="Mastercard">Mastercard</option>
                                    <option value="American Express">American Express</option>
                                    <option value="Discover">Discover</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Card Number</label>
                                <input
                                    type="text"
                                    value={newPaymentMethod.last4}
                                    onChange={(e) => setNewPaymentMethod({...newPaymentMethod, last4: e.target.value})}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fd3b3b] focus:border-transparent focus:bg-white transition-all"
                                    placeholder="Enter last 4 digits"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Expiry Date</label>
                                <input
                                    type="text"
                                    value={newPaymentMethod.expiry}
                                    onChange={(e) => setNewPaymentMethod({...newPaymentMethod, expiry: e.target.value})}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fd3b3b] focus:border-transparent focus:bg-white transition-all"
                                    placeholder="MM/YY"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Name on Card</label>
                                <input
                                    type="text"
                                    value={newPaymentMethod.name}
                                    onChange={(e) => setNewPaymentMethod({...newPaymentMethod, name: e.target.value})}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fd3b3b] focus:border-transparent focus:bg-white transition-all"
                                    placeholder="Enter name on card"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => setShowPaymentForm(false)}
                                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl font-semibold hover:border-gray-300 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={submitNewPaymentMethod}
                                className="flex-1 px-4 py-3 bg-[#fd3b3b] text-white rounded-xl font-semibold hover:bg-[#e02f2f] transition-all hover:shadow-md"
                            >
                                Save Payment Method
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}