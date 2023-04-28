import { defaultConfig } from 'next/dist/server/config-shared'
import Head from 'next/head'
import Image from 'next/image'
import AppHeader from '../../components/appHeader'
import styles from '../styles/Dashboard.module.scss'
import {useState} from 'react'
import {ethers} from 'ethers'

export default function Dashboard() {
    const [userAccount, setUserAccount] = useState("")
    const [balance, setBalance] = 0

    const onConnect = () => {
        if (window.ethereum) {
            window.ethereum
            .request({method: "eth_requestAccounts"})
            .then((account) => {
                setUserAccount(account[0]);
                getBalance(account[0])
                console.log(account)
            });
            window.ethereum.on("accountChanged", onConnect());
            window.ethereum.on("chainChanged", chainChangedHandler())
        } else {
            alert("Установите метамаск!")
        }
    }

    const getBalance = (account) => {
        window.ethereum.request({method: "eth_getBalance", params: [account, "latest"],}).then((balance) => {
            setBalance(ethers.utils.formatEther(balance))
            console.log(balance)
        })
    }

    const chainChangedHandler = () => {
        window.location.reload()
    }

    return (
        <div className={styles.body}>
        <style jsx global>{`
        body {
            background-color: #20262E;
        }
        `}</style>
            <AppHeader/>
            {userAccount ? (
                <span>111</span>
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
            )}
            
        </div>
    )
}
