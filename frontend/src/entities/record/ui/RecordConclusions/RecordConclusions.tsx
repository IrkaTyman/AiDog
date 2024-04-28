import { Typography } from 'antd';
import { FC, useCallback } from 'react';

import { TriggerDTO, TriggerTypeDTO, useGetTriggerTypes } from '@entities/record';
import { RecordTriggerCountDTO } from '@entities/record/model/RecordTriggerCountDTO';

import ChevronDown from '@shared/assets/icons/ChevronDown.svg';
import DoubleChevronDown from '@shared/assets/icons/DoubleChevronDown.svg';
import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './RecordConclusions.module.css';
import { RecordDTO } from '../../model/RecordDTO';
import { TriggerType } from '../../model/TriggerType';

export type Props = ClassNameProps & TestProps & Readonly<{
    results: RecordDTO['results'];
    triggersCounts: RecordDTO['triggersCount'];
    commentsCount: number;
}>;

export const RecordConclusions: FC<Props> = typedMemo(function RecordConclusions({
    results,
    triggersCounts,
    commentsCount,
    className,
    'data-testid': dataTestId = 'RecordConclusions',
}) {
    const { data: triggers } = useGetTriggerTypes();

    const getTrigger = useCallback((findedId: string) => {
        return triggers?.find(({ id }) => id === findedId) ?? null;
    }, [triggers]);

    const getTriggerType = useCallback((count: number) => {
        const percent = Math.floor(count / commentsCount * 100);
        let type: string = 'low';

        if (percent > 40) {
            type = 'highest';
        } else if (percent > 20) {
            type = 'high';
        } else if (percent > 10) {
            type = 'low';
        } else {
            type = 'lowest';
        }
        return type;
    }, [commentsCount]);

    return (
        <div
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
        >
            <div className={getBemClasses(styles, 'triggers')}>
                {triggersCounts.map(trigger => {
                    const triggerType = getTrigger(trigger.trigger);
                    if (!triggerType) {
                        return null;
                    }

                    const type = getTriggerType(Number(trigger.count));
                    return (
                        <div className={getBemClasses(styles, 'trigger', { level: type, type: triggerType.type })} key={trigger.trigger}>
                            {
                                type === 'lowest' || type === 'highest'
                                    ? <DoubleChevronDown className={getBemClasses(styles, 'triggerIcon')} />
                                    : <ChevronDown className={getBemClasses(styles, 'triggerIcon')} />
                            }
                            <Typography.Text className={getBemClasses(styles, 'triggerName')}>
                                {triggerType.name}
                            </Typography.Text>
                        </div>);
                })}
            </div>

            <div className={getBemClasses(styles, 'conclusions')}>
                {results.map((result, i) => (
                    <div className={getBemClasses(styles, 'conclusion')} key={result.id}>
                        <Typography.Title className={getBemClasses(styles, 'conclusionTitle')}>
                            {i + 1} рекомендация
                        </Typography.Title>
                        <Typography.Text className={getBemClasses(styles, 'conclusionText')}>
                            {result.result}
                        </Typography.Text>
                    </div>
                ))}
            </div>
        </div>
    );
});
