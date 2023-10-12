import Head from 'next/head'
import Image from 'next/image'
import AppHeader from '../../components/appHeader'
import styles from '../styles/AdminPage.module.scss'
import {useState} from 'react'
import { signOut, useSession } from "next-auth/react"
import axios from 'axios'
import {prisma} from '../../server/db/client'

export default function AdminNotifications({notificationCount, creditorApplications}) {

    const {data: session, status} = useSession()
    const [currentCreditor, setCurrentCreditor] = useState("")
    const currUserRole = session?.user.role
    // console.log(creditorApplications)

    const applicationAgree = async (userID) => {
        console.log("application userid is " + userID)
        alert("Заявка принята")
        const {updateUser} = await axios.put('/api/creditors', {
            userID
        })
        // const {data} = await axios.delete('/api/creditors', {
        //     userID
        // })
        
        // console.log(data)
        console.log(updateUser)
    }

    return (
        <>
        { currUserRole === "Admin" ? (
            <div className={styles.body}>
                <header className={styles.header}>
                    <nav>
                        <ul>
                            <li ><a href="/adminPage">Пользователи</a></li>
                            <li className={styles.active}><a href="#">Уведомления</a></li>
                            <li><a href="/">Вклады</a></li>
                            <li><a href="/">More</a></li>
                            <li><a href="/auth/signin" onClick={() => signOut()}>SignOut</a></li>
                        </ul>
                    </nav>
                </header>
                <div className={styles.notificationsList}>
                    <h1>Уведомления <div className={styles.notificationCount}>{notificationCount}</div></h1>
                    {notificationCount > 0 ? (
                        <div>
                        <table>
                                <tr className={styles.suppliesTitle}>
                                    <th>id</th>
                                    <th>Email</th>
                                    <th>Адрес кошелька</th>
                                    <th>Роль</th>
                                    <th>Отправлен</th>
                                    <th></th>
                                </tr>
                            {creditorApplications?.map(application => (
                                <tr key={application.id}>
                                    <td>{application.userID}</td>
                                    <td>{application.email}</td>
                                    <td>{application.walletAdress}</td>
                                    <td>{application.role}</td>
                                    <td>{application.sentAt}</td>
                                    <td><a onClick={() => applicationAgree(application.userID)}>Принять заявку</a></td>
                                </tr>
                            ))}
                            </table>
                            </div>
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>
        ) : (
            <div>У вас нет прав просмотра данной страницы! <a href="/">Вернутся на главную</a></div>
        )}
        </>
    )
}

export async function getServerSideProps() {
    const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cusdt&vs_currencies=usd')
    const filteredCoins = await res.json()
    const users = await prisma.user.findMany()
    const usersCount = await prisma.user.count()
    const notificationCount = await prisma.creditorApplications.count()
    const notifications = await prisma.creditorApplications.findMany()
    return {
        props: {
            users: JSON.parse(JSON.stringify(users)),
            creditorApplications: JSON.parse(JSON.stringify(notifications)),
            notificationCount: notificationCount,
            usersCount: usersCount,
            filteredCoins
        }
    }
}