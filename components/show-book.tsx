"use client";

import { Book } from "@/app/generated/prisma";
import { deleteBook } from "@/lib/actions";

import Link from "next/link";
import clsx from "clsx";

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Trash2, SquarePen } from "lucide-react";

export default function ShowBook(book: Book) {

    const statusStyles = clsx("px-2 py-1 rounded-full text-sm font-medium", {
        "bg-green-100 text-green-700": book.status === "Read",
        "bg-blue-100 text-blue-700": book.status === "Reading",
        "bg-fuchsia-100 text-fuchsia-700": book.status === "Planing",
        "bg-red-100 text-red-700": book.status === "Dropped",
    })
    const statuses = clsx({
        "Okudum": book.status === "Read",
        "Okuyorum": book.status === "Reading",
        "Kitaplığımda": book.status === "Planing",
        "Bıraktım": book.status === "Dropped",

    })
    const id = book.id;

    return (
        <section className="flex justify-center mt-10 px-4 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl">
                <Card className="w-full shadow-xl border rounded-2xl">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold">{book.title}</CardTitle>
                        <CardDescription className="text-muted-foreground">{book.author}</CardDescription>
                        {book.description && <p className="mt-2 text-sm text-muted-foreground">{book.description}</p>}
                        <CardAction className="flex gap-2 mt-4">

                            <AlertDialog>

                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive" size="sm">
                                        <Trash2 className="h-4 w-4 mr-1" />
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Emin misin?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Bu işlem geri alınamaz. Kitap kalıcı olarak silinecek.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>

                                    <AlertDialogFooter>
                                        <AlertDialogCancel>İptal</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => deleteBook(id)}>Sil</AlertDialogAction>
                                    </AlertDialogFooter>

                                </AlertDialogContent>
                            </AlertDialog>

                            <Link href={`/books/${book.id}/edit`}>
                                <Button variant="secondary" size="sm">
                                    <SquarePen className="h-4 w-4 mr-1" />
                                    Düzenle
                                </Button>
                            </Link>

                        </CardAction>

                    </CardHeader>

                    <CardContent className="flex justify-center p-4">
                        <img
                            src={book.imageUrl || "/placeholder.jpg"}
                            alt={`${book.title} cover`}
                            className="h-[400px] w-auto object-contain rounded-md border"
                        />
                    </CardContent>

                    <CardFooter className="flex flex-col items-start gap-2 p-4 text-sm text-muted-foreground">
                        {book.page && <p>📄 <span className="font-medium text-foreground">{book.page}</span> sayfa</p>}
                        {book.status && (
                            <p>
                                📘 Durum:{" "}
                                <span className={statusStyles}>
                                    {statuses}
                                </span>
                            </p>
                        )}
                        {book.rating && <p>⭐ Puan: {book.rating}/10</p>}
                        {book.startDate && <p>📅 Başlama: {book.startDate}</p>}
                        {book.endDate && <p>📅 Bitiş: {book.endDate}</p>}
                    </CardFooter>
                </Card>

                <ScrollArea className="w-full h-[500px] rounded-xl border shadow-xl overflow-hidden">
                    <div className="flex flex-col h-full">
                        <div className="p-4 overflow-y-auto flex-grow">
                            <h2 className="text-xl font-semibold mb-4">Quotes</h2>
                            {book.quotes && book.quotes.length > 0 ? (
                                <ul className="space-y-2">
                                    {book.quotes.map((quote) => (
                                        <li
                                            key={quote.id}
                                            className="p-3 border rounded bg-gray-800/45 text-gray-100 break-words whitespace-pre-wrap w-full overflow-hidden max-w-full"
                                            style={{ wordBreak: 'break-word' }}
                                        >
                                            {quote.quote}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500">Alıntı yok :(</p>
                            )}
                        </div>
                        <div className="p-4 border-t">
                            <Link href={`/books/${book.id}/edit/quote`} className="block w-full">
                                <Button className="w-full">Alıntı ekle</Button>
                            </Link>
                        </div>
                    </div>
                </ScrollArea>

            </div>
        </section>
    )
}