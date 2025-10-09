"use client";

import React from "react";
import { AnimatedTooltip } from "@/components/ui/shadcn-io/animated-tooltip";

const people = [
    {
        id: 1,
        name: "Muhammad Faizan",
        designation: "Software Engineer",
        image:
            "src/assets/people/faizan.webp",
    },
    {
        id: 2,
        name: "Muhammad Osama",
        designation: "Certified Kubernetes Application Developer | Staff Software Engineer",
        image:
            "src/assets/people/usamaPic.webp"
    },
    {
        id: 3,
        name: "Muhammad Haseeb",
        designation: "Unemployed",
        image:
            "src/assets/people/haseeb.webp",
    },
    {
        id: 4,
        name: "Abdul Musavir",
        designation: "Video Editor",
        image:
            "src/assets/people/abdul.webp",
    }

];

export default function Tooltip() {
    return (
        <div className="flex flex-row items-center justify-center mb-10 w-full">
            <AnimatedTooltip items={people} />
        </div>
    );
}