import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Logo from '../../../../assets/images/DarkLogo.svg'
import styles from './RestorePage.module.css'
import {RestoreForm} from "../../components/RestoreForm/RestoreForm";

export function RestorePage() {
    const navigate = useNavigate()

    return (
        <div className={styles.loginPage}>
            <div className={styles.loginPage__additionalContainer}>
                <div className={styles.loginPage__additionalContainerItem}>
                    <Link to='/login'>Вернуться к авторизации</Link>
                </div>
            </div>
            <img src={Logo} alt='Логотип сервиса' className={styles.loginPage__logo} onClick={() => navigate("/")}/>
            <div className={styles.loginPage__titleContainer}>
                <h1 className={styles.loginPage__title}>Восстановление пароля</h1>
                <p className={styles.loginPage__description}>Пи-1 - помощник в работе над проектами</p>
            </div>
            <RestoreForm/>
        </div>
    )
}
