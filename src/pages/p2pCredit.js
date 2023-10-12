import Head from 'next/head'
import Image from 'next/image'
import AppHeader from '../../components/appHeader'
import CreditCard from '../../components/CreditCard'
import styles from '../styles/P2PCredit.module.scss'
import {useState, useEffect} from 'react'
import { signOut, useSession } from "next-auth/react"
import {prisma} from '../../server/db/client'
import axios from 'axios'


export default function P2PCredit({credits, applications}) {

    // console.log("User " + credits[0].userID)
    const { data: session, status } = useSession()
    const currUser = session?.user
    const currUID = session?.user.userID
    const currUserRole = session?.user?.role
    console.log("Role: " + currUserRole)
    console.log(currUser)
    const currDate = new Date()
    const [userAccount, setUserAccount] = useState("")
    const [balance, setBalance] = useState(1.25)
    const currULogin = session?.user?.login
    console.log(applications)

    const onWalletConnected = async (walletAdress, userID=currUID) => {
        console.log(userID)
        const {data} = await axios.put('/api/users', {
            userID,
            walletAdress
        })
        console.log(data)
    }
    

    const onConnect = () => {
        if (window.ethereum) {
            // Есть кошелек
            window.ethereum.request({method: "eth_requestAccounts"}).then((account) =>  {
                 setUserAccount(account[0])
                 console.log(account[0])
                 onWalletConnected(account[0])
                //  getBalance(account[0])
            });
            // Проверяем по слушателю chainChanged, 
            // который возвращает true, если пользователь сменил сеть
            window.ethereum.on("chainChanged", chainChangedHandler)
        } else {
            alert("Установите кошелек!")
        }
    }

    const chainChangedHandler = () => {
        window.location.reload()
    }

    const sendCreditorInfo = async ({userID = currUID, 
                                    email = currUser.email, 
                                    walletAdress = currUser.walletAdress, 
                                    role = currUser.role, 
                                    sentAt = currDate,
                                    userLogin = currULogin,}) => {
        // const {data} = await axios.post('api/creditors', {
        //     userID,
        //     email,
        //     walletAdress,
        //     role,
        //     sentAt,
        //     userLogin
        // })
        // console.log(data)
        alert("Ваша заявка отправлена на рассмотрение!")
    }

    // console.log(credits)

    return (
        <div className={styles.body}>
        <style jsx global>{`
        body {
            background-color: #20262E;
        }
        `}</style>
            <AppHeader/>
            {
                userAccount ? (
                    <div className={styles.mainSection}>
                        <div className={styles.title}>
                            <h2>P2P кредитование</h2>
                        </div>
                        <div className={styles.creditSection}>
                            <div className={styles.creditList}>
                                <h3>Список кредиторов</h3>
                                { currUser.role !== 'Creditor' ? (
                                    <div className={styles.outerButton}><a className={styles.beCreditorButton} onClick={sendCreditorInfo}>Стать кредитором</a></div>
                                ) : (
                                    <div className={styles.outerButton}><a className={styles.createACreditButton} href="/createCredit">Создать кредит</a></div>
                                )}
                                
                                {/* <ul>
                                {credits?.map(credit => (
                                    <li key={credit.id}>
                                        <span>{credit.userID}</span>
                                        <span>{credit.creditAmount}</span>
                                        <span>{credit.currency}</span>
                                        <span>{credit.creditDuration}</span>
                                        <span>{credit.interestRate}</span>
                                        <a>withdraw</a>
                                    </li>
                                ))}
                                </ul> */}
                                
                                
                            </div>
                            <div className={styles.activeCredits}>
                            {credits?.map(credit => (
                                credit.currency == "eth" && 
                                    <CreditCard 
                                        key={credit.id}
                                        userName={"Кредитор: " + credit.userLogin} 
                                        creditAmount={"Сумма кредита: " + credit.creditAmount + " ETH"} 
                                        creditDuration={"Длительность кредита: " + credit.creditDuration}
                                        currency={"Валюта: " + credit.currency}
                                        interestRate={"Процентная ставка: " + credit.interestRate + "%"} 
                                        depositAmount={"Сумма депозита: " + credit.depositAmount + " ETH"}
                                        fixPaidAmount={"Фикс. выплата в месяц: " + credit.fixPaidAmount + " ETH"}
                                    />
                                ))}

                                {credits?.map(credit => (
                                credit.currency == "usdt" && 
                                    <CreditCard 
                                        key={credit.id}
                                        userName={"Кредитор: " + credit.userLogin} 
                                        creditAmount={"Сумма кредита: " + credit.creditAmount + " USDT"} 
                                        creditDuration={"Длительность кредита: " + credit.creditDuration}
                                        currency={"Валюта: " + credit.currency}
                                        interestRate={"Процентная ставка: " + credit.interestRate + "%"} 
                                        depositAmount={"Сумма депозита: " + credit.depositAmount + " USDT"}
                                        fixPaidAmount={"Фикс. выплата в месяц: " + credit.fixPaidAmount + " USDT"}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={styles.wallet_section}>
                        <div className={styles.wallet_block}>
                            <Image src={"/wallet.png"} width={460} height={320}/>
                            <div className={styles.wallet_desc}>
                                <h3>Пожалуйста, подключите свой кошелек</h3>
                                <p>Пожалуйста, подключите свой кошелек, чтобы увидеть свои вклады, займы и открытые позиции. </p>
                            </div>
                            <div className={styles.wallet_button}>
                                <button className={styles.button}
                                    onClick={onConnect}
                                >Подключить кошелёк</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export async function getServerSideProps() {
    const credits = await prisma.creditsList.findMany()
    const applications = await prisma.creditorApplications.findMany()
    return {
        props: {
            applications: JSON.parse(JSON.stringify(applications)),
            credits: JSON.parse(JSON.stringify(credits)),
        }
    }
}