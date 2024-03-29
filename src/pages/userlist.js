import { signOut, useSession } from "next-auth/react"

export default function Userlist() {
    const { data: session, status } = useSession()
    const user = session?.user;
    console.log(user?.role)
    if (status !== "authenticated") {
        return (
            <section>
                <div>
                    <p>У вас недостаточно прав для просмотра этой страницы!</p>
                </div>
            </section>
        )
    }
    return (
        <section>
            <div>
                <h2>Привет, {session?.user?.name}</h2>
                <p>Вы администратор, который вошел как {session.user?.email}</p>
            </div>
            <button
                type="button"
                onClick={() => signOut()}
            >Logout</button>
        </section>
    )
}

