import { Button, Typography } from 'antd';
import { FC } from 'react';

import { CreateTriggerModal } from '@features/record/ui/CreateTriggerModal';
import { DeleteTriggerButton } from '@features/record/ui/DeleteTriggerButton';
import { EditTriggerModal } from '@features/record/ui/EditTriggerModal';

import { TriggersTable } from '@entities/record/ui/TriggersTable';
import { UserHeader } from '@entities/user';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './TriggersPage.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{}>;

export const TriggersPage: FC<Props> = typedMemo(function TriggersPage({
    className,
    'data-testid': dataTestId = 'TriggersPage',
}) {
    return (
        <div
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
        >
            <UserHeader />
            <div className={getBemClasses(styles, 'content')}>
                <Typography.Title className={getBemClasses(styles, 'title')}>
                    Триггеры
                </Typography.Title>

                <CreateTriggerModal triggerComponent={
                    open => (
                        <Button type="primary" onClick={open}>
                            Добавить триггер
                        </Button>
                    )
                }
                />

                <TriggersTable actions={
                    trigger => !trigger.isDefault
                        ? trigger.isActive
                            ? (
                                <div className={getBemClasses(styles, 'actions')}>
                                    <EditTriggerModal trigger={trigger} />
                                    <DeleteTriggerButton trigger={trigger} />
                                </div>
                            )
                            : <Typography.Text>Удален</Typography.Text>
                        : null
                }
                />
            </div>
        </div>
    );
});
