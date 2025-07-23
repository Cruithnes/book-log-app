"use client";

import { Book } from "@/app/generated/prisma";
import { EditBookSchema, NewBookInput } from "@/app/schemas"
import { handleUpdate } from "@/lib/actions";
import { uploadToCloudinary } from "@/lib/utils";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"


export default function EditForm(book: Book) {

    const form = useForm<z.infer<typeof EditBookSchema>>({
        resolver: zodResolver(EditBookSchema),
        defaultValues: {
            title: book.title,
            author: book.author,
            description: book.description ?? "",
            status: book.status,
            review: book.review ?? "",
            rating: book.rating ?? null,
            page: book.page ?? null,
            imageUrl: book.imageUrl ?? "",
            startDate: book.startDate ?? "",
            endDate: book.endDate ?? "",
        },
    });

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const imageUrl = await uploadToCloudinary(file);
        if (imageUrl) {
            form.setValue("imageUrl", imageUrl);
        }
    };

    const statuses = ["Read", "Planing", "Reading", "Dropped"];


    const updateBookWithId = handleUpdate.bind(book, book.id)


    return (
        <div className="flex justify-center w-[500px] mx-auto">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(updateBookWithId)} className="space-y-4 w-full justify-center">

                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Title" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="author"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Author</FormLabel>
                                <FormControl>
                                    <Input placeholder="Author" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Description" {...field} value={field.value ?? ""} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        {statuses.map(status => (
                                            <div key={status} className="flex items-center space-x-2">
                                                <RadioGroupItem value={status} id={status} />
                                                <Label htmlFor={status}>{status}</Label>
                                            </div>
                                        ))}

                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="review"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Review</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Review" {...field} value={field.value ?? ""} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="rating"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Rating</FormLabel>
                                <FormControl>
                                    <Input type="number" step="0.1" min={0} max={10} {...field} value={field.value ?? ""} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="page"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Page</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} value={field.value ?? ""} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Image URL</FormLabel>
                                <FormControl>
                                    <Input placeholder="URL" {...field} value={field.value ?? ""} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Book Cover</FormLabel>
                                <FormControl>
                                    <div>
                                        <Input type="file" accept="image/*" key={book.title} onChange={handleImageUpload} className="cursor-pointer" />
                                        {field.value && (
                                            <img
                                                src={field.value}
                                                alt={`${book.title} Cover Image`}
                                                className="mt-2 rounded-lg w-32 h-48 object-cover"
                                            />
                                        )}
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Start Date</FormLabel>
                                <FormControl>
                                    <Input placeholder="Date" {...field} value={field.value ?? ""} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="endDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>End Date</FormLabel>
                                <FormControl>
                                    <Input placeholder="Date" {...field} value={field.value ?? ""} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />




                    <div className="flex">
                        <Button
                            type="submit"
                            className="w-full"
                        >
                            Update Book
                        </Button>
                    </div>
                </form>
            </Form>
        </div>

    )
}