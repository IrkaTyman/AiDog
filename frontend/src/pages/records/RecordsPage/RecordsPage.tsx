import { Button, Typography } from 'antd';
import { FC } from 'react';

import { CreateRecordModal } from '@features/record/ui/CreateRecordModal';

import { RecordsGrid } from '@entities/record';
import { useGetUser, UserHeader } from '@entities/user';

import Stars from '@shared/assets/icons/Stars.svg';
import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './RecordsPage.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{}>;

export const RecordsPage: FC<Props> = typedMemo(function RecordsPage({
    className,
    'data-testid': dataTestId = 'RecordsPage',
}) {
    const { data: user } = useGetUser();

    return (
        <div
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
        >
            <UserHeader />

            <div className={getBemClasses(styles, 'greeting')}>
                <Typography.Title>
                    С возвращением, {user?.firstName}
                </Typography.Title>

                <CreateRecordModal
                    triggerComponent={
                        open => (
                            <Button
                                onClick={open}
                                type="primary"
                                className={getBemClasses(styles, 'analysisButton')}
                                icon={<Stars className={getBemClasses(styles, 'analysisButtonIcon')} />}
                            >
                                Проанализировать запись
                            </Button>
                        )
                    }
                />
            </div>

            <Typography.Title className={getBemClasses(styles, 'recordsTitle')}>
                Список записей
            </Typography.Title>
            <RecordsGrid />
        </div>
    );
});
