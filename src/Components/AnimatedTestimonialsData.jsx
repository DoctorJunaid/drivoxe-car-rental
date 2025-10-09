import { AnimatedTestimonials } from "@/components/ui/shadcn-io/animated-testimonials";

const testimonials = [
    {
        quote:
            "Rented a car just to teach my students what real success looks like. Now half my class wants to become car dealers. Smooth ride, though—I almost attend meetings while driving!",
        name: "Muhammad Osama",
        designation: "Certified Kubernetes Application Developer | Staff Software Engineer",
        src: "src/assets/people/usamaPic.webp",
    },
    {
        quote:
            "Still jobless, but rolling like a CEO. Rented a car for a day and suddenly everyone started calling me Sir Haseeb. If confidence had wheels, it would be this ride!",
        name: "Muhammad Haseeb",
        designation: "Unemployed",
        src: "src/assets/people/haseeb.webp",
    },
    {
        quote:
            "Got a family discount from my brother — best deal of my life! I don’t even have a license, but I took 20 selfies pretending I bought it. Influencer life activated 🚗📸.",
        name: "Muhammad Faizan",
        designation: "Engineering Lead at DataPro",
        src: "src/assets/people/faizan.webp",
    },
    {
        quote:
            "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
        name: "Abdul Musavir",
        designation: "video editor",
        src: "src/assets/people/abdul.webp",
    },
];

export default function AnimatedTestimonialsData() {
    return <AnimatedTestimonials testimonials={testimonials} />;
}