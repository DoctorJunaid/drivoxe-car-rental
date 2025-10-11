"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export default function ExpandableFaqs() {
    const [active, setActive] = useState(null);
    const ref = useRef(null);
    const id = useId();

    // Handle ESC + scroll lock
    useEffect(() => {
        const onKeyDown = (event) => {
            if (event.key === "Escape") setActive(null);
        };
        document.body.style.overflow = active ? "hidden" : "auto";
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [active]);

    // Handle outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) setActive(null);
        };
        if (active) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [active]);

    // FAQ Data grouped by category
    const faqData = [
        {
            category: "Booking and Reservations",
            questions: [
                {
                    id: "q1",
                    question: "How do I book a car with drivers?",
                    answer: "Booking a car is easy. Visit our website or app, select your preferred vehicle, pickup location and time, and complete the reservation process.",
                },
                {
                    id: "q2",
                    question: "Can I modify or cancel my reservation?",
                    answer: "Yes, you can modify or cancel your reservation through our app or website. Please check our cancellation policy for any applicable fees.",
                },
                {
                    id: "q3",
                    question: "What are the age requirements for renting a car?",
                    answer: "The minimum age to rent a car is typically 21 years old. However, this may vary depending on the vehicle category and location.",
                },
                {
                    id: "q4",
                    question: "Are there any hidden fees in the rental cost?",
                    answer: "No, we believe in transparent pricing. The total cost, including all taxes and fees, is shown to you before you confirm your booking.",
                },
                {
                    id: "q5",
                    question: "How can I extend my rental period?",
                    answer: "You can extend your rental period by contacting our customer support or through the 'My Bookings' section in our app. Extensions are subject to vehicle availability.",
                },
            ],
        },
        {
            category: "Car Pickup and Return",
            questions: [
                {
                    id: "q6",
                    question: "Where can I pick up my rental car?",
                    answer: "You can pick up your car from any of our designated locations, which include airports, city centers, and partner hotels. You can choose the most convenient location during booking.",
                },
                {
                    id: "q7",
                    question: "When do I need to bring for car pickup?",
                    answer: "Please bring your valid driver's license, a second form of ID (like a passport or national ID card), and the credit card used for the booking.",
                },
                {
                    id: "q8",
                    question: "What's the process for returning the car?",
                    answer: "Simply return the vehicle to the agreed-upon drop-off location at the end of your rental period. Our staff will conduct a quick inspection and finalize the return.",
                },
                {
                    id: "q9",
                    question: "Can I return the car after business hours?",
                    answer: "Yes, many of our locations offer after-hours drop-off services. Please check the specific location's policy or contact us for details.",
                },
                {
                    id: "q10",
                    question: "Do you offer one-way rentals?",
                    answer: "Yes, we offer one-way rentals. Additional fees may apply depending on the drop-off location.",
                },
            ],
        },
        {
            category: "Payment and Billing",
            questions: [
                {
                    id: "q11",
                    question: "What payment methods are accepted?",
                    answer: "We accept all major credit cards, including Visa, MasterCard, and American Express. Some locations may also accept debit cards.",
                },
                {
                    id: "q12",
                    question: "Is a security deposit required?",
                    answer: "Yes, a security deposit is required to cover any potential damages. The amount is fully refundable upon the safe return of the vehicle.",
                },
                {
                    id: "q13",
                    question: "How is the rental cost calculated?",
                    answer: "The rental cost is calculated based on the daily or hourly rate of the vehicle, the rental duration, and any additional services you've selected.",
                },
                {
                    id: "q14",
                    question: "Can I use my own insurance for the rental?",
                    answer: "In most cases, you can use your own insurance. Please provide proof of coverage that meets our minimum requirements at the time of pickup.",
                },
                {
                    id: "q15",
                    question: "What if I have a question about my billing statement?",
                    answer: "Our customer service team is here to help. Contact us with your booking details, and we will be happy to clarify any charges.",
                },
            ],
        },
        {
            category: "Additional Services",
            questions: [
                {
                    id: "q16",
                    question: "Do you offer child safety seats?",
                    answer: "Yes, we offer child safety seats for various age groups. You can add them to your reservation during the booking process.",
                },
                {
                    id: "q17",
                    question: "Can I add an additional driver to the rental?",
                    answer: "Yes, you can add additional drivers. They must be present at the time of pickup and meet the same age and license requirements as the primary driver.",
                },
                {
                    id: "q18",
                    question: "Do you offer GPS navigation systems?",
                    answer: "Yes, GPS navigation systems are available as an add-on to help you navigate with ease. You can request one when you book your car.",
                },
                {
                    id: "q19",
                    question: "When should I dial in case of an accident or a breakdown?",
                    answer: "In case of an emergency, please immediately contact our 24/7 roadside assistance. You'll find the number in your rental agreement.",
                },
                {
                    id: "q20",
                    question: "Are you own By any organization?",
                    answer: "NO , The Owner of this website Muhammad Junaid ",
                },
            ],
        },
    ];

    return (
        <>
            {/* Background overlay */}
            <AnimatePresence>
                {active && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0  bg-black/70 z-10"
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {active && (
                    <div className="fixed inset-0 flex items-center justify-center z-[100] px-4">
                        <motion.div
                            layoutId={`card-${active.title}-${id}`}
                            ref={ref}
                            className="w-full max-w-[500px] bg-white dark:bg-neutral-900 rounded-2xl shadow-lg overflow-hidden"
                        >
                            <div className="p-6 space-y-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <motion.h3
                                            layoutId={`title-${active.title}-${id}`}
                                            className="font-bold  dark:text-neutral-200 text-lg md:text-3xl text-red-500"
                                        >
                                            {active.title}
                                        </motion.h3>
                                        <motion.p
                                            layoutId={`description-${active.description}-${id}`}
                                            className="text-sm md:text-xl text-neutral-600 dark:text-neutral-400 mb-4"
                                        >
                                            {active.description}
                                        </motion.p>
                                    </div>

                                    <motion.button
                                        onClick={() => setActive(null)}
                                        className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                                    >
                                        <CloseIcon />
                                    </motion.button>
                                </div>

                                <motion.div
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed"
                                >
                                    {typeof active.content === "function"
                                        ? active.content()
                                        : active.content}
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* FAQ Section */}
            <div className="max-w-6xl mx-auto w-full px-4 mt-12 space-y-12">
                {faqData.map((category, index) => (
                    <div key={index}>
                        {/* Category Title */}
                        <h2 className="text-2xl font-bold text-red-500 dark:text-white mb-6 text-center md:text-3xl md:text-left">
                            {category.category}
                        </h2>

                        {/* 2-column responsive grid */}
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr">
                            {category.questions.map((q) => (
                                <motion.div
                                    layoutId={`card-${q.question}-${id}`}
                                    key={q.id}
                                    onClick={() =>
                                        setActive({
                                            title: q.question,
                                            description: category.category,
                                            content: () => <p className={"md:text-2xl"}>{q.answer}</p>,
                                        })
                                    }
                                    className="p-5 flex flex-col justify-between bg-white hover:bg-gray-100 dark:bg-neutral-800
                             shadow-sm hover:shadow-md rounded-xl cursor-pointer
                             transition h-full"
                                >
                                    <div className="flex flex-col gap-2 text-center sm:text-left ">
                                        <motion.h3
                                            layoutId={`title-${q.question}-${id}`}
                                            className="font-semibold text-neutral-800 dark:text-neutral-200 text-base md:text-2xl"
                                        >
                                            {q.question}
                                        </motion.h3>

                                    </div>

                                    <motion.button
                                        layoutId={`button-${q.question}-${id}`}
                                        className="mt-4 px-4 py-2 text-sm md:text-xl rounded-full font-semibold
                               bg-gray-100 hover:bg-red-500 hover:text-white
                               text-black transition self-center sm:self-start"
                                    >
                                        Read Answer
                                    </motion.button>
                                </motion.div>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </>
    );
}

// Close button icon
export const CloseIcon = () => (
    <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-black dark:text-white"
    >
        <path d="M18 6L6 18M6 6l12 12" />
    </motion.svg>
);
