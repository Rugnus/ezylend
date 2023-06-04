import Head from 'next/head'
import Image from 'next/image'
import AppHeader from '../../components/appHeader'
import styles from '../styles/Dashboard.module.scss'
import {useState} from 'react'
import { signOut, useSession } from "next-auth/react"
import {prisma} from '../../server/db/client'
import axios from 'axios'

export default function Dashboard({posts, filteredCoins, supplies, suppliesCount}) {
    const { data: session, status } = useSession()
    console.log(session?.user?.userID)
    const [userAccount, setUserAccount] = useState("")
    const [balance, setBalance] = useState(1.25)
    const [supplyValue, setSupplyValue] = useState(0)
    const [value, setValue] = useState(1)
    console.log([filteredCoins][0].bitcoin.usd)
    // const handleSubmit = async ({language, code}) => {
    //     const {data} = await axios.post('/api/posts', {
    //         language,
    //         code,
    //     }) 
    //     console.log(data)
    // }

    const onWalletConnected = async (walletAdress, userID=session?.user?.userID) => {
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

    const user = session?.user;
    const currUID = session?.user?.userID

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

    const newDate = new Date()

    const postBTCSupply = async ({userID = currUID, supplyAmount=parseFloat(supplyValue), currency = "BTC",  createdAt = newDate}) => {
        
        const {data} = await axios.post('api/supplies', {
            userID,
            supplyAmount,
            currency,
            createdAt
        })
        console.log(data)
        location.reload()
    }

    const postETHSupply = async ({userID = currUID, supplyAmount=parseFloat(supplyValue), currency = "ETH",  createdAt = newDate}) => { 
        const {data} = await axios.post('api/supplies', {
            userID,
            supplyAmount,
            currency,
            createdAt
        })
        console.log(data)
        location.reload()
    }

    const postUSDTSupply = async ({userID = currUID, supplyAmount=parseFloat(supplyValue), currency = "USDT",  createdAt = newDate}) => {
        const {data} = await axios.post('api/supplies', {
            userID,
            supplyAmount,
            currency,
            createdAt
        })
        console.log(data)
        location.reload()
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
                <div>
                    <div className={styles.dashboardFirstSection}>
                        <div className={styles.currentSupplies}>
                            <h3>Ваши вклады</h3>
                            {/* <p>На данный момент у вас нет вкладов</p> */}
                            {/* <ul>
                                <div>
                                <span>Кол-во</span>
                                <span>Валюта</span>
                                <span>APY</span>

                                </div>
                                {supplies?.map(supply => (
                                    supplies.userID == currUID.userID && <li key={supply.supplyID}>
                                        <span>{supply.supplyAmount}</span>
                                        <span>{supply.currency}</span>
                                        <span>{supply.APY}</span>
                                        <a>withdraw</a>
                                    </li>
                                ))}
                            </ul> */}
                            {suppliesCount > 0 ? (
                                <table>
                                <tr className={styles.suppliesTitle}>
                                    <th>Кол-во</th>
                                    <th>Валюта</th>
                                    <th>APR</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            {supplies?.map(supply => (
                                supplies.userID == currUID.userID && <tr key={supply.supplyID}>
                                    <td>{supply.supplyAmount}</td>
                                    <td>{supply.currency}</td>
                                    <td>{supply.APY}</td>
                                    <a>Вывести</a>
                                </tr>
                            ))}
                            </table>
                            ) : (
                                <p>На данный момент у вас нет активных вкладов</p>
                            )}
                            
                        </div>
                        <div className={styles.currentBalance}>
                            <h3>Текущий баланс:</h3>
                            
                            <div className={styles.balanceTitle}>
                                {/* {changeText()} */}
                                {value ==1 && <span className={styles.outerBlock}>{balance} ETH <span className={styles.innerTextBlock}>~{balance * 1770 } $</span> </span> }
                                {value ==2 && <span className={styles.outerBlock}>{balance * 1770 } $ <span className={styles.innerTextBlock}>~{balance} eth</span></span> }
                                {value ==3 && <span className={styles.outerBlock}>{balance * 15} BTC <span className={styles.innerTextBlock}>~{balance} eth</span></span> }
                                {value ==4 && <span className={styles.outerBlock}>{1770 * balance * 80} Руб <span className={styles.innerTextBlock}>~{balance} eth</span></span> }
                                
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
                    <div className={styles.suppliesSection}>
                            <h3>Активы для вкладов</h3>
                            <table>
                                <tr>
                                    <th>Актив</th>
                                    <th>APR</th>
                                    <th>Может быть залогом</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                                <tr>
                                    <td><Image src={"technologies/btc.svg"} width={25} height={25}/>  Bitcoin</td>
                                    <td>1.5%</td>
                                    <td>+</td>
                                    <td><a className={styles.supplyButton} href="#popup-box4">Вложить</a></td>
                                    <td><a className={styles.tokenInfoButton} href='#popup-box'>Об активе</a></td>
                                </tr>
                                <tr>
                                    <td><Image src={"technologies/eth.svg"} width={25} height={25}/>  Ethereum</td>
                                    <td>3.2%</td>
                                    <td>+</td>
                                    <td><a className={styles.supplyButton} href="#popup-box5">Вложить</a></td>
                                    <td><a className={styles.tokenInfoButton} href="#popup-box2">Об активе</a></td>
                                </tr>
                                <tr>
                                    <td><Image src={"technologies/usdt.svg"} width={25} height={25}/>  USDT</td>
                                    <td>1.78%</td>
                                    <td>+</td>
                                    <td><a className={styles.supplyButton} href="#popup-box6">Вложить</a></td>
                                    <td><a className={styles.tokenInfoButton} href='#popup-box3'>Об активе</a></td>
                                </tr>
                            </table>
                    </div>
                    <div className={styles.tokenInfo} id="popup-box">
                        <div className={styles.popupContent} >
                            <h4><Image src={"technologies/btc.svg"} width={35} height={35}/>  Bitcoin</h4>
                            
                            <div className={styles.tokenTextInfo}>
                                <div className={styles.tokenFirstRow}>
                                    <span>Всего вложено: ? из ?</span>
                                    <span>APR: 1,5% </span>
                                </div>
                                <div className={styles.tokenSecondRow}>
                                    <span>Всего заимствовано: ? из ?</span>
                                    <span>APY, variable: 2,3%</span>
                                </div>
                                <div className={styles.tokenThirdRow}>
                                    <span>Коэффициент использования: ?%</span>
                                </div>
                            </div>
                            <a className={styles.boxClose} href="#">x</a>
                        </div>
                    </div>
                    <div className={styles.tokenInfo} id="popup-box2">
                        <div className={styles.popupContent} >
                            <h4><Image src={"technologies/eth.svg"} width={35} height={35}/>  Ethereum</h4>
                            
                            <div className={styles.tokenTextInfo}>
                                <div className={styles.tokenFirstRow}>
                                    <span>Всего вложено: ? из ?</span>
                                    <span>APR: 3,2% </span>
                                </div>
                                <div className={styles.tokenSecondRow}>
                                    <span>Всего заимствовано: ? из ?</span>
                                    <span>APY, variable: 3,8%</span>
                                </div>
                                <div className={styles.tokenThirdRow}>
                                    <span>Коэффициент использования: ?%</span>
                                </div>
                            </div>
                            <a className={styles.boxClose} href="#">x</a>
                        </div>
                    </div>
                    <div className={styles.tokenInfo} id="popup-box3">
                        <div className={styles.popupContent} >
                            <h4><Image src={"technologies/usdt.svg"} width={35} height={35}/>  USDT</h4>
                            
                            <div className={styles.tokenTextInfo}>
                                <div className={styles.tokenFirstRow}>
                                    <span>Всего вложено: ? из ?</span>
                                    <span>APR: 1,78% </span>
                                </div>
                                <div className={styles.tokenSecondRow}>
                                    <span>Всего заимствовано: ? из ?</span>
                                    <span>APY, variable: 2,1%</span>
                                </div>
                                <div className={styles.tokenThirdRow}>
                                    <span>Коэффициент использования: ?%</span>
                                </div>
                            </div>
                            <a className={styles.boxClose} href="#">x</a>
                        </div>
                    </div>
                    
                    {/* ВЛОЖЕНИЕ АКТИВА     ВЛОЖЕНИЕ АКТИВА     ВЛОЖЕНИЕ АКТИВА */}
                    <div className={styles.tokenInfo} id="popup-box4">
                        <div className={styles.popupContent}>
                            <h4>Введите сумму которую хотите вложить:</h4>
                            <div className={styles.supplyForm}>
                                <input type="text" pattern="[0-9]" placeholder="0.00 BTC" className={styles.supplyInput} onChange={(e) => {setSupplyValue(e.target.value)}}></input>
                                <button onClick={postBTCSupply}>Вложить</button>
                            </div>
                            <a className={styles.boxClose} href="#">x</a>
                        </div>
                    </div>

                    <div className={styles.tokenInfo} id="popup-box5">
                        <div className={styles.popupContent}>
                            <h4>Введите сумму которую хотите вложить:</h4>
                            <div className={styles.supplyForm}>
                                <input type="text" pattern="[0-9]" placeholder="0.00 ETH" className={styles.supplyInput} onChange={(e) => {setSupplyValue(e.target.value)}}></input>
                                <button onClick={postETHSupply}>Вложить</button>
                            </div>
                            <a className={styles.boxClose} href="#">x</a>
                        </div>
                    </div>

                    <div className={styles.tokenInfo} id="popup-box6">
                        <div className={styles.popupContent}>
                            <h4>Введите сумму которую хотите вложить:</h4>
                            <div className={styles.supplyForm}>
                                <input type="text" pattern="[0-9]" placeholder="0.00 USDT" className={styles.supplyInput} onChange={(e) => {setSupplyValue(e.target.value)}}></input>
                                <button onClick={postUSDTSupply}>Вложить</button>
                            </div>
                            <a className={styles.boxClose} href="#">x</a>
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

export async function getServerSideProps() {
    const posts = await prisma.post.findMany()
    const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cusdt&vs_currencies=usd')
    const filteredCoins = await res.json()
    const supplies = await prisma.activeSupplies.findMany()
    const suppliesCount = await prisma.activeSupplies.count()
    return {
        props: {
            posts: JSON.parse(JSON.stringify(posts)),
            supplies: JSON.parse(JSON.stringify(supplies)),
            suppliesCount: suppliesCount,
            filteredCoins
        }
    }
}