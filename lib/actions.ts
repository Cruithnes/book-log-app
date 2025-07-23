'use server'

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from "uuid";
import { z } from 'zod';

import { NewBookSchema, NewBookInput, EditBookSchema, EditBookInput } from '@/app/schemas';
import { fetchBookById } from './data';

export type State = {
    errors?: {
        title?: string[];
        author?: string[];
        status?: string[];
        rating?: string[];
        review?: string[];
        description?: string[];
        page?: string[];
        imageUrl?: string[];
        startDate?: string[];
        endDate?: string[];
    }
}

const QuoteSchema = z.object({
    quote: z.string(),
})

// export async function fetchBookCover(title: string) {
//     const res = await fetch(`https://openlibrary.org/search.json?title=${title}`);
//     const data = await res.json();

//     const firstFound = data.docs[0].cover_i;
//     if(!firstFound || firstFound === undefined) {
//         const imageUrl = "https://res.cloudinary.com/dtf5irec3/image/upload/v1752585506/no-cover_dgoko5.png"
//         return imageUrl
//     }
//     const imageUrl = `https://covers.openlibrary.org/b/id/${firstFound}-L.jpg`;
//     return imageUrl;

// }

export async function fetchBookCover(title: string, author: string) {
    const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}&author=${encodeURIComponent(author)}`;

    const res = await fetch(url);
    const data = await res.json();

    const firstDoc = data.docs?.[0];

    if (!firstDoc || !firstDoc.cover_i) {
        const fallbackImageUrl = "https://res.cloudinary.com/dtf5irec3/image/upload/v1752585506/no-cover_dgoko5.png";
        return fallbackImageUrl;
    }

    const imageUrl = `https://covers.openlibrary.org/b/id/${firstDoc.cover_i}-L.jpg`;
    return imageUrl;
}



export async function createBook(formData: NewBookInput) {
    const rawData = {
        title: formData.title,
        author: formData.author,
        status: formData.status,
        review: formData.review,
        description: formData.description,
        rating: formData.rating,
        page: formData.page,
        imageUrl: formData.imageUrl,
        startDate: formData.startDate,
        endDate: formData.endDate,
    };

    const result = NewBookSchema.safeParse(rawData);

    if (!result.success) {
        console.error("Validation error:", result.error.flatten());
        throw new Error("Invalid book data");
    }

    const data = result.data;
    const imageUrl = await fetchBookCover(data.title, data.author);

    try {
        await prisma.book.create({
            data: {
                id: uuidv4(),
                ...data,
                imageUrl: imageUrl,
            },
        });
    } catch (error) {
        console.error("Failed to create book", error);
        throw new Error("Could not create book");
    }

    revalidatePath("/");
    redirect("/")
}

export async function deleteBook(id: string) {

    // const id = formData.get("id") as string;

    const book = await fetchBookById(id);
    if (!book) {
        console.log("Book not found");
        return;
    }

    await prisma.quote.deleteMany({
        where: { bookId: id },
    })

    await prisma.book.delete({
        where: { id },
    })

    revalidatePath("/");
    redirect("/");
}


export async function updateBook(id: string, formData: EditBookInput) {
    const rawData = {
        title: formData.title,
        author: formData.author,
        status: formData.status,
        review: formData.review,
        description: formData.description,
        rating: formData.rating,
        page: formData.page,
        imageUrl: formData.imageUrl,
        startDate: formData.startDate,
        endDate: formData.endDate,
    };

    const result = EditBookSchema.safeParse(rawData);
    if (!result.success) {
        console.error("Validation error:", result.error.flatten());
        throw new Error("Invalid book data");
    }

    const data = result.data;
    try {
        await prisma.book.update({
            where: { id },
            data: {
                ...data
            },
        });
    } catch (error) {
        console.error('Failed to update book:', error);
        throw new Error('Update failed');
    }
}

export async function handleUpdate(id: string, formData: EditBookInput) {
    await updateBook(id, formData)
    revalidatePath(`/books/${id}`)
    redirect(`/books/${id}`)
}

export async function createQuote(id: string, formData: FormData) {
    const rawData = {
        quote: formData.get("quote"),
    };

    const result = QuoteSchema.safeParse(rawData);

    if (!result.success) {
        console.error("Validation error:", result.error.flatten());
        throw new Error("Invalid book data");
    }

    const data = result.data;
    try {
        await prisma.quote.create({
            data: {
                id: uuidv4(),
                quote: data.quote,
                book: {
                    connect: { id }
                }
            }
        })
    } catch (error) {
        console.error('Failed to create quote:', error);
        throw new Error('Create failed');
    }

    revalidatePath(`/books/${id}/edit/quote`);
}

export async function deleteQuote(id: string) {
    try {
        await prisma.quote.delete({
            where: { id }
        })
    } catch (error) {
        console.error("Failed to delete quote" + error);
        throw new Error("Delete failed");
    }
    revalidatePath(`/books/${id}/edit/quote`);
}