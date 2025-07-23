import EditForm from "@/components/edit-book-form"
import { fetchBookById } from "@/lib/data";
import prisma from "@/lib/prisma";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {

    const { id } = await params;
    const book = await fetchBookById(id);

    return (
        <div>
            <EditForm {...book}></EditForm>
        </div>
    )
}