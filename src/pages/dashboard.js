import { defaultConfig } from 'next/dist/server/config-shared'
import Head from 'next/head'
import Image from 'next/image'
import AppHeader from '../../components/appHeader'
import styles from '@/styles/Dashboard.module.scss'

export default function Dashboard() {    
    return (
        <div className={styles.body}>
        <style jsx global>{`
        body {
            background-color: #20262E;
        }
        `}</style>
            <AppHeader/>
            <div className={styles.wallet_section}>
                
            </div>
        </div>
    )
}
