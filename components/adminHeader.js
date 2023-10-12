
const AppHeader = () => {
    return (
        <header className={styles.header}>
            <nav>
                <ul>
                    <li className={styles.active}><a href="/dashboard"><MdSpaceDashboard className={styles.icon} />Пользователи</a>
                    </li>
                    <li><a href="/staking"><MdInput className={styles.icon}/>Уведомления</a></li>
                    <li><a href="/"><GoGraph className={styles.icon}/>Вклады</a></li>
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