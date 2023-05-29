import { signOut, useSession } from "next-auth/react"
import {ethers} from 'ethers'
import axios from 'axios'
import {useEffect, useState} from 'react'
import styles from '../styles/Staking.module.scss'
import Image from 'next/image'
import AppHeader from '../../components/appHeader'

export default function Staking({filteredCoins}) {

    const [ethPrice, setEthPrice] = useState(0)
    const [value, setValue] = useState(1)
    var today = new Date();
    var today1 = new Date()
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();


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
                        <a href="#stake" className={styles.tabs_item}><span>Stake</span></a>
                        <a href="#unstake" className={styles.tabs_item}><span>Unstake</span></a>
                    </nav>
                    <div className={styles.tabs_body}>
                        <div id="stake" className={styles.tabs_block}>
                            <h3>Stake</h3>
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
                                <p>Плата за обслуживание: ~{((ethPrice * [filteredCoins][0].ethereum.usd)*0.03).toFixed(3)}$</p>
                            </div>
                            <div className={styles.stakeButton}>
                                Stake
                            </div>
                        </div>
                        <div id="unstake" className={styles.tabs_block}>Unstake. Sunt cillum minim nostrud ipsum laboris in reprehenderit consectetur sunt dolor ad quis elit sint. Nulla ea Lorem sint eiusmod nulla. Ut cupidatat enim qui anim eu irure occaecat occaecat nisi.</div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export async function getServerSideProps() {
    const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cusdt&vs_currencies=usd')
    const filteredCoins = await res.json()
    return {
        props: {
            filteredCoins
        }
    }
}