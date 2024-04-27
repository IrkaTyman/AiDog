import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Logo from '../../../../assets/images/DarkLogo.svg'
import styles from './RegistrationPage.module.css'
import {RegistrationForm} from "../../components/RegistrationForm/RegistrationForm";
import {NavigationProgress} from "@mantine/nprogress";

export function RegistrationPage() {
    const navigate = useNavigate()
    const [step, setStep] = useState(0);

    return (
        <div className={styles.registrationPage}>
            <NavigationProgress/>
            {
                step !== 3 &&
                <div className={styles.registrationPage__additionalContainer}>
                    <div className={styles.registrationPage__additionalContainerItem}>
                        <p>Уже есть аккаунт?</p>
                        <Link to='/login'>Войти</Link>
                    </div>
                </div>
            }

            <img src={Logo} alt='Логотип сервиса' className={styles.registrationPage__logo} onClick={() => navigate("/")}/>
            <div className={styles.registrationPage__titleContainer}>
                <h1 className={styles.registrationPage__title}>
                    {step === 0 && "Добро пожаловать!"}
                    {step === 1 && "Давайте познакомимся!"}
                    {step === 2 && "Защитите свой аккаунт!"}
                    {step === 3 && "Вы успешно зарегистрировались!"}
                </h1>
                {
                    step === 0 &&
                    <p className={styles.registrationPage__description}>Пи-1 - помощник в работе над проектами</p>
                }
                {
                    step === 3 &&
                    <p className={styles.registrationPage__description}>
                        На вашу почту отправлено письмо с ссылкой на активацию аккаунта.<br/>
                        Если письмо не пришло, проверьте папку «Спам» в вашем почтовом ящике.
                    </p>
                }
            </div>

            <RegistrationForm step={step} setStep={setStep}/>
        </div>
    )
}
