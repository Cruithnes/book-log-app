import { auth } from "@/auth"

export default async function Page() {

    const session = await auth();

    if (!session?.user) return null
    return (
        <div>
            {session.user.image &&
                <img src={session.user.image} alt="user image" />
            }
            <p>{session.user.name}</p>
        </div>
    )
}