import { Button, Typography } from 'antd';
import { FC, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import { CreateRecordModal } from '@features/record/ui/CreateRecordModal';

import { RecordsGrid, useGetTriggerTypes } from '@entities/record';
import { RecordStatus } from '@entities/record/model/RecordStatus';
import { TriggerType } from '@entities/record/model/TriggerType';
import { useGetUser, UserHeader } from '@entities/user';

import Stars from '@shared/assets/icons/Stars.svg';
import Warning from '@shared/assets/icons/Warning.svg';
import GreetingBackground from '@shared/assets/images/greetingBackground.svg';
import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './RecordsPage.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{}>;

export const RecordsPage: FC<Props> = typedMemo(function RecordsPage({
    className,
    'data-testid': dataTestId = 'RecordsPage',
}) {
    const { data: user } = useGetUser();
    const { data: triggers } = useGetTriggerTypes();
    const [searchParams, setSearchParams] = useSearchParams();

    const showWarningRecord = useCallback(() => {
        const status = RecordStatus.New;
        const triggersIds = triggers
            ?.filter(({ type }) => type === TriggerType.Bad)
            .map(({ id }) => id)
            .join(',') ?? '';

        searchParams.set('status', status);
        if (triggersIds.length > 0) {
            searchParams.set('triggers', triggersIds ?? '');
        } else {
            searchParams.delete('triggers');
        }

        setSearchParams(searchParams);
    }, [triggers, searchParams, setSearchParams]);

    return (
        <div
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
        >
            <UserHeader
                actions={
                    <Button
                        type="primary"
                        danger
                        icon={<Warning />}
                        onClick={showWarningRecord}
                    >
                        Внимание! Записи, требующие вашего внимания
                    </Button>
                }
            />

            <div className={getBemClasses(styles, 'greeting')}>
                <GreetingBackground className={getBemClasses(styles, 'greetingBackground')} />
                <Typography.Title className={getBemClasses(styles, 'greetingTitle')}>
                    👋 С возвращением, {user?.firstName}
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

            <div className={getBemClasses(styles, 'recordsContainer')}>
                <Typography.Title className={getBemClasses(styles, 'recordsTitle')}>
                    Список записей
                </Typography.Title>
                <RecordsGrid />
            </div>
        </div>
    );
});
