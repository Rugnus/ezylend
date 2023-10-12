import styles from '../src/styles/AppHeader.module.scss'
import { MdSpaceDashboard, MdInput} from 'react-icons/md';
import { GoGraph } from 'react-icons/go'
import { FiMoreHorizontal } from 'react-icons/fi'
import { FaUserCircle } from 'react-icons/fa'
// import {FaUserCircle} from 'react-icons/fa'
import { signOut} from "next-auth/react"
import Link from 'next/link';


const AppHeader = () => {
    return (
        <header className={styles.header}>
            <nav>
                <ul>
                    <li className={styles.active}><a href="/dashboard"><MdSpaceDashboard className={styles.icon} />Главная</a>
                        <ul id="submenu" className={styles.submenu}>
                            <li><a href="/p2pCredit">P2P кредитование</a></li>
                            <li><a>Заимствование активов</a></li>
                        </ul>
                    </li>
                    <li><a href="/staking"><MdInput className={styles.icon}/>Стейкинг</a></li>
                    <li><a href="/"><GoGraph className={styles.icon}/>Активы</a></li>
                    <li><a href="/"><FiMoreHorizontal className={styles.icon}/>Ещё</a></li>
                </ul>
            </nav>
            <div className={styles.user_profile}>
                <Link href="/userProfile"><FaUserCircle className={styles.user_profile_icon}/>
                        
                </Link>
                <a className={styles.signOut} onClick={() => signOut()}>Выйти</a>
            </div>
        </header>
    )
}


export default AppHeader;