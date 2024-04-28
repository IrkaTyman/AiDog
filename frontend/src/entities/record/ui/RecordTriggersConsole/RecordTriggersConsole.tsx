import {FC} from 'react';

import {RecordDTO} from '@entities/record/model/RecordDTO';

import {getBemClasses, typedMemo} from '@shared/lib';
import {ClassNameProps, TestProps} from '@shared/types';

import styles from './RecordTriggersConsole.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    comments: RecordDTO['comments'];
    index: number;
    setIndex: (index: number) => void;
}>;

export const RecordTriggersConsole: FC<Props> = typedMemo(
    function RecordTriggersConsole({
       comments,
       index,
       setIndex,
       className,
       'data-testid': dataTestId = 'RecordTriggersConsole',
   }) {
        return (
            <div
                className={getBemClasses(styles, null, null, className)}
                data-testid={dataTestId}
            >
                <p className={getBemClasses(styles, 'header')}>
                    Консоль триггеров
                </p>

                <div className={getBemClasses(styles, 'scrollBlock')}>
                    {comments.map((comment, cIndex) => (
                        comment.triggers.length === 0
                            ? null
                            : comment.triggers.map(trigger => (
                                <div
                                    className={getBemClasses(styles, 'trigger')}
                                    onClick={() => setIndex(cIndex)}
                                    style={{borderColor: trigger.trigger.type === "bad" ? "#f5222d" : "#52c41a"}}
                                >
                                    <div className={getBemClasses(styles, 'triggerTitle')}>
                                        <div className={getBemClasses(styles, 'indicator')}
                                             style={{backgroundColor: trigger.trigger.color}}/>
                                        <p className={getBemClasses(styles, 'name')}>{trigger.trigger.name}</p>
                                    </div>
                                    <p className={getBemClasses(styles, 'time')}>{comment.time}</p>
                                </div>
                            ))
                    ))}
                </div>
            </div>
        );
    });
