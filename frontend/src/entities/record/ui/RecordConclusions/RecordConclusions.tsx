import { Typography } from 'antd';
import { FC, useCallback } from 'react';

import { TriggerType } from '@entities/record/model/TriggerType';

import ChevronDown from '@shared/assets/icons/ChevronDown.svg';
import DoubleChevronDown from '@shared/assets/icons/DoubleChevronDown.svg';
import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './RecordConclusions.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{}>;

export const RecordConclusions: FC<Props> = typedMemo(function RecordConclusions({
    className,
    'data-testid': dataTestId = 'RecordConclusions',
}) {
    const getTriggerType = useCallback((trigger: any) => {
        let type: string = trigger.level;

        switch (trigger.level) {
            case 'lowest':
                type = trigger.type === TriggerType.Bad ? 'highest' : 'lowest';
                break;
            case 'low':
                type = trigger.type === TriggerType.Bad ? 'high' : 'low';
                break;
            case 'high':
                type = trigger.type === TriggerType.Bad ? 'low' : 'high';
                break;
            case 'highest':
                type = trigger.type === TriggerType.Bad ? 'lowest' : 'highest';
                break;
        }

        return type;
    }, []);

    return (
        <div
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
        >
            <div className={getBemClasses(styles, 'triggers')}>
                {[{ type: TriggerType.Good, level: 'low', name: 'Name', id: 'dawdaw' }].map(trigger => {
                    const type = getTriggerType(trigger);
                    return (
                        <div className={getBemClasses(styles, 'trigger', { level: type })} key={trigger.id}>
                            {
                                type === 'lowest' || type === 'highest'
                                    ? <DoubleChevronDown className={getBemClasses(styles, 'triggerIcon')} />
                                    : <ChevronDown className={getBemClasses(styles, 'triggerIcon')} />
                            }
                            <Typography.Text className={getBemClasses(styles, 'triggerName')}>
                                {trigger.name}
                            </Typography.Text>
                        </div>);
                })}
            </div>

            <div className={getBemClasses(styles, 'conclusions')}>
                {['daefdsefsefse'].map((conclusion, i) => (
                    <div className={getBemClasses(styles, 'conclusion')} key={i}>
                        <Typography.Title className={getBemClasses(styles, 'conclusionTitle')}>
                            {i + 1} рекомендация
                        </Typography.Title>
                        <Typography.Text className={getBemClasses(styles, 'conclusionText')}>
                            {conclusion}
                        </Typography.Text>
                    </div>
                ))}
            </div>
        </div>
    );
});
