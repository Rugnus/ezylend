import { signOut, useSession } from "next-auth/react"
import {ethers} from 'ethers'
import axios from 'axios'
import {useEffect, useState} from 'react'
import styles from '../styles/Staking.module.scss'
import Image from 'next/image'
import moment from "moment/moment"
import "moment/locale/ru"
import { prisma } from "../../server/db/client"
import AppHeader from '../../components/appHeader'

export default function Staking({filteredCoins, stakes}) {

    const { data: session, status } = useSession()
    const currUser = session?.user?.userID
    console.log(session?.user?.userID)
    const [ethPrice, setEthPrice] = useState(0)
    const [value, setValue] = useState(1)
    var today = new Date();
    var today1 = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var stakeAPR = 3.2

    var newDD = today.getDate() + 5;

    today = dd + '.' + mm + '.' + yyyy;
    var twoYears = yyyy + 2
    var yearAndHalf = yyyy + 1.5
    var oneYear = yyyy + 1
    var sixMonth = String(today1.getMonth() + 7).padStart(2, '0'); //January is 0!
    var threeMonth = String(today1.getMonth() + 4).padStart(2, '0');
    var oneMonth = String(today1.getMonth() + 2).padStart(2, '0');
    console.log(today)
    var nextTwoYears = dd + '.' + mm + "." + twoYears 
    var nextYearAndHalf = dd + '.' + sixMonth + "." + oneYear 
    var nextOneYear = dd + '.' + mm + "." + oneYear
    var nextSixMonth = dd + '.' + sixMonth + "." + oneYear
    var nextThreeMonth = dd + '.' + threeMonth + "." + oneYear
    var nextOneMonth = dd + '.' + oneMonth + "." + oneYear
    var currDateTwoYears = new Date(yyyy+2, mm, dd)
    var currDateYearAndHalf = new Date(yyyy+1 , today1.getMonth() + 6, dd)
    var currDateOneYear = new Date(yyyy+1, mm, dd);
    var currDateSixMonth = new Date(yyyy, today1.getMonth() + 6, dd)
    var currDateThreeMonth = new Date(yyyy, today1.getMonth() + 3, dd)
    var currDateOneMonth = new Date(yyyy, today1.getMonth() + 1, dd)


    const addStakeToUser = async({userID=currUser, amount=parseFloat(ethPrice), startedAt=today1, blockDuration, blockedUntil}) => {
        console.log("VAlue is " + value)
        console.log("Type is" + typeof(value))
        switch (value) {
            case "1":
                blockDuration = "2 года"
                blockedUntil = currDateTwoYears
                break;
            case "2":
                blockDuration = "1,5 года"
                blockedUntil = currDateYearAndHalf
                break;
            case "3":
                blockDuration = "1 год"
                blockedUntil = currDateOneYear
                break;
            case "4":
                blockDuration = "6 месяцев"
                blockedUntil = currDateSixMonth
                break;
            case "5":
                blockDuration = "3 месяца"
                blockedUntil = currDateThreeMonth
                break;
            case "6":
                blockDuration = "1 месяц"
                blockedUntil = currDateOneMonth
                break;
            default:
                blockDuration = "1 месяц"
                blockedUntil = currDateOneMonth
                break;
        }
        const {data} = await axios.post('api/stakes', {
            userID,
            amount,
            startedAt,
            blockDuration,
            blockedUntil
        })
        location.reload()
        console.log(data)
    }
    
    return (
        <div className={styles.body}>
        <style jsx global>{`
        body {
            background-color: #20262E;
        }
        `}</style>
            <AppHeader />
            <div className={styles.main_section}>
                <div className={styles.tabs}>
                    <nav className={styles.tabs_items}>
                        <a href="#stake" className={styles.tabs_item}><span>Застейкать</span></a>
                        <a href="#unstake" className={styles.tabs_item}><span>Вывести</span></a>
                    </nav>
                    <div className={styles.tabs_body}>
                        <div id="stake" className={styles.tabs_block}>
                            <h3>Стейкинг</h3>
                            <input type="text" pattern="[0-9]" placeholder="0.00 Eth" id="amount" className={styles.amount_input} onChange={(e) => setEthPrice(e.target.value)}>
                            </input>
                            <div className={styles.inputInnerText}>USD Price: ~{(ethPrice * [filteredCoins][0].ethereum.usd).toFixed(2)}$</div>
                            <div className={styles.stakingInfo}>
                                <p>Время блокировки: 
                                    <select onChange={(e) => {
                                    setValue(e.target.value)
                                    }}>
                                        <option value="1" defaultValue>2 года</option>
                                        <option value="2">1,5 года</option>
                                        <option value="3" >1 год</option>
                                        <option value="4">6 Месяцев</option>
                                        <option value="5">3 Месяца</option>
                                        <option value="6">1 Месяц</option>
                                    </select></p>
                                <p>Количество: {ethPrice} ETH</p>
                                <p>Заблокированно до:  
                                {value==1 && <> {nextTwoYears}</>}
                                {value==2 && <> {nextYearAndHalf}</>}
                                {value==3 && <> {nextOneYear}</>}
                                {value==4 && <> {nextSixMonth}</>}
                                {value==5 && <> {nextThreeMonth}</>}
                                {value==6 && <> {nextOneMonth}</>}
                                </p>
                                <p>Годовая процентная ставка: {stakeAPR}%</p>
                                <p>Плата за обслуживание: ~{((ethPrice * [filteredCoins][0].ethereum.usd)*0.03).toFixed(3)}$</p>
                            </div>
                            <div className={styles.stakeButton} onClick={addStakeToUser}>
                                Вложить
                            </div>
                        </div>
                        <div id="unstake" className={styles.tabs_block}>
                            <h3>Unstake</h3>
                            <div className={styles.stakeList}>
                                <ul>
                                    {stakes?.map(stake => (
                                    stake.userID == currUser && <li key={stake.stakeID}>
                                        <div>
                                            <span>{stake.amount} ETH</span>
                                            <span>{stake.blockDuration}</span>
                                        </div>
                                        <div>
                                            <span>Заблокировано до: {moment(stake.blockedUntil).locale('ru').format('ll')}</span>
                                        </div>
                                        {stake.blockDuration >= today && <button>Вывести</button>}
                                        {stake.blockDuration < today && <button disabled>Вывести</button> }
                                    </li> 
                                    
                                    ))}
                                    
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.faq}>
                    <h2>F.A.Q</h2>
                    <div className={styles.faqItem}>
                        <label className={styles.faqTitle} for="faq1">
                            Что такое стейкинг?
                        </label>
                        <input type="checkbox" className={styles.faqInput} name="faq" id="faq1"/>
                        <div className={styles.faqText}>
                            Стекинг — это способ пассивного заработка, при котором пользователи хранят монеты на алгоритме Proof of Stake (PoS) и обеспечивают работоспособность блокчейна. 
                            Это дает им право получать прибыль.
                        </div>
                    </div>

                    <div className={styles.faqItem}>
                        <label className={styles.faqTitle} for="faq2">
                            Что такое APY?
                        </label>
                        <input type="checkbox" className={styles.faqInput} name="faq" id="faq2"/>
                        <div className={styles.faqText}>
                            APY – это годовая ставка прибыли от инвестиций с учётом сложных процентов, которые накапливаются или растут вместе с балансом.
                            Сложные проценты включают проценты, полученные от первоначального депозита, плюс проценты, полученные с этих процентов.
                        </div>
                    </div>
                    <div className={styles.faqItem}>
                        <label className={styles.faqTitle} for="faq3">
                            Чем отличается APY от APR?
                        </label>
                        <input type="checkbox" className={styles.faqInput} name="faq" id="faq3"/>
                        <div className={styles.faqText}>
                        В отличие от APR, которая учитывает только обычные проценты, APY включает сложные проценты. Сложные проценты - это сумма, полученная на проценты и основную сумму вклада. Вот почему APY более выгоден, чем APR.
                        Инвесторы могут заработать APY, размещая свои токены и используя доходный фарминг для обеспечения пулов ликвидности. Они также могут заработать APY, храня свои токены на сберегательных счетах.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export async function getServerSideProps() {
    const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cusdt&vs_currencies=usd')
    const filteredCoins = await res.json()
    const stakes = await prisma.activeStake.findMany()
    return {
        props: {
            stakes: JSON.parse(JSON.stringify(stakes)),
            filteredCoins
        }
    }
}