import { FC, useCallback } from 'react';

import { useGetTriggerTypes } from '@entities/record/lib/useGetTriggerTypes';
import { RecordDTO } from '@entities/record/model/RecordDTO';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './RecordTriggersCounts.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    triggersCount: RecordDTO['triggersCount'];
}>;

export const RecordTriggersCounts: FC<Props> = typedMemo(function RecordTriggersCounts({
    triggersCount,
    className,
    'data-testid': dataTestId = 'RecordTriggersCounts',
}) {
    const { data: triggers } = useGetTriggerTypes();

    const getTrigger = useCallback((findedId: string) => {
        return triggers?.find(({ id }) => id === findedId) ?? null;
    }, [triggers]);

    return (
        <div
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
        >
            {triggersCount.map(triggerCount => {
                const trigger = getTrigger(triggerCount.trigger);

                if (!trigger) {
                    return null;
                }
                return (
                    <div className={getBemClasses(styles, 'countItem')}>
                        <div className={getBemClasses(styles, 'colorIndicator')} />
                        <p className={getBemClasses(styles, 'name')}>{trigger.name}</p>
                        <p className={getBemClasses(styles, 'count')}>{triggerCount.count}</p>
                    </div>
                );
            })}
        </div>
    );
});
