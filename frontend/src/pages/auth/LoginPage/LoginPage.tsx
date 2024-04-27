import { Typography } from 'antd';
import { FC } from 'react';

import { LoginForm } from '@features/auth/ui/LoginForm';

import Dog from '@shared/assets/images/dog.svg';
import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './LoginPage.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{}>;

export const LoginPage: FC<Props> = typedMemo(function LoginPage({
    className,
    'data-testid': dataTestId = 'LoginPage',
}) {
    return (
        <div
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
        >
            <Dog className={getBemClasses(styles, 'logo')} />
            <Typography.Title className={getBemClasses(styles, 'logoTitle')}>
                AI Chat Inspector
            </Typography.Title>
            <LoginForm className={getBemClasses(styles, 'form')} />
        </div>
    );
});
