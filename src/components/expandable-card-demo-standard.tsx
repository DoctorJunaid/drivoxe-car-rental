"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export default function ExpandableFaqs() {
    const [active, setActive] = useState(null);
    const ref = useRef(null);
    const id = useId();

    useEffect(() => {
        function onKeyDown(event) {
            if (event.key === "Escape") {
                setActive(false);
            }
        }

        if (active && typeof active === "object") {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [active]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setActive(null);
            }
        }

        if (active) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [active]);

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
                    question: "Are pets allowed in the rental cars?",
                    answer: "Pets are allowed in our vehicles, but we require them to be kept in a carrier. A cleaning fee may apply if the car is returned with excessive pet hair or dirt.",
                },
            ],
        },
    ];

    // Transform faqData into cards format
    const cards = faqData.flatMap((category) =>
        category.questions.map((q) => ({
            title: q.question,
            description: category.category,
            src: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=500&q=80",
            ctaText: "Read Answer",
            ctaLink: "#",
            content: () => <p>{q.answer}</p>,
        }))
    );

    return (
        <>
            <AnimatePresence>
                {active && typeof active === "object" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/20 h-full w-full z-10"
                    />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {active && typeof active === "object" ? (
                    <div className="fixed inset-0  grid place-items-center z-[100]">
                        <motion.button
                            key={`button-${active.title}-${id}`}
                            layout
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                            }}
                            exit={{
                                opacity: 0,
                                transition: {
                                    duration: 0.05,
                                },
                            }}
                            className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
                            onClick={() => setActive(null)}
                        >
                            <CloseIcon />
                        </motion.button>
                        <motion.div
                            layoutId={`card-${active.title}-${id}`}
                            ref={ref}
                            className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
                        >
                            <motion.div layoutId={`image-${active.title}-${id}`}>
                                <img
                                    width={200}
                                    height={200}
                                    src={active.src}
                                    alt={active.title}
                                    className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                                />
                            </motion.div>

                            <div>
                                <div className="flex justify-between items-start p-4">
                                    <div className="">
                                        <motion.h3
                                            layoutId={`title-${active.title}-${id}`}
                                            className="font-bold text-neutral-700 dark:text-neutral-200"
                                        >
                                            {active.title}
                                        </motion.h3>
                                        <motion.p
                                            layoutId={`description-${active.description}-${id}`}
                                            className="text-neutral-600 dark:text-neutral-400"
                                        >
                                            {active.description}
                                        </motion.p>
                                    </div>

                                    <motion.a
                                        layoutId={`button-${active.title}-${id}`}
                                        href={active.ctaLink}
                                        target="_blank"
                                        className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                                    >
                                        {active.ctaText}
                                    </motion.a>
                                </div>
                                <div className="pt-4 relative px-4">
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                                    >
                                        {typeof active.content === "function"
                                            ? active.content()
                                            : active.content}
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                ) : null}
            </AnimatePresence>
            <ul className="max-w-2xl mx-auto w-full gap-4">
                {cards.map((card, index) => (
                    <motion.div
                        layoutId={`card-${card.title}-${id}`}
                        key={`card-${card.title}-${id}`}
                        onClick={() => setActive(card)}
                        className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
                    >
                        <div className="flex gap-4 flex-col md:flex-row ">
                            <motion.div layoutId={`image-${card.title}-${id}`}>
                                <img
                                    width={100}
                                    height={100}
                                    src={card.src}
                                    alt={card.title}
                                    className="h-40 w-40 md:h-14 md:w-14 rounded-lg object-cover object-top"
                                />
                            </motion.div>
                            <div className="">
                                <motion.h3
                                    layoutId={`title-${card.title}-${id}`}
                                    className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left"
                                >
                                    {card.title}
                                </motion.h3>
                                <motion.p
                                    layoutId={`description-${card.description}-${id}`}
                                    className="text-neutral-600 dark:text-neutral-400 text-center md:text-left"
                                >
                                    {card.description}
                                </motion.p>
                            </div>
                        </div>
                        <motion.button
                            layoutId={`button-${card.title}-${id}`}
                            className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black mt-4 md:mt-0"
                        >
                            {card.ctaText}
                        </motion.button>
                    </motion.div>
                ))}
            </ul>
        </>
    );
}

export const CloseIcon = () => {
    return (
        <motion.svg
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            exit={{
                opacity: 0,
                transition: {
                    duration: 0.05,
                },
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-black"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M18 6l-12 12" />
            <path d="M6 6l12 12" />
        </motion.svg>
    );
};