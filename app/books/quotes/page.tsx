import { fetchAllQuotes } from "@/lib/data"

import Link from "next/link"
import { Button } from "@/components/ui/button";

export default async function Page() {
    const quotes = await fetchAllQuotes();
    return (
        <section className="flex justify-center min-h-screen">
            <ul className="flex flex-col items-center">
                {quotes.map(quote => (
                    <li
                        className="space-y-2"
                        key={quote.id}
                    >
                        {quote.book.title} - {quote.quote}
                        <Button
                        variant="link"
                        >
                            <Link
                            href={`/books/${quote.bookId}`}
                        >
                            Book Details</Link>
                        </Button>
                    </li>
                ))}
            </ul>
        </section>
    )
}