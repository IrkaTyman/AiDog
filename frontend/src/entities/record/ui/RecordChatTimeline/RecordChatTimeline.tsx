import {Slider, SliderSingleProps, Tooltip} from 'antd';
import { FC, useEffect, useMemo, useRef, useState } from 'react';

import { RecordDTO } from '@entities/record/model/RecordDTO';

import Timeline from '@shared/assets/images/timelinePath.png';
import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './RecordChatTimeline.module.css';
import './style.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    comments: RecordDTO['comments'];
    index: number;
    setIndex: (index: number) => void;
}>;

export const RecordChatTimeline: FC<Props> = typedMemo(function RecordChatTimeline({
    comments,
    index,
    setIndex,
    className,
    'data-testid': dataTestId = 'RecordChatTimeline',
}) {
    const sliderWrapper = useRef<HTMLDivElement>(null);
    const [maxWidth, setMaxWidth] = useState(0);
    const pathWidth = useMemo(() => maxWidth / (comments.length - 1), [maxWidth, comments]);

    useEffect(() => {
        setTimeout(() => {
            setMaxWidth(sliderWrapper.current?.clientWidth ?? 0);
        }, 1000);
    }, [sliderWrapper]);

    return (
        <div
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
            ref={sliderWrapper}
            style={{ backgroundImage: `url(${Timeline})` }}
        >
            <Slider
                className={getBemClasses(styles, 'slider', null, 'RecordChatTimelineSlider')}
                value={index}
                onChange={setIndex}
                min={1}
                tooltip={{open: true}}
                max={comments.length}
            />
            {comments.map((comments, i) => (
                comments.triggers.length === 0
                    ? null
                    : <div
                        style={{ left: `${pathWidth * i - 3.5}px` }}
                        className={getBemClasses(styles, 'trigger', { type: comments.triggers[0].trigger.type })}
                    />
            ))}
        </div>
    );
});
