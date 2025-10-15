import React, { useState, useEffect } from 'react';
import { User, ShoppingBag, Settings, Lock, MapPin, CreditCard, Bell, ChevronLeft, Search, Edit2, Trash2, Plus, Menu, X, Save, X as XIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

export default function Profile() {
    const [activeTab, setActiveTab] = useState('account');
    const [showMobileMenu, setShowMobileMenu] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const [searchQuery, setSearchQuery] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // State for user data
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phone: '',
        avatar: 'https://via.placeholder.com/200x200/cccccc/999999?text=USER',
        addresses: [],
        paymentMethods: [],
        orders: []
    });

    // State for form modals
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

    // Initialize user data from demo data
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
    }, []);

    // Handle window resize
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
        if (isMobile) {
            setShowMobileMenu(false);
        }
    };

    const handleBackToMenu = () => {
        setShowMobileMenu(true);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
        setShowMobileMenu(!showMobileMenu);
    };

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
            isDefault: userData.addresses.length === 0 // Make first address default
        };

        setUserData(prev => ({
            ...prev,
            addresses: [...prev.addresses, addressToAdd]
        }));

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

    // Handle deleting an address
    const handleDeleteAddress = (id) => {
        setUserData(prev => ({
            ...prev,
            addresses: prev.addresses.filter(address => address.id !== id)
        }));
    };

    // Handle setting default address
    const handleSetDefaultAddress = (id) => {
        setUserData(prev => ({
            ...prev,
            addresses: prev.addresses.map(address => ({
                ...address,
                isDefault: address.id === id
            }))
        }));
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
            isDefault: userData.paymentMethods.length === 0 // Make first payment method default
        };

        setUserData(prev => ({
            ...prev,
            paymentMethods: [...prev.paymentMethods, paymentToAdd]
        }));

        setShowPaymentForm(false);
        setNewPaymentMethod({
            type: 'Visa',
            last4: '',
            expiry: '',
            name: userData.name || ''
        });
    };

    // Handle deleting a payment method
    const handleDeletePaymentMethod = (id) => {
        setUserData(prev => ({
            ...prev,
            paymentMethods: prev.paymentMethods.filter(method => method.id !== id)
        }));
    };

    // Handle setting default payment method
    const handleSetDefaultPaymentMethod = (id) => {
        setUserData(prev => ({
            ...prev,
            paymentMethods: prev.paymentMethods.map(method => ({
                ...method,
                isDefault: method.id === id
            }))
        }));
    };

    const renderOrderHistory = () => (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
                {isMobile && (
                    <button
                        onClick={handleBackToMenu}
                        className="flex items-center gap-2 text-gray-600 hover:text-[#fd3b3b] transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        <span className="font-medium">Back</span>
                    </button>
                )}
                <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-1">Order History</h2>
                    <p className="text-gray-500 text-sm">Track and manage your past orders</p>
                </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                    type="text"
                    placeholder="Search by Order ID or Vehicle..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fd3b3b] focus:border-transparent transition-all"
                />
            </div>

            {/* Orders List */}
            <div className="space-y-4">
                {userData.orders.map((order, index) => (
                    <div
                        key={order.id}
                        className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-lg transition-all duration-300"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="font-bold text-lg">{order.id || 'N/A'}</span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                        (order.status === 'Completed' || order.status === 'Delivered')
                                            ? 'bg-emerald-50 text-emerald-600'
                                            : 'bg-amber-50 text-amber-600'
                                    }`}>
                    {order.status || 'N/A'}
                  </span>
                                </div>
                                <p className="text-gray-500 text-sm">{order.date || 'N/A'}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-bold text-[#fd3b3b]">{order.amount || '$0.00'}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 border-y border-gray-100">
                            <div>
                                <p className="text-gray-500 text-xs mb-1 uppercase tracking-wide">Vehicle</p>
                                <p className="font-semibold text-gray-900">{order.car || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 text-xs mb-1 uppercase tracking-wide">Type</p>
                                <p className="font-semibold text-gray-900">{order.type || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 text-xs mb-1 uppercase tracking-wide">Duration</p>
                                <p className="font-semibold text-gray-900">{order.duration || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 text-xs mb-1 uppercase tracking-wide">Tracking</p>
                                <p className="font-semibold text-gray-900 text-sm">{order.trackingNumber || 'N/A'}</p>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-4">
                            <button className="flex-1 px-4 py-3 bg-[#fd3b3b] text-white rounded-xl font-semibold hover:bg-[#e02f2f] transition-all hover:shadow-md">
                                View Details
                            </button>
                            <button className="px-4 py-3 border-2 border-gray-200 rounded-xl font-semibold hover:border-[#fd3b3b] hover:text-[#fd3b3b] transition-all">
                                Invoice
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderAccountSettings = () => (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
                {isMobile && (
                    <button
                        onClick={handleBackToMenu}
                        className="flex items-center gap-2 text-gray-600 hover:text-[#fd3b3b] transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        <span className="font-medium">Back</span>
                    </button>
                )}
                <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-1">Account Settings</h2>
                    <p className="text-gray-500 text-sm">Manage your personal information</p>
                </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-6 text-gray-900">Personal Information</h3>
                <div className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                            <input
                                type="text"
                                defaultValue={userData.name}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fd3b3b] focus:border-transparent focus:bg-white transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                            <input
                                type="email"
                                defaultValue={userData.email}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fd3b3b] focus:border-transparent focus:bg-white transition-all"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                            <input
                                type="tel"
                                defaultValue={userData.phone}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fd3b3b] focus:border-transparent focus:bg-white transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth</label>
                            <input
                                type="date"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fd3b3b] focus:border-transparent focus:bg-white transition-all"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Driver's License Number</label>
                        <input
                            type="text"
                            placeholder="Enter your license number"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fd3b3b] focus:border-transparent focus:bg-white transition-all"
                        />
                    </div>
                </div>
                <div className="flex justify-end mt-8">
                    <button className="px-8 py-3 bg-[#fd3b3b] text-white rounded-xl font-semibold hover:bg-[#e02f2f] transition-all hover:shadow-lg">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );

    const renderManagePassword = () => (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
                {isMobile && (
                    <button
                        onClick={handleBackToMenu}
                        className="flex items-center gap-2 text-gray-600 hover:text-[#fd3b3b] transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        <span className="font-medium">Back</span>
                    </button>
                )}
                <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-1">Manage Password</h2>
                    <p className="text-gray-500 text-sm">Keep your account secure</p>
                </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <div className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
                        <input
                            type="password"
                            placeholder="Enter current password"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fd3b3b] focus:border-transparent focus:bg-white transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                        <input
                            type="password"
                            placeholder="Enter new password"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fd3b3b] focus:border-transparent focus:bg-white transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
                        <input
                            type="password"
                            placeholder="Confirm new password"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fd3b3b] focus:border-transparent focus:bg-white transition-all"
                        />
                    </div>
                </div>
                <div className="mt-6 p-5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                    <p className="text-sm font-bold text-gray-800 mb-3">Password Requirements:</p>
                    <ul className="text-sm text-gray-600 space-y-2">
                        <li className="flex items-start gap-2">
                            <span className="text-[#fd3b3b] font-bold">•</span>
                            <span>At least 8 characters long</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-[#fd3b3b] font-bold">•</span>
                            <span>Include uppercase and lowercase letters</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-[#fd3b3b] font-bold">•</span>
                            <span>Include at least one number</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-[#fd3b3b] font-bold">•</span>
                            <span>Include at least one special character</span>
                        </li>
                    </ul>
                </div>
                <div className="flex justify-end mt-8">
                    <button className="px-8 py-3 bg-[#fd3b3b] text-white rounded-xl font-semibold hover:bg-[#e02f2f] transition-all hover:shadow-lg">
                        Update Password
                    </button>
                </div>
            </div>
        </div>
    );

    const renderAddresses = () => (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
                {isMobile && (
                    <button
                        onClick={handleBackToMenu}
                        className="flex items-center gap-2 text-gray-600 hover:text-[#fd3b3b] transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        <span className="font-medium">Back</span>
                    </button>
                )}
                <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-1">Addresses</h2>
                    <p className="text-gray-500 text-sm">Manage delivery and billing addresses</p>
                </div>
                <button
                    onClick={handleAddAddress}
                    className="flex items-center gap-2 px-4 py-2.5 bg-[#fd3b3b] text-white rounded-xl font-semibold hover:bg-[#e02f2f] transition-all hover:shadow-md"
                >
                    <Plus className="w-5 h-5" />
                    <span className="hidden sm:inline">Add</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userData.addresses.map((address) => (
                    <div key={address.id} className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-lg transition-all duration-300">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-2">
                <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-bold">
                  {address.type || 'Address'}
                </span>
                                {address.isDefault && (
                                    <span className="px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg text-sm font-bold">
                    Default
                  </span>
                                )}
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                    <Edit2 className="w-4 h-4 text-gray-600" />
                                </button>
                                <button
                                    onClick={() => handleDeleteAddress(address.id)}
                                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 className="w-4 h-4 text-[#fd3b3b]" />
                                </button>
                            </div>
                        </div>
                        <div className="space-y-2 mb-4">
                            <p className="font-bold text-gray-900">{address.name || 'N/A'}</p>
                            <p className="text-gray-600 text-sm">{address.street || 'N/A'}</p>
                            <p className="text-gray-600 text-sm">{address.city || 'N/A'}, {address.state || 'N/A'} {address.zip || 'N/A'}</p>
                            <p className="text-gray-600 text-sm">{address.phone || 'N/A'}</p>
                        </div>
                        {!address.isDefault && (
                            <button
                                onClick={() => handleSetDefaultAddress(address.id)}
                                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl font-semibold hover:border-[#fd3b3b] hover:text-[#fd3b3b] transition-all"
                            >
                                Set as Default
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );

    const renderPaymentMethods = () => (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
                {isMobile && (
                    <button
                        onClick={handleBackToMenu}
                        className="flex items-center gap-2 text-gray-600 hover:text-[#fd3b3b] transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        <span className="font-medium">Back</span>
                    </button>
                )}
                <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-1">Payment Methods</h2>
                    <p className="text-gray-500 text-sm">Manage your saved payment methods</p>
                </div>
                <button
                    onClick={handleAddPaymentMethod}
                    className="flex items-center gap-2 px-4 py-2.5 bg-[#fd3b3b] text-white rounded-xl font-semibold hover:bg-[#e02f2f] transition-all hover:shadow-md"
                >
                    <Plus className="w-5 h-5" />
                    <span className="hidden sm:inline">Add</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userData.paymentMethods.map((method) => (
                    <div key={method.id} className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-lg transition-all duration-300">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-9 bg-gradient-to-br from-[#fd3b3b] to-[#ff6b6b] rounded-lg flex items-center justify-center shadow-md">
                                    <CreditCard className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900">{method.type || 'Card'} •••• {method.last4 || '0000'}</p>
                                    <p className="text-sm text-gray-500">Exp {method.expiry || 'N/A'}</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                    <Edit2 className="w-4 h-4 text-gray-600" />
                                </button>
                                <button
                                    onClick={() => handleDeletePaymentMethod(method.id)}
                                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 className="w-4 h-4 text-[#fd3b3b]" />
                                </button>
                            </div>
                        </div>
                        {method.isDefault && (
                            <span className="inline-block px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg text-sm font-bold mb-3">
                Default
              </span>
                        )}
                        <p className="text-gray-600 mb-4 font-medium">{method.name || 'N/A'}</p>
                        {!method.isDefault && (
                            <button
                                onClick={() => handleSetDefaultPaymentMethod(method.id)}
                                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl font-semibold hover:border-[#fd3b3b] hover:text-[#fd3b3b] transition-all"
                            >
                                Set as Default
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );

    const renderNotifications = () => (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
                {isMobile && (
                    <button
                        onClick={handleBackToMenu}
                        className="flex items-center gap-2 text-gray-600 hover:text-[#fd3b3b] transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        <span className="font-medium">Back</span>
                    </button>
                )}
                <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-1">Notifications</h2>
                    <p className="text-gray-500 text-sm">Manage your notification preferences</p>
                </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <div className="space-y-5">
                    <div className="flex items-center justify-between py-4 border-b border-gray-100">
                        <div>
                            <p className="font-bold text-gray-900">Email Notifications</p>
                            <p className="text-sm text-gray-500 mt-1">Receive email updates about your bookings</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#fd3b3b] shadow-inner"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between py-4 border-b border-gray-100">
                        <div>
                            <p className="font-bold text-gray-900">SMS Notifications</p>
                            <p className="text-sm text-gray-500 mt-1">Get text messages for important updates</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#fd3b3b] shadow-inner"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between py-4 border-b border-gray-100">
                        <div>
                            <p className="font-bold text-gray-900">Promotional Emails</p>
                            <p className="text-sm text-gray-500 mt-1">Receive special offers and deals</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#fd3b3b] shadow-inner"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between py-4">
                        <div>
                            <p className="font-bold text-gray-900">Push Notifications</p>
                            <p className="text-sm text-gray-500 mt-1">Receive push notifications on your device</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#fd3b3b] shadow-inner"></div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );

    const tabs = [
        { id: 'account', label: 'Account Settings', icon: Settings },
        { id: 'orders', label: 'Order History', icon: ShoppingBag },
        { id: 'password', label: 'Security', icon: Lock },
        { id: 'addresses', label: 'Addresses', icon: MapPin },
        { id: 'payment', label: 'Payment Methods', icon: CreditCard },
        { id: 'notifications', label: 'Notifications', icon: Bell },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-gray-900">DRIVOXE</h1>
                        <div className="flex items-center gap-3">
                            <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-xl">
                                {userData.avatar && (
                                    <img
                                        src={userData.avatar}
                                        alt={userData.name || 'User'}
                                        className="w-8 h-8 rounded-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.src = 'https://via.placeholder.com/200x200/cccccc/999999?text=USER';
                                        }}
                                    />
                                )}
                                <span className="font-semibold text-sm text-gray-900">{userData.name || 'User'}</span>
                            </div>
                            <button
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
                                onClick={toggleMobileMenu}
                            >
                                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Sidebar - Desktop */}
                    <div className="hidden lg:block lg:col-span-1">
                        <div className="bg-white rounded-2xl p-6 border border-gray-200 sticky top-24 shadow-sm">
                            {/* Profile Section */}
                            <div className="text-center mb-6 pb-6 border-b border-gray-200">
                                {userData.avatar && (
                                    <img
                                        src={userData.avatar}
                                        alt={userData.name || 'User'}
                                        className="w-20 h-20 rounded-full mx-auto mb-3 object-cover ring-4 ring-gray-100"
                                        onError={(e) => {
                                            e.currentTarget.src = 'https://via.placeholder.com/200x200/cccccc/999999?text=USER';
                                        }}
                                    />
                                )}
                                <h2 className="text-lg font-bold mb-1 text-gray-900">{userData.name || 'User'}</h2>
                                <p className="text-gray-500 text-sm mb-0.5">{userData.email || 'N/A'}</p>
                                <p className="text-gray-500 text-sm">{userData.phone || 'N/A'}</p>
                            </div>

                            {/* Navigation Tabs */}
                            <nav className="space-y-2">
                                {tabs.map((tab) => {
                                    const Icon = tab.icon;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => handleTabChange(tab.id)}
                                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-semibold ${
                                                activeTab === tab.id
                                                    ? 'bg-[#fd3b3b] text-white shadow-lg shadow-red-200'
                                                    : 'text-gray-700 hover:bg-gray-50'
                                            }`}
                                        >
                                            <Icon className="w-5 h-5" />
                                            <span className="text-sm">{tab.label}</span>
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {isMobile && showMobileMenu && (
                        <div className="lg:hidden col-span-1">
                            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                                {/* Profile Section */}
                                <div className="text-center mb-6 pb-6 border-b border-gray-200">
                                    {userData.avatar && (
                                        <img
                                            src={userData.avatar}
                                            alt={userData.name || 'User'}
                                            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-gray-100"
                                            onError={(e) => {
                                                e.currentTarget.src = 'https://via.placeholder.com/200x200/cccccc/999999?text=USER';
                                            }}
                                        />
                                    )}
                                    <h2 className="text-xl font-bold mb-2 text-gray-900">{userData.name || 'User'}</h2>
                                    <p className="text-gray-500 text-sm mb-1">{userData.email || 'N/A'}</p>
                                    <p className="text-gray-500 text-sm">{userData.phone || 'N/A'}</p>
                                </div>

                                {/* Navigation Grid */}
                                <div className="grid grid-cols-2 gap-3">
                                    {tabs.map((tab) => {
                                        const Icon = tab.icon;
                                        return (
                                            <button
                                                key={tab.id}
                                                onClick={() => handleTabChange(tab.id)}
                                                className="flex flex-col items-center gap-3 p-4 rounded-xl border-2 border-gray-200 hover:border-[#fd3b3b] hover:bg-red-50 transition-all duration-300"
                                            >
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#fd3b3b] to-[#ff6b6b] flex items-center justify-center shadow-md">
                                                    <Icon className="w-6 h-6 text-white" />
                                                </div>
                                                <span className="text-sm font-bold text-gray-900 text-center leading-tight">
                          {tab.label}
                        </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Main Content - Desktop always visible, Mobile only when menu is hidden */}
                    {(!isMobile || !showMobileMenu) && (
                        <div className="lg:col-span-3">
                            {activeTab === 'account' && renderAccountSettings()}
                            {activeTab === 'orders' && renderOrderHistory()}
                            {activeTab === 'password' && renderManagePassword()}
                            {activeTab === 'addresses' && renderAddresses()}
                            {activeTab === 'payment' && renderPaymentMethods()}
                            {activeTab === 'notifications' && renderNotifications()}
                        </div>
                    )}
                </div>
            </div>

            {/* Address Form Modal */}
            <AnimatePresence>
                {showAddressForm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4"
                        onClick={() => setShowAddressForm(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-gray-900">Add New Address</h3>
                                <motion.button
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setShowAddressForm(false)}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <XIcon className="w-5 h-5 text-gray-500" />
                                </motion.button>
                            </div>

                            <motion.div 
                                className="space-y-4"
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    visible: {
                                        transition: {
                                            staggerChildren: 0.05
                                        }
                                    }
                                }}
                            >
                                <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
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
                                </motion.div>

                                <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        value={newAddress.name}
                                        onChange={(e) => setNewAddress({...newAddress, name: e.target.value})}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fd3b3b] focus:border-transparent focus:bg-white transition-all"
                                        placeholder="Enter full name"
                                    />
                                </motion.div>

                                <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Street Address</label>
                                    <input
                                        type="text"
                                        value={newAddress.street}
                                        onChange={(e) => setNewAddress({...newAddress, street: e.target.value})}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fd3b3b] focus:border-transparent focus:bg-white transition-all"
                                        placeholder="Enter street address"
                                    />
                                </motion.div>

                                <motion.div 
                                    className="grid grid-cols-2 gap-4"
                                    variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
                                >
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
                                </motion.div>

                                <motion.div 
                                    className="grid grid-cols-2 gap-4"
                                    variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
                                >
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
                                </motion.div>
                            </motion.div>

                            <motion.div 
                                className="flex gap-3 mt-6"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setShowAddressForm(false)}
                                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl font-semibold hover:border-gray-300 transition-all"
                                >
                                    Cancel
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={submitNewAddress}
                                    className="flex-1 px-4 py-3 bg-[#fd3b3b] text-white rounded-xl font-semibold hover:bg-[#e02f2f] transition-all hover:shadow-lg"
                                >
                                    Save Address
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Payment Method Form Modal */}
            <AnimatePresence>
                {showPaymentForm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4"
                        onClick={() => setShowPaymentForm(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-gray-900">Add New Payment Method</h3>
                                <motion.button
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setShowPaymentForm(false)}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <XIcon className="w-5 h-5 text-gray-500" />
                                </motion.button>
                            </div>

                            <motion.div 
                                className="space-y-4"
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    visible: {
                                        transition: {
                                            staggerChildren: 0.05
                                        }
                                    }
                                }}
                            >
                                <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
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
                                </motion.div>

                                <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Card Number</label>
                                    <input
                                        type="text"
                                        value={newPaymentMethod.last4}
                                        onChange={(e) => setNewPaymentMethod({...newPaymentMethod, last4: e.target.value})}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fd3b3b] focus:border-transparent focus:bg-white transition-all"
                                        placeholder="Enter last 4 digits"
                                        maxLength="4"
                                    />
                                </motion.div>

                                <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Expiry Date</label>
                                    <input
                                        type="text"
                                        value={newPaymentMethod.expiry}
                                        onChange={(e) => setNewPaymentMethod({...newPaymentMethod, expiry: e.target.value})}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fd3b3b] focus:border-transparent focus:bg-white transition-all"
                                        placeholder="MM/YY"
                                        maxLength="5"
                                    />
                                </motion.div>

                                <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Name on Card</label>
                                    <input
                                        type="text"
                                        value={newPaymentMethod.name}
                                        onChange={(e) => setNewPaymentMethod({...newPaymentMethod, name: e.target.value})}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fd3b3b] focus:border-transparent focus:bg-white transition-all"
                                        placeholder="Enter name on card"
                                    />
                                </motion.div>
                            </motion.div>

                            <motion.div 
                                className="flex gap-3 mt-6"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.25 }}
                            >
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setShowPaymentForm(false)}
                                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl font-semibold hover:border-gray-300 transition-all"
                                >
                                    Cancel
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={submitNewPaymentMethod}
                                    className="flex-1 px-4 py-3 bg-[#fd3b3b] text-white rounded-xl font-semibold hover:bg-[#e02f2f] transition-all hover:shadow-lg"
                                >
                                    Save Payment Method
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.4s ease-out;
                }
            `}</style>
        </div>
    );
}