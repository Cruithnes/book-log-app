"use client"

import Link from "next/link"
import { useState } from "react";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"


export default function Navbar() {
    const [open, setOpen] = useState(false);
    return (
        // <nav className="flex justify-center bg-amber-200 p-8">
        //     <NavigationMenu viewport={false}>
        //         <NavigationMenuList>

        //             <NavigationMenuItem>
        //                 <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
        //                     <Link href="/docs">Docs</Link>
        //                 </NavigationMenuLink>
        //             </NavigationMenuItem>

        //             <NavigationMenuItem>
        //                 <NavigationMenuTrigger>Simple</NavigationMenuTrigger>
        //                 <NavigationMenuContent>
        //                     <ul className="grid w-[200px] gap-4">
        //                         <li>
        //                             <NavigationMenuLink asChild>
        //                                 <Link href="#">Components</Link>
        //                             </NavigationMenuLink>
        //                             <NavigationMenuLink asChild>
        //                                 <Link href="#">Documentation</Link>
        //                             </NavigationMenuLink>
        //                             <NavigationMenuLink asChild>
        //                                 <Link href="#">Blocks</Link>
        //                             </NavigationMenuLink>
        //                         </li>
        //                     </ul>
        //                 </NavigationMenuContent>
        //             </NavigationMenuItem>
        //         </NavigationMenuList>
        //     </NavigationMenu>
        // </nav>
        <nav className="bg-white text-black dark:bg-gray-900 dark:text-white flex items-center justify-between shadow-md px-6 py-4 mb-6">
            <div className="text-2xl font-bold">📚 BookLog</div>
            <ul className="flex space-x-6">
                <li>
                    <a href="/" className="hover:text-gray-300 transition">Home</a>
                </li>
                <li>
                    <a href="/books" className="hover:text-gray-300 transition">Books</a>
                </li>
                <li>
                    <a href="/books/quotes" className="hover:text-gray-300 transition">Quotes</a>
                </li>
                <li>
                    <a href="/books/new" className="hover:text-gray-300 transition">Add Book</a>
                </li>
            </ul>
        </nav>

    )
}

function ListItem({
    title,
    children,
    href,
    ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
    return (
        <li {...props}>
            <NavigationMenuLink asChild>
                <Link href={href}>
                    <div className="text-sm leading-none font-medium">{title}</div>
                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    )
}
