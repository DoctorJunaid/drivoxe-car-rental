import React from 'react';
import logoSrc1 from "../assets/Logo1.svg";
import logoSrc2 from "../assets/Logo2.svg";
import logoSrc3 from "../assets/Logo3.svg";
import logoSrc4 from "../assets/Logo4.svg";
import logoSrc5 from "../assets/Logo5.svg";
import logoSrc6 from "../assets/Logo6.svg";

const Carousel = () => {
    const logos = [
        { src: logoSrc1, alt: "Company Logo 1" },
        { src: logoSrc2, alt: "Company Logo 2" },
        { src: logoSrc3, alt: "Company Logo 3" },
        { src: logoSrc4, alt: "Company Logo 4" },
        { src: logoSrc5, alt: "Company Logo 5" },
        { src: logoSrc6, alt: "Company Logo 6" },
        { src: logoSrc1, alt: "Company Logo 1" },
        { src: logoSrc2, alt: "Company Logo 2" },
        { src: logoSrc3, alt: "Company Logo 3" },
        { src: logoSrc4, alt: "Company Logo 4" },
        { src: logoSrc5, alt: "Company Logo 5" },
        { src: logoSrc6, alt: "Company Logo 6" },
    ];

    const extendedLogos = [...logos, ...logos];

    return (
        <div
            className="w-full p-20  inline-flex flex-nowrap overflow-hidden
                       [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
            {/* The custom CSS class is used here */}
            <ul
                className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none
                           animate-scroll-css"
            >
                {extendedLogos.map((logo, index) => (
                    <li key={index}>
                        <img src={logo.src} alt={logo.alt} className="h-15 w-auto" />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Carousel;