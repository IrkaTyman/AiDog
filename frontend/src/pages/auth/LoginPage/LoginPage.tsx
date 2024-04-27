import { FC } from 'react';

import { LoginForm } from '@features/auth/ui/LoginForm';

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
            <LoginForm />
        </div>
    );
});
