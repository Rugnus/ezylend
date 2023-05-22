import { defaultConfig } from 'next/dist/server/config-shared'
import Head from 'next/head'
import Image from 'next/image'
import AppHeader from '../../components/appHeader'
import styles from '../styles/Dashboard.module.scss'
import {useState} from 'react'
import {ethers} from 'ethers'
import {prisma} from '../../server/db/client'

export default function Dashboard({posts}) {
    const [userAccount, setUserAccount] = useState("")
    const [balance, setBalance] = useState(1.25)
    const [value, setValue] = useState(1)
    // const handleSubmit = async ({language, code}) => {
    //     const {data} = await axios.post('/api/posts', {
    //         language,
    //         code,
    //     }) 
    //     console.log(data)
    // }

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
                <div>
                    <div className={styles.dashboardFirstSection}>
                        <div className={styles.currentSupplies}>
                            <h3>Ваши вклады</h3>
                            <p>На данный момент у вас нет вкладов</p>
                            <ul></ul>
                            {posts?.map(post => (
                                <li key={post.id}>
                                    {post.title}
                                </li>
                            ))}
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
                                    <th>APY</th>
                                    <th>Может быть залогом</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                                <tr>
                                    <td><Image src={"technologies/btc.svg"} width={25} height={25}/>  Bitcoin</td>
                                    <td>1.5%</td>
                                    <td>+</td>
                                    <td><a className={styles.supplyButton}>Вложить</a></td>
                                    <td><a className={styles.tokenInfoButton} href='#popup-box'>Об активе</a></td>
                                </tr>
                                <tr>
                                    <td><Image src={"technologies/eth.svg"} width={25} height={25}/>  Ethereum</td>
                                    <td>3.2%</td>
                                    <td>+</td>
                                    <td><a className={styles.supplyButton}>Вложить</a></td>
                                    <td><a className={styles.tokenInfoButton}>Об активе</a></td>
                                </tr>
                                <tr>
                                    <td><Image src={"technologies/usdt.svg"} width={25} height={25}/>  USDT</td>
                                    <td>1.78%</td>
                                    <td>+</td>
                                    <td><a className={styles.supplyButton}>Вложить</a></td>
                                    <td><a className={styles.tokenInfoButton}>Об активе</a></td>
                                </tr>
                            </table>
                    </div>
                    <div className={styles.tokenInfo} id="popup-box">
                        <div className={styles.popupContent} >
                            <h4><Image src={"technologies/btc.svg"} width={35} height={35}/>  Bitcoin</h4>
                            <h5>29423,68$</h5>
                            <div className={styles.tokenTextInfo}>
                                <div className={styles.tokenFirstRow}>
                                    <span>Всего вложено: ? из ?</span>
                                    <span>APY: 1,5% </span>
                                </div>
                                <div className={styles.tokenSecondRow}>
                                    <span>Всего заимствовано: ? из ?</span>
                                    <span>APY, variable: 2,3%</span>
                                </div>
                                <div className={styles.tokenThirdRow}>
                                    <span>Коэффициент использования: ?%</span>
                                </div>
                            </div>
                        </div>
                        <a className={styles.boxClose} href="#">x</a>
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
    return {
        props: {
            posts: JSON.parse(JSON.stringify(posts)),
        }
    }
}