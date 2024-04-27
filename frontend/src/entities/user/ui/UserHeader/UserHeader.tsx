import { Avatar, Button, Dropdown, Typography } from 'antd';
import { FC, ReactNode, useCallback, useMemo } from 'react';
import { useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';

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

    const menuItems = useMemo(() => ([
        { key: 'settings', label: <Link to="/admin/triggers">Настройки</Link> },
        {
            key: 'logout',
            label: <Button
                type="text"
                danger
                size="small"
                className={getBemClasses(styles, 'logout')}
                onClick={onLogout}
            >
                Выйти
            </Button>,
        },
    ]), [onLogout]);

    return (
        <div
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
        >
            <div className={getBemClasses(styles, 'logo')}>
                <Link to="/record">
                    <Logo className={getBemClasses(styles, 'logoIcon')} />
                </Link>
            </div>

            <div className={getBemClasses(styles, 'actions')}>
                {actions}
            </div>

            <div className={getBemClasses(styles, 'user')}>
                <div className={getBemClasses(styles, 'userData')}>
                    <Typography.Text className={getBemClasses(styles, 'name')}>
                        {user?.firstName} {user?.secondName}
                    </Typography.Text>
                </div>

                <Dropdown menu={{ items: menuItems }}>
                    <Avatar size={40} src={user?.avatarSrc} className={getBemClasses(styles, 'userAvatar')} />
                </Dropdown>
            </div>
        </div>
    );
});
