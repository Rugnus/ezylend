import { defaultConfig } from 'next/dist/server/config-shared'
import Head from 'next/head'
import Image from 'next/image'
import AppHeader from '../../components/appHeader'
import styles from '@/styles/Dashboard.module.scss'
import Web3 from 'web3'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
const provider_options = {
    walletconnect: {
        package: WalletConnectProvider,
        options: {
            infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
        },

    }
};
if (typeof window !== "undefined") {
    const web3modal = new Web3Modal({
        network: 'mainnet',
        cacheProvider: true,
        // providerOptions,
    })
}
else {
    const web3modal = new Web3Modal({
        network: 'mainnet',
        cacheProvider: true,
        // providerOptions,
    })
}

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
                <div className={styles.wallet_block}>
                    <Image src={"/wallet.png"} width={460} height={320}/>
                    <div className={styles.wallet_desc}>
                        <h3>Пожалуйста, подключите свой кошелек</h3>
                        <p>Пожалуйста, подключите свой кошелек, чтобы увидеть свои вклады, займы и открытые позиции. </p>
                    </div>
                    <div className={styles.wallet_button}>
                        <button className={styles.button}
                            onClick={async () => {
                                const provider = await web3modal.connect();
                                const web3 = new Web3(provider)

                            }}
                        >Подключить кошелёк</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
