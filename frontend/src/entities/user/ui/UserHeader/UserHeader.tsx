import { Avatar, Button, Typography } from 'antd';
import { FC, ReactNode, useCallback } from 'react';
import { useQueryClient } from 'react-query';

import { useAuthContext } from '@app/providers/AuthProvider/AuthProvider';

import Logo from '@shared/assets/icons/Logo.svg';
import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './UserHeader.module.css';
import { useGetUser } from '../../lib/useGetUser';

export type Props = ClassNameProps & TestProps & Readonly<{
    actions?: ReactNode;
}>;

export const UserHeader: FC<Props> = typedMemo(function UserHeader({
    actions,
    className,
    'data-testid': dataTestId = 'UserHeader',
}) {
    const queryClient = useQueryClient();
    const { data: user } = useGetUser();
    const { logout } = useAuthContext();

    const onLogout = useCallback(() => {
        logout();
        queryClient.resetQueries(['user/get-profile']);
    }, [queryClient, logout]);

    return (
        <div
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
        >
            <div className={getBemClasses(styles, 'logo')}>
                <Logo className={getBemClasses(styles, 'logoIcon')} />
            </div>

            <div className={getBemClasses(styles, 'actions')}>
                {actions}
            </div>

            <div className={getBemClasses(styles, 'user')}>
                <div className={getBemClasses(styles, 'userData')}>
                    <Typography.Text className={getBemClasses(styles, 'name')}>
                        {user?.firstName} {user?.secondName}
                    </Typography.Text>
                    <Button
                        type="text"
                        danger
                        size="small"
                        onClick={onLogout}
                    >
                        Выйти
                    </Button>
                </div>
                <Avatar src={user?.avatarSrc} className={getBemClasses(styles, 'userAvatar')} />
            </div>
        </div>
    );
});
