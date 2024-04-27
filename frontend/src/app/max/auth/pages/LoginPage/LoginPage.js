import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Logo from '../../../../assets/images/DarkLogo.svg'
import styles from './LoginPage.module.css'
import {LoginForm} from '../../components/LoginForm/LoginForm';

export function LoginPage() {
    const navigate = useNavigate()

    return (
        <div className={styles.loginPage}>
            <div className={styles.loginPage__additionalContainer}>
                <div className={styles.loginPage__additionalContainerItem}>
                    <p>Нет аккаунта?</p>
                    <Link to='/registration'>Зарегистрироваться</Link>
                </div>
                <div className={styles.loginPage__additionalContainerItem}>
                    <p>Забыли пароль?</p>
                    <Link to='/restore'>Восстановить</Link>
                </div>
            </div>
            <img src={Logo} alt='Логотип сервиса' className={styles.loginPage__logo} onClick={() => navigate("/")}/>
            <div className={styles.loginPage__titleContainer}>
                <h1 className={styles.loginPage__title}>С возвращением!</h1>
                <p className={styles.loginPage__description}>Пи-1 - помощник в работе над проектами</p>
            </div>
            <LoginForm/>
        </div>
    )
}
