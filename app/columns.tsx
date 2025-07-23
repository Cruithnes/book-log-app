"use client";

import { ColumnDef } from "@tanstack/react-table"
import { NewBookInput } from "./schemas";
import { Book } from "./generated/prisma";

import Link from "next/link";
import clsx from "clsx";

import { ArrowUpDown } from "lucide-react"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";




export type BookType = {
    title: string
    author: string
    description?: string
    status: "Read" | "Planing" | "Reading" | "Dropped"
    review?: string
    rating?: number
    page?: number
    imageUrl?: string
    startDate?: string
    endDate?: string
}


export const columns: ColumnDef<Book>[] = [
    {
        accessorKey: "imageUrl",
        header: "",
        cell: ({ row }) => {
            const book = row.original || "https://res.cloudinary.com/dtf5irec3/image/upload/v1752585506/no-cover_dgoko5.png"
            return (
                <Link
                    href={`/books/${book.id}`}
                >
                    <img
                        src={book.imageUrl || "https://res.cloudinary.com/dtf5irec3/image/upload/v1752585506/no-cover_dgoko5.png"}
                        alt={`${book.title} cover image`}
                        className="w-16 h-24 object-cover rounded-md border"
                    />
                </Link>
            )
        }
    },
    {
        accessorKey: "title",
        header: "Kitap Adı",
        cell: ({ row }) => {
            const { author, title } = row.original;
            return (
                <div className="text-right space-y-1 pr-2 border-r">
                    <div className="text-sm font-semibold">{title}</div>
                    <div className="text-xs text-muted-foreground italic">{author}</div>
                </div>
            );
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Durum
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const statusColor = clsx(" px-2 py-1 text-xs rounded-md", {
                Read: "bg-green-200 text-green-700",
                Reading: "bg-blue-200 text-blue-700",
                Planing: "bg-fuchsia-200 text-fuchsia-700",
                Dropped: "bg-red-200 text-red-700",
            }[row.original.status] || "bg-gray-100 text-gray-700");
            const statuses = clsx({
                "Okudum": row.original.status === "Read",
                "Okuyorum": row.original.status === "Reading",
                "Kitaplığımda": row.original.status === "Planing",
                "Bıraktım": row.original.status === "Dropped",

            })

            return (
                <Badge className={statusColor}>{statuses}</Badge>
            )
        }
    },
    {
        accessorKey: "rating",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Puan
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <div className="text-sm">
                    {row.original.rating ?
                        (
                            <>
                                <span role="img" aria-label="star">⭐</span>
                                <span className="font-medium">{row.original.rating}/10</span>
                            </>
                        ) : "-"}
                </div>
            )
        }
    },
    {
        id: "details",
        header: "Detaylar",
        cell: ({ row }) => {
            const { startDate, endDate, page } = row.original;

            return (
                <div className="text-right space-y-1">

                    <div className="text-xs text-muted-foreground">
                        {startDate && endDate
                            ? `${startDate} - ${endDate}`
                            : startDate || endDate}
                    </div>

                    {
                        page && (
                            <div className="text-xs text-muted-foreground">
                                📖 {page} sayfa
                            </div>
                        )
                    }
                </div >
            );
        },
    },

]