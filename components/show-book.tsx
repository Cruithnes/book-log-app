"use client";

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

type ShowBookProps = {
    id: string;
    title: string;
    author: string;
    description?: string | null;
    status: any;
    review?: string | null;
    rating?: number | null;
    page?: number | null;
    imageUrl?: string | null;
    startDate?: string | null;
    endDate?: string | null;

    quotes?: {
        id: string;
        bookId: string;
        quote: string | null;
    }[];

    isMe: boolean;
};

export default function ShowBook(props: ShowBookProps) {
    const {
        id, title, author, description, status,
        review, rating, page, imageUrl, startDate, endDate, quotes, isMe
    } = props;

    const statusStyles = clsx("px-2 py-1 rounded-full text-sm font-medium", {
        "bg-green-100 text-green-700": status === "Read",
        "bg-blue-100 text-blue-700": status === "Reading",
        "bg-fuchsia-100 text-fuchsia-700": status === "Planing",
        "bg-red-100 text-red-700": status === "Dropped",
    })
    const statuses = clsx({
        "Okudum": status === "Read",
        "Okuyorum": status === "Reading",
        "Kitaplığımda": status === "Planing",
        "Bıraktım": status === "Dropped",

    })

    return (
        <section className="flex justify-center mt-10 px-4 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl">
                <Card className="w-full shadow-xl border rounded-2xl">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold">{title}</CardTitle>
                        <CardDescription className="text-muted-foreground">{author}</CardDescription>
                        {description && <p className="mt-2 text-sm text-muted-foreground">{description}</p>}
                        <CardAction className="flex gap-2 mt-4">

                            <AlertDialog>

                                <AlertDialogTrigger asChild>
                                    {isMe && <Button variant="destructive" size="sm">
                                        <Trash2 className="h-4 w-4 mr-1" />
                                    </Button>}

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
                            {isMe && <Link href={`/books/${id}/edit`}>
                                <Button variant="secondary" size="sm">
                                    <SquarePen className="h-4 w-4 mr-1" />
                                    Düzenle
                                </Button>
                            </Link>}


                        </CardAction>

                    </CardHeader>

                    <CardContent className="flex justify-center p-4">
                        <img
                            src={imageUrl || "/placeholder.jpg"}
                            alt={`${title} cover`}
                            className="h-[400px] w-auto object-contain rounded-md border"
                        />
                    </CardContent>

                    <CardFooter className="flex flex-col items-start gap-2 p-4 text-sm text-muted-foreground">
                        {page && <p>📄 <span className="font-medium text-foreground">{page}</span> sayfa</p>}
                        {status && (
                            <p>
                                📘 Durum:{" "}
                                <span className={statusStyles}>
                                    {statuses}
                                </span>
                            </p>
                        )}
                        {rating && <p>⭐ Puan: {rating}/10</p>}
                        {startDate && <p>📅 Başlama: {startDate}</p>}
                        {endDate && <p>📅 Bitiş: {endDate}</p>}
                    </CardFooter>
                </Card>

                <ScrollArea className="w-full h-[500px] rounded-xl border shadow-xl overflow-hidden">
                    <div className="flex flex-col h-full">
                        <div className="p-4 overflow-y-auto flex-grow">
                            <h2 className="text-xl font-semibold mb-4">Alıntılar</h2>
                            {quotes && quotes.length > 0 ? (
                                <ul className="space-y-2">
                                    {quotes.map((quote) => (
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
                        {isMe && <div className="p-4 border-t">
                            <Link href={`/books/${id}/edit/quote`} className="block w-full">
                                <Button className="w-full">Alıntı ekle</Button>
                            </Link>
                        </div>}
                    </div>
                </ScrollArea>

            </div>
        </section>
    )
}