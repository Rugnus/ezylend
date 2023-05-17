import AppHeader from "../../components/appHeader";
import styles from "../styles/UserProfile.module.scss";
import { FaUserCircle } from 'react-icons/fa';

export default function UserProfile() {
    return (
        <div className={styles.body}>
            <style jsx global>{`
        body {
            background-color: #20262E;
        }
        `}</style>
            <AppHeader/>
            <div className={styles.mainSection}>
                <h3>My profile</h3>
                <div className={styles.profileInfo}>
                    <div className={styles.profileInfoSect}>
                        <FaUserCircle className={styles.user_profile_icon}/>
                        <div className={styles.profileInfoText}>
                            <h6>Sungur Gasanov</h6>
                            <p>@sungurg</p>
                            <p>Role: User</p>
                        </div>
                    </div>
                    <div className={styles.editProfileInfo}>Edit</div>
                </div>
            </div>
            <div className={styles.personalInfo}>
                <h3>Personal Information</h3>
                <div className={styles.personalInfoBlock}>
                    <div className={styles.personalInfoSect}>
                        <div className={styles.personalInfoText}>
                            <span>First Name:</span> 
                            <span>Sungur</span>
                            
                        </div>
                        <div className={styles.personalInfoText}>
                            <span>Last Name:</span> 
                            <span>Gasanov</span>
                            
                        </div>
                    </div>
                    <div className={styles.personalInfoSect}>
                        <div className={styles.personalInfoText}>
                            <span>Email:</span> 
                            <span>sungur.rugnus@gmail.com</span>
                        </div>
                        <div className={styles.personalInfoText}>
                            <span>Wallet address:</span> 
                            <span>0xdd...C213dE</span>
                        </div>
                    </div>
                    <div className={styles.editProfileInfo}>Edit</div>
                </div>
            </div>
        </div>
    )
}