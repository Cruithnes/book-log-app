'use server';

import prisma from "@/lib/prisma";

export async function fetchAllBooks() {
    const data = await prisma.book.findMany();
    if (!data) {
        throw new Error("Failed to fetch books");
    }
    return data;
}

export async function fetchBookById(id: string) {
    const book = await prisma.book.findUnique({
        where: { id: id },
        include: {
            quotes: true,
        },
    });
    if (!book) {
        throw new Error("Book not found");
    }
    return book;
}


export async function fetchAllQuotes() {
    const data = await prisma.quote.findMany({
        include: {
            book: true,
        },
    })
    if (!data) {
        throw new Error("Could not fetch quotes");
    }
    return data;
}