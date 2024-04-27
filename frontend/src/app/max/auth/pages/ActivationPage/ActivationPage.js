import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Logo from '../../../../assets/images/DarkLogo.svg'
import styles from './ActivationPage.module.css'
import {App, Button} from "antd";
import {activateUser} from "../../../../store/slices/authSlice";
import {useDispatch} from "react-redux";

export function ActivationPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {message} = App.useApp();
    const {code} = useParams()
    const [isActivate, setIsActivate] = useState(null)

    console.log(isActivate)

    useEffect(() => {
        message.loading({content: "Активирую аккаунт...", key: 'activateUser', duration: 0})

        dispatch(activateUser(code)).then((response) => {
            setIsActivate(true)
        }, (error) => {
            console.log(error)
            setIsActivate(false)
        });
        message.destroy('activateUser')
    }, [])

    return (
        <div className={styles.loginPage}>
            <img src={Logo} alt="Логотип сервиса" className={styles.loginPage__logo} onClick={() => navigate("/")}/>
            <div className={styles.loginPage__titleContainer}>
                {
                    isActivate === null &&
                    <h1 className={styles.loginPage__title}>Активирую аккаунт...</h1>
                }
                {
                    isActivate &&
                    <>
                        <h1 className={styles.loginPage__title}>Вы успешно активировали аккаунт</h1>
                        <p className={styles.loginPage__description}>Пи-1 - помощник в работе над проектами</p>
                    </>
                }
                {
                    isActivate === false &&
                    <>
                        <h1 className={styles.loginPage__title}>Ссылка недействительна</h1>
                        <p className={styles.loginPage__description}>
                            Код недействителен, или аккаунт уже активирован!
                        </p>
                    </>
                }

            </div>
            {
                isActivate &&
                <Button size="large" type="primary" onClick={() => navigate("/login")}>
                    Войти в аккаунт
                </Button>
            }
            {
                isActivate === false &&
                <Button size="large" onClick={() => navigate("/")}>
                    На главную
                </Button>
            }
        </div>
    )
}
