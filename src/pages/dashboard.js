import { defaultConfig } from 'next/dist/server/config-shared'
import Head from 'next/head'
import Image from 'next/image'
import AppHeader from '../../components/appHeader'
import styles from '../styles/Dashboard.module.scss'
import {useState} from 'react'
import {ethers} from 'ethers'

export default function Dashboard() {
    const [userAccount, setUserAccount] = useState("")
    const [balance, setBalance] = useState(1)
    const [value, setValue] = useState(1)

    const onConnect = () => {
        if (window.ethereum) {
            // Есть кошелек
            window.ethereum.request({method: "eth_requestAccounts"}).then((account) =>  {
                 setUserAccount(account[0])
                //  getBalance(account[0])
            });
            // Проверяем по слушателю chainChanged, 
            // который возвращает true, если пользователь сменил сеть
            window.ethereum.on("chainChanged", chainChangedHandler)
        } else {
            alert("Установите кошелек!")
        }
    }

    // const getBalance = (account) => {
    //     window.ethereum.request({method: "eth_getBalance", params: [account, "latest"],}).then((balance) => {
    //         setBalance(ethers.utils.formatEther(balance))
    //         console.log(balance)
    //     })
    // }

    // Перезагружаем страницу и сбрасываем подключение к кошельку.
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
                <div className={styles.dashboardFirstSection}>
                    <div className={styles.currentSupplies}>
                        <h3>Ваши вклады</h3>
                        <p>На данный момент у вас нет вкладов</p>
                    </div>
                    <div className={styles.currentBalance}>
                        <h3>Текущий баланс:</h3>
                        
                        <div className={styles.balanceTitle}>
                            {/* {changeText()} */}
                            {value ==1 && <span>{balance} ETH</span> }
                            {value ==2 && <span>{balance * 1770 } $</span> }
                            {value ==3 && <span>{balance * 15} BTC</span> }
                            {value ==4 && <span>{1770 * balance * 80} Руб</span> }
                            
                            <select className={styles.currencySelector} onChange={(e) => {
                                setValue(e.target.value)
                                }
                                } required>
                                <option value="1" selected>ETH</option>
                                <option value="2" >USD</option>
                                <option value="3">BTC</option>
                                <option value="4">RUB</option>
                            </select>
                            
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
            )}
            
        </div>
    )
}
