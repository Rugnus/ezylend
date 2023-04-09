import Image from 'next/image'
import Link from 'next/link';
import styles from '../src/styles/Header.module.scss';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
            {/* <img src="../../public/logo.png" alt="logo"></img> */}
            <a href="/" className={styles.logo}><Image src={"/logo.svg"} width={30} height={41} /></a>
            </div>
            <nav>
                <a href="/">Продукт</a>
                <a href="/">Решение</a>
                <a href="/">Технологии</a>
            </nav>
            <div className={styles.sign_buttons}>
                <Link href="/auth/signin" className={styles.signin_button}>Войти</Link>
                <Link href="" className={styles.signup_button}>Присоединиться</Link>
            </div>
        </header>
    )
}

export default Header;