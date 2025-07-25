import QuoteForm from "@/components/add-quote-form";
import { fetchBookById } from "@/lib/data";


export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const book = await fetchBookById(id);
    return(
        <div>
            <QuoteForm {...book}></QuoteForm>
        </div>
    )
}