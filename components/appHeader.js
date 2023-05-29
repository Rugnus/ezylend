import styles from '../src/styles/AppHeader.module.scss'
import { MdSpaceDashboard, MdInput} from 'react-icons/md';
import { GoGraph } from 'react-icons/go'
import { FiMoreHorizontal } from 'react-icons/fi'
import { FaUserCircle } from 'react-icons/fa'
// import {FaUserCircle} from 'react-icons/fa'
import Link from 'next/link';


const AppHeader = () => {
    return (
        <header className={styles.header}>
            <nav>
                <ul>
                    <li className={styles.active}><a href="/dashboard"><MdSpaceDashboard className={styles.icon} />Dashboard</a>
                        <ul id="submenu" className={styles.submenu}>
                            <li><a>P2P кредитование</a></li>
                            <li><a>Заимствование активов</a></li>
                    </ul>
                    </li>
                    <li><a href="/staking"><MdInput className={styles.icon}/>Stake</a></li>
                    <li><a href="/"><GoGraph className={styles.icon}/>Markets</a></li>
                    <li><a href="/"><FiMoreHorizontal className={styles.icon}/>More</a></li>
                </ul>
            </nav>
            <div className={styles.user_profile}>
                <Link href="/userProfile"><FaUserCircle className={styles.user_profile_icon}/></Link>
            </div>
        </header>
    )
}


export default AppHeader;