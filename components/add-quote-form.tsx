"use client";

import { Book as PrismaBook, Quote } from "@/app/generated/prisma";

type Book = PrismaBook & {
    quotes?: Quote[];
};

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { X } from "lucide-react";

import { createQuote, deleteQuote } from "@/lib/actions";



export default function QuoteForm(book: Book) {

    console.log(book);
    const handleSubmit = createQuote.bind(null, book.id)
    return (
        <div className="flex justify-center gap-10 mx-auto">
            <section className="w-[500px]">
                <form action={handleSubmit} className="w-full">
                    <label htmlFor="quote">Quote:</label>
                    <Textarea placeholder="BLA BLA BLA BLA BLAH BLA BLAH BLA BLA BLA BLA BLA BLAH" name="quote" id="quote"></Textarea>
                    <Button type="submit" className="w-full mt-4">Add Quote</Button>
                </form>
            </section>
            {book.quotes && book.quotes.length > 0 ? (
                <section className="border rounded-md p-8 max-w-1/3">
                    <h1 className="text-3xl mb-3 border-b p-4">Quotes</h1>
                    <ul className="space-y-4 text-wrap max-w-full mt-3">
                        {book.quotes.map(quote => (
                            <li
                                className="break-words whitespace-normal max-w-prose"
                                key={quote.id}
                            >
                                {quote.quote}
                                <Button
                                    variant="ghost"
                                    onClick={() => deleteQuote(quote.id)}
                                >
                                    <X className="text-red-400" />
                                </Button>
                            </li>
                        ))}
                    </ul>
                </section>
            ) : null}
        </div>
    )
}