import { useRef, useState } from "react";
import { getProviders, getSession, signIn } from "next-auth/react"
import styles from "../../styles/Auth.module.scss"
import axios from "axios";


export default function Signup() {
    const [emailC, setEmail] = useState("");
    const [passwordC, setPassword] = useState("");
    const [loginC, setLogin] = useState("")
    const [firstNameC, setFirstName] = useState("")
    const [lastNameC, setLastName] = useState("")
    const id = 3

    const handleSubmit = async ({login=loginC, firstName=firstNameC, lastName=lastNameC, email=emailC, password=passwordC}) => {
        const {data} = await axios.post('/api/users', {
            login,
            firstName,
            lastName,
            email,
            password
        })
        console.log(data)
    }

    return (
        <div>
            <div className={styles.main_section}>
                <h2 className={styles.pageTitle}>Присоединиться</h2>
                <form className={styles.form} 
                onSubmit={handleSubmit} 
                action="#" 
                method="POST"
                >
                    <div className={styles.form_field}>
                        <input 
                            type="text"
                            id="login"
                            value={loginC}
                            placeholder="Ваш login"
                            autoFocus
                            className={styles.form_input}
                            onChange={(e) => setLogin(e.target.value)}
                         />
                    </div>
                    <div className={styles.form_field}>
                        <input 
                            type="text"
                            id="firstName"
                            value={firstNameC}
                            placeholder="Ваше Имя"
                            autoFocus
                            className={styles.form_input}
                            onChange={(e) => setFirstName(e.target.value)}
                         />
                    </div>
                    <div className={styles.form_field}>
                        <input 
                            type="text"
                            id="secondName"
                            value={lastNameC}
                            placeholder="Ваше Фамилие"
                            autoFocus
                            className={styles.form_input}
                            onChange={(e) => setLastName(e.target.value)}
                         />
                    </div>
                    <div className={styles.form_field}>
                        <input 
                            type="email"
                            id="email"
                            value={emailC}
                            placeholder="Ваш Email"
                            autoFocus
                            className={styles.form_input}
                            onChange={(e) => setEmail(e.target.value)}
                         />
                    </div>
                    <div className={styles.form_field}>
                        <input 
                            type="password"
                            id="password"
                            value={passwordC}
                            placeholder="Ваш пароль"
                            autoFocus
                            className={styles.form_input}
                            onChange={(e) => setPassword(e.target.value)}
                         />
                    </div>
                    <div className={styles.form_field}>
                        <button 
                            type="submit"
                            // onClick={handleSubmit}
                            className={styles.form_buttonReg}
                         > Присоединиться</button>
                    </div>
                </form>
            </div>
        </div>

    )
}
// export default Signup
export async function getServerSideProps(context) {
    const { req } = context;
    const session = await getSession({ req });
    const providers = await getProviders()
    if (session) {
        return {
            redirect: { destination: "/dashboard" },
        };
    }
    return {
        props: {
            providers,
        },
    }
}