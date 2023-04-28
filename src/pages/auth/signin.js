import { useRef } from "react";
import { getProviders, getSession, signIn } from "next-auth/react"
import styles from "../../styles/Auth.module.scss"

const Signin = ({ providers }) => {
    const email = useRef("");
    const password = useRef("");
    return (
        <div>
            <div className={styles.main_section}>
                <h2>Войти</h2>
                <form className={styles.form}>
                    <div className={styles.form_field}>
                        <input 
                            type="email"
                            id="email"
                            placeholder="Ваш Email"
                            autoFocus
                            className={styles.form_input}
                            onChange={(e) => (email.current = e.target.value)}
                         />
                    </div>
                    <div className={styles.form_field}>
                        <input 
                            type="password"
                            id="password"
                            placeholder="Ваш пароль"
                            autoFocus
                            className={styles.form_input}
                            onChange={(e) => (password.current = e.target.value)}
                         />
                    </div>
                    <div className={styles.form_field}>
                        <button 
                            type="button"
                            className={styles.form_button}
                            onClick={() => signIn("credentials", {
                                email: email.current, password: password.current,
                            })}
                         > Войти</button>
                    </div>
                </form>
            </div>
        </div>

    )
}
export default Signin
export async function getServerSideProps(context) {
    const { req } = context;
    const session = await getSession({ req });
    const providers = await getProviders()
    if (session) {
        return {
            redirect: { destination: "/mainScreen" },
        };
    }
    return {
        props: {
            providers,
        },
    }
}