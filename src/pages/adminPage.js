import Head from 'next/head'
import Image from 'next/image'
import AppHeader from '../../components/appHeader'
import styles from '../styles/AdminPage.module.scss'
import {useState} from 'react'
import { signOut, useSession } from "next-auth/react"
import axios from 'axios'
import {prisma} from '../../server/db/client'

export default function AdminPage({users, filteredCoins, usersCount}) {
    
    const {data: session, status} = useSession()
    const currUserRole = session?.user.role
    // console.log(currUserRole)
    console.log(usersCount)

    return (
        <div className={styles.body}>
            {currUserRole === "Admin" ? (
                <>
                <header className={styles.header}>
                    <nav>
                        <ul>
                            <li className={styles.active}><a href="#">Пользователи</a></li>
                            <li><a href="/adminNotifications">Уведомления</a></li>
                            <li><a href="/">Кредиты</a></li>
                            <li><a  onClick={() => signOut()} >Выйти</a></li>
                        </ul>
                    </nav>
                </header>
                <div className={styles.userListSection}>
                    <h1>Список пользователей:</h1>
                    {usersCount > 0 ? (
                                <table>
                                <tr className={styles.suppliesTitle}>
                                    <th>id</th>
                                    <th>Логин</th>
                                    <th>Email</th>
                                    <th>Роль</th>
                                    <th>Адрес кошелька</th>
                                    <th>Имя</th>
                                    <th>Фамилие</th>
                                    <th>Создан</th>
                                </tr>
                            {users?.map(user => (
                                <tr key={user.userID}>
                                    <td>{user.userID}</td>
                                    <td>{user.login}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>{user.walletAdress}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.createdAt}</td>
                                </tr>
                            ))}
                            </table>
                            ) : (
                                <p>На данный момент пользователей нет</p>
                            )}
                </div>
                </>
            ) : (
                <div>У вас нет прав просмотра данной страницы! <a href="/">Вернутся на главную</a></div>
            )}

        </div>
    )
}

export async function getServerSideProps() {
    const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cusdt&vs_currencies=usd')
    const filteredCoins = await res.json()
    const users = await prisma.user.findMany()
    const usersCount = await prisma.user.count()
    return {
        props: {
            users: JSON.parse(JSON.stringify(users)),
            usersCount: usersCount,
            filteredCoins
        }
    }
}