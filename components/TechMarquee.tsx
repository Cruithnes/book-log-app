"use client";
import Marquee from "react-fast-marquee";


const technologies = [
    { name: "Next.js", icon: "/tech/nextjs.svg" },
    { name: "Tailwind CSS", icon: "/tech/tailwind.svg" },
    { name: "Prisma", icon: "/tech/prisma.svg" },
    { name: "PostgreSQL", icon: "/tech/postgresql.svg" },
    { name: "Shadcn UI", icon: "/tech/shadcn.svg" },
    { name: "React", icon: "/tech/react.svg" },
];

export default function TechMarquee() {
    return (
        <div className="w-full py-6 border-y bg-muted">
            <Marquee gradient={false} speed={40} pauseOnHover>
                {technologies.map((tech, idx) => (
                    <div key={idx} className="flex items-center gap-2 mx-6">
                        <img
                            src={tech.icon}
                            alt={tech.name}
                            className="w-6 h-6 object-contain"
                        />
                        <span className="text-sm text-muted-foreground">{tech.name}</span>
                    </div>
                ))}
            </Marquee>
        </div>
    );
}
