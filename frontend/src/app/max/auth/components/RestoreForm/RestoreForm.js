import React, {useState} from 'react';
import {App, Button, Form, Input} from 'antd';
import styles from './RestoreForm.module.css'
import {useDispatch} from "react-redux";
import {loginUser} from "../../../../store/slices/authSlice";
import {Link, useNavigate} from "react-router-dom";

export function RestoreForm() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const {message} = App.useApp();

    const logIn = (payload) => {
        if (!isLoading) {
            setIsLoading(true);
            // message.loading({content: "Вхожу в аккаунт...", key: 'logIn', duration: 0})
            //
            // const data = {
            //     login: payload.login,
            //     password: payload.password
            // }
            //
            // dispatch(loginUser(data)).then((response) => {
            //     setIsLoading(false)
            //     message.destroy('logIn')
            //     message.success({content: "Вы успешно авторизовались"})
            //     navigate("/home")
            // }, (error) => {
            //     setIsLoading(false)
            //     message.destroy('logIn')
            //     message.error({content: error.message})
            // });
        }
    }

    return (
        <div className={styles.restoreForm}>
            <Form
                name="restore"
                className={styles.restoreForm__form}
                onFinish={logIn}
                autoComplete="off"
                layout={'vertical'}
                disabled={isLoading}
            >
                <Form.Item
                    name="login"
                    rules={[
                        {required: true, message: 'Поле обязательно для ввода!'},
                        {type: "email", message: "Неверная почта!"}
                    ]}
                >
                    <Input placeholder="Введите почту" size="large"/>
                </Form.Item>

                <Form.Item className={styles.restoreForm__button}>
                    <Button type="primary" htmlType="submit" size="large" d>
                        Восстановить
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
