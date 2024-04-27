import { Avatar } from 'antd';
import { FC, ReactNode } from 'react';

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
    const { data: user } = useGetUser();

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
                <Avatar src={user?.avatarSrc} className={getBemClasses(styles, 'userAvatar')} />
            </div>
        </div>
    );
});
