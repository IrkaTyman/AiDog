import React, {useCallback, useState} from 'react';
import {App, Button, Form, Input} from 'antd';
import styles from './RegistrationForm.module.css'
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {nprogress} from "@mantine/nprogress";
import {registrationUser} from "../../../../store/slices/authSlice";

export function RegistrationForm(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {message} = App.useApp();
    const [form] = Form.useForm();

    const [isLoading, setIsLoading] = useState(false);
    const [submittable, setSubmittable] = useState(false);
    const [resultValues, setResultValues] = useState({})
    const values = Form.useWatch([], form);


    const nextStep = useCallback(() => {
        props.setStep(props.step + 1)
        setResultValues({...resultValues, ...values})
        if (props.step === 2) {
            nprogress.complete()
            return;
        }
        nprogress.set(33 * (props.step + 1))
    }, [props.step, props.setStep, resultValues, values])

    const prevStep = useCallback(() => {
        props.setStep(props.step - 1)
        nprogress.set(33 * (props.step - 1))
    }, [props.step, props.setStep])


    React.useEffect(() => {
        form
            .validateFields({
                validateOnly: true,
            })
            .then(
                () => {
                    setSubmittable(true);
                },
                () => {
                    setSubmittable(false);
                },
            );
    }, [values]);

    const registration = (payload) => {
        if (props.step !== 2) {
            nextStep()
            return
        }

        console.log(resultValues, payload)
        if (!isLoading) {
            setIsLoading(true);
            message.loading({content: "Создаю аккаунт...", key: 'registration', duration: 0})

            const data = {
                ...resultValues,
                ...payload
            }

            dispatch(registrationUser(data)).then((response) => {
                setIsLoading(false)
                message.destroy('registration')
                message.success({content: "Вы успешно зарегистрировались!"})
                nextStep()
            }, (error) => {
                setIsLoading(false)
                message.destroy('registration')
                message.error({content: error.message})
            });
        }
    }

    return (
        <div className={styles.registrationForm}>
            <Form
                form={form}
                name="registration"
                className={styles.registrationForm__form}
                onFinish={registration}
                autoComplete="off"
                layout={'vertical'}
                disabled={isLoading}
                scrollToFirstError
            >
                {
                    props.step === 0 &&
                    <Form.Item
                        name="email"
                        rules={[
                            {required: true, message: "Поле обязательно для ввода!"},
                            {type: "email", message: "Неверная почта!"}
                        ]}
                    >
                        <Input placeholder="Введите почту" size="large"/>
                    </Form.Item>
                }

                {
                    props.step === 1 &&
                    <>
                        <Form.Item
                            name="login"
                            rules={[{required: true, message: 'Поле обязательно для ввода!'}]}
                        >
                            <Input placeholder="Введите логин" size="large"/>
                        </Form.Item>
                        <Form.Item
                            name="secondName"
                            rules={[{required: true, message: 'Поле обязательно для ввода!'}]}
                        >
                            <Input placeholder="Введите фамилию" size="large"/>
                        </Form.Item>
                        <Form.Item
                            name="firstName"
                            rules={[{required: true, message: 'Поле обязательно для ввода!'}]}
                        >
                            <Input placeholder="Введите имя" size="large"/>
                        </Form.Item>
                    </>
                }

                {
                    props.step === 2 &&
                    <>
                        <Form.Item
                            name="password"
                            rules={[{required: true, message: 'Поле обязательно для ввода!'}]}
                            hasFeedback
                        >
                            <Input.Password placeholder="Введите пароль" size="large"/>
                        </Form.Item>
                        <Form.Item
                            name="repeatPassword"
                            initialValue=""
                            dependencies={["password"]}
                            rules={[
                                {required: true, message: "Поле обязательно для ввода!"},
                                ({getFieldValue}) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue("password") === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error("Пароли должны совпадать!"));
                                    },
                                }),
                            ]}
                            hasFeedback
                        >
                            <Input.Password placeholder="Повторите пароль" size="large"/>
                        </Form.Item>
                    </>
                }
                {
                    props.step !== 2 && props.step !== 3 &&
                    <Form.Item>
                        <div className={styles.registrationForm__buttons}>
                            {
                                props.step !== 0 &&
                                <Button size="large" onClick={prevStep}>
                                    Назад
                                </Button>
                            }
                            <Button
                                type="primary"
                                size="large"
                                disabled={!submittable}
                                onClick={nextStep}
                            >
                                Продолжить
                            </Button>
                        </div>

                    </Form.Item>
                }
                {
                    props.step === 2 &&
                    <Form.Item>
                        <div className={styles.registrationForm__buttons}>
                            <Button size="large" onClick={prevStep}>
                                Назад
                            </Button>
                            <Button type="primary" htmlType="submit" size="large" disabled={!submittable || isLoading}>
                                Зарегистрироваться
                            </Button>
                        </div>
                    </Form.Item>
                }
                {
                    props.step === 3 &&
                    <Form.Item className={styles.registrationForm__buttons}>
                        <Button type="primary" size="large" onClick={() => navigate("/login")}>
                            Войти в аккаунт
                        </Button>
                    </Form.Item>
                }
            </Form>
        </div>
    )
}
