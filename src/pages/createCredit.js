import { useRef, useState } from "react";
import axios from "axios";
import styles from "../styles/CreateCredit.module.scss";
import { useSession } from "next-auth/react";
import AppHeader from '../../components/appHeader';
import Image from 'next/image'

export default function() {
    
    const { data: session, status } = useSession()
    const currUID = session?.user?.userID
    const currULogin = session?.user?.login
    const [creditAmountValue, setCreditAmount] = useState()
    const [creditDurationValue, setCreditDuration] = useState("1 month")
    const [currencyValue, setCurrency] = useState("eth")
    const [interestRateValue, setInterestRate] = useState()
    const [depositAmountValue, setDepositAmount] = useState()
    const [fixPaidAmountValue, setFixPaidAmount] = useState()
    const today = new Date()
    

    const [value, setValue] = useState()
    
    const handleSubmit = async ({
        userID = currUID, 
        creditAmount = parseFloat(creditAmountValue), 
        currency = currencyValue, 
        creditDuration = creditDurationValue, 
        interestRate = parseFloat(interestRateValue), 
        depositAmount = parseFloat(depositAmountValue), 
        fixPaidAmount = parseFloat(fixPaidAmountValue),
        createdAt = today,
        userLogin = currULogin
    }) => {
        const {data} = await axios.post('api/credits', {
            userID,
            creditAmount,
            currency,
            creditDuration,
            interestRate,
            depositAmount,
            fixPaidAmount,
            createdAt,
            userLogin
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
            <div className={styles.form}>
            <h2 className={styles.pageTitle}>Создать кредит</h2>
                <form className={styles.form} 
                // onSubmit={handleSubmit} 
                // action="#" 
                // method="POST"
                >
                    <div className={styles.form_field}>
                        <label for="creditAmount">Сумма кредита</label>
                        <input 
                            type="text"
                            pattern="\-?\d+(\.\d{0,})?"
                            id="creditAmount"
                            value={creditAmountValue}
                            placeholder="Сумма кредита"
                            autoFocus
                            className={styles.form_input}
                            onChange={(e) => setCreditAmount(e.target.value)}
                         />
                    </div>
                    <div className={styles.form_field}>
                            <label for="currency">Валюта займа</label>
                            <select className={styles.currencySelector} onChange={(e) => {
                                        setCurrency(e.target.value)
                                        }
                                        } id="currency" required>
                                        <option value="eth" selected>ETH</option>
                                        <option value="btc">BTC</option>
                                        <option value="usdt">USDT</option>
                                    </select>
                    </div>
                    <div className={styles.form_field}>
                            <label for="creditDuration">Срок кредита</label>
                            <select className={styles.creditDuration} onChange={(e) => {
                                        setCreditDuration(e.target.value)
                                        }
                                        } id="creditDuration" required>
                                        <option value="1 Месяц" selected>1 месяц</option>
                                        <option value="6 Месяце" >6 месяцев</option>
                                        <option value="1 Год">1 год</option>
                                        <option value="2 Года">2 года</option>
                                    </select>
                    </div>
                    <div className={styles.form_field}>
                        <label for="interestRate">Процентная ставка</label>
                        <input 
                            type="text"
                            pattern="\-?\d+(\.\d{0,})?"
                            id="interestRate"
                            value={interestRateValue}
                            placeholder="Процентная ставка"
                            autoFocus
                            className={styles.form_input}
                            onChange={(e) => setInterestRate(e.target.value)}
                         />
                    </div>
                    <div className={styles.form_field}>
                        <label for="depositAmount">Сумма первоначального вклада</label>
                        <input 
                            type="text"
                            pattern="\-?\d+(\.\d{0,})?"
                            id="depositAmount"
                            value={depositAmountValue}
                            placeholder="Сумма первоначального вклада"
                            autoFocus
                            className={styles.form_input}
                            onChange={(e) => setDepositAmount(e.target.value)}
                         />
                    </div>
                    {value !== 1 &&
                    <div className={styles.form_field}>
                        <label for="fixPaidAmount">Фиксированная выплата в месяц</label>
                        <input 
                            type="text"
                            pattern="\-?\d+(\.\d{0,})?"
                            id="fixPaidAmount"
                            value={fixPaidAmountValue}
                            placeholder="Фиксированная выплата в месяц"
                            autoFocus
                            className={styles.form_input}
                            onChange={(e) => setFixPaidAmount(e.target.value)}
                         />
                    </div>
                    }
                    <a className={styles.createCreditButton} onClick={handleSubmit}>Создать кредит</a>
                    <div className={styles.form_field}>
                        {/* <button 
                            type="submit"
                            // onClick={handleSubmit}
                            className={styles.form_buttonReg}
                         > Создать кредит</button> */}
                    </div>
                </form>
            </div>
        </div>
    )
}