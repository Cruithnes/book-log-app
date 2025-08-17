import { fetchBookById, fetchAllComments } from "@/lib/data"
import ShowBook from "@/components/show-book";

import { CommentSection } from "@/components/comment-card";

import { auth } from "@/auth";
import { isAdmin } from "@/lib/utils";

export default async function Page({
    params
}: { params: Promise<{ id: string }> }) {

    const session = await auth();
    const isMe = isAdmin(session);
    console.log(isMe);

    const { id } = await params;
    const book = await fetchBookById(id);

    const comments = await fetchAllComments(id);

    // console.log(session?.user);
    // console.log(book.id);
    return (
        <main>
            <section>
                <ShowBook {...book} isMe={isMe}/>
            </section>
            <section>
                <CommentSection comments={comments} bookId={id} session={session}/>
            </section>
        </main >
    )
}