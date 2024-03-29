import { signOut, useSession } from "next-auth/react"
import {prisma} from '../../server/db/client'
import {useState, useEffect} from 'react'
import styles from '../styles/MainScreen.module.scss'


export default function EzyLend({users}) {
    
    const { data: session, status } = useSession()
    const user = session?.user;
    console.log(user)
    // const login = users?.map(user => user.email)
    if (session?.user?.role !== "User") {
        return (
            <section className="grid h-screen place-items-center">
                <div className="w-25">
                    <p>You do not have permission to view this page!</p>
                </div>
            </section>
        );
    }
    return (
        <section className="grid h-screen place-items-center">
            <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Hello {session?.user?.name}</h2><br />
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">You are an admin user currently signed in as {session?.user?.email}.</p>
                <button
                    type="button"
                    onClick={() => signOut()}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                    Logout
                </button>
            </div>
            <div className={styles.usersField}>
                Список пользователей:
                {/* {userlist} */}
                {users?.map(user => (
                                <li key={users.userID}>
                                    {user.login}
                                </li>
                            ))}
            </div>
        </section>
    )
}

export async function getServerSideProps() {
    const users = await prisma.user.findMany()
    return {
        props: {
            users: JSON.parse(JSON.stringify(users)),
        }
    }
}

