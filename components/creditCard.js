import styles from '../src/styles/CreditCard.module.scss'
// import {FaUserCircle} from 'react-icons/fa'
import Link from 'next/link';


const CreditCard = ({userName, creditAmount, creditDuration, currency, interestRate, depositAmount, fixPaidAmount}) => {
    return (
        <div className={styles.creditCardBlock}>
            <h2>{userName}</h2>
            <div className={styles.creditColumns}>
                <div className={styles.creditCol1}>
                    <p>{creditAmount}</p>
                    <p>{creditDuration}</p>
                </div>
                <div className={styles.creditCol2}>
                    <p>{currency}</p>
                    <p>{interestRate}</p>
                </div>
                <div className={styles.creditCol3}>
                    <p>{depositAmount}</p>
                    <p>{fixPaidAmount}</p>
                </div>
                <div className={styles.button}>
                    <a>Подать заявку</a>
                </div>
            </div>
            
        </div>
    )
}


export default CreditCard;