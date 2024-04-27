import { Button, Form, Input } from 'antd';
import { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '@app/providers/AuthProvider/AuthProvider';

import { useLogin } from '@features/auth/lib/useLogin';
import { LoginModel } from '@features/auth/model/LoginModel';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './LoginForm.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{

}>;

export const LoginForm: FC<Props> = typedMemo(function LoginForm({
    className,
    'data-testid': dataTestId = 'LoginForm',
}) {
    const navigate = useNavigate();
    const { login: loginApp } = useAuthContext();
    const { mutate: login, isLoading } = useLogin({
        onSuccess: data => {
            loginApp(data);
            navigate('/home');
        },
    });

    const onSubmit = useCallback((form: LoginModel) => {
        login(form);
    }, [login]);

    return (
        <div
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
        >
            <Form
                name="authorization"
                className={styles.loginForm__form}
                onFinish={onSubmit}
                autoComplete="off"
                layout={'vertical'}
                disabled={isLoading}
            >
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Поле обязательно для ввода!' }]}
                >
                    <Input placeholder="Введите логин" size="large" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Поле обязательно для ввода!' }]}
                >
                    <Input.Password placeholder="Введите пароль" size="large" />
                </Form.Item>

                <Form.Item className={styles.loginForm__button}>
                    <Button type="primary" htmlType="submit" size="large"
                        disabled={isLoading}
                    >
                        Авторизоваться
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
});
