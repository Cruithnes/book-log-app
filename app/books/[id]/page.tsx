import { fetchBookById } from "@/lib/data"
import ShowBook from "@/components/show-book";

export default async function Page({
    params
}: { params: Promise<{ id: string }> }) {

    const { id } = await params;
    const book = await fetchBookById(id);

    return (
            <ShowBook {...book} />
    )
}