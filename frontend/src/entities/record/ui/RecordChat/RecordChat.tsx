import { Typography } from 'antd';
import { FC, useEffect, useRef } from 'react';

import { RecordDTO } from '@entities/record/model/RecordDTO';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './RecordChat.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    currentCommentId?: string;
    comments: RecordDTO['comments'];
}>;

export const RecordChat: FC<Props> = typedMemo(function RecordChat({
    currentCommentId,
    comments,
    className,
    'data-testid': dataTestId = 'RecordChat',
}) {
    const commentsScrollBlock = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!commentsScrollBlock.current || !currentCommentId) {
            return;
        }

        commentsScrollBlock.current.querySelector(`#comment-${currentCommentId}`)?.scrollIntoView();
    }, [currentCommentId]);

    return (
        <div
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
        >
            <Typography.Title className={getBemClasses(styles, 'title')}>
                Чат вебинара
            </Typography.Title>

            <div
                className={getBemClasses(styles, 'scrollBox')}
                ref={commentsScrollBlock}
            >
                {comments.map(comment => (
                    <div
                        key={comment.id}
                        className={getBemClasses(styles, comment.id === currentCommentId ? 'comment_select' : 'comment', )}
                        id={`comment-${comment.id}`}
                    >
                        <div className={getBemClasses(styles, 'info')}>
                            <Typography.Text className={getBemClasses(styles, 'user')}>
                                {comment.studentNickname}
                            </Typography.Text>

                            <Typography.Text className={getBemClasses(styles, 'time')}>
                                {comment.time}
                            </Typography.Text>
                        </div>

                        <Typography.Text className={getBemClasses(styles, 'message')}>
                            {comment.message}
                        </Typography.Text>
                    </div>
                ))}
            </div>
        </div>
    );
});
