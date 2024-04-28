import { Button, Typography } from 'antd';
import { FC, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { CreateReportModal } from '@features/record/ui/CreateReportModal';

import { RecordChat, RecordTriggersConsole, RecordTriggersCounts, useGetRecord } from '@entities/record';
import { RecordChatTimeline } from '@entities/record/ui/RecordChatTimeline';
import { RecordConclusions } from '@entities/record/ui/RecordConclusions';
import { RecordReportModal } from '@entities/record/ui/RecordReportModal';
import { UserHeader } from '@entities/user';

import Warning from '@shared/assets/icons/Warning.svg';
import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './RecordPage.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{}>;

export const RecordPage: FC<Props> = typedMemo(function RecordPage({
    className,
    'data-testid': dataTestId = 'RecordPage',
}) {
    const { id } = useParams<{id: string}>();
    const { data: record } = useGetRecord(id ?? '');
    const [commentIndex, setCommentIndex] = useState(0);
    const commentId = useMemo(() => record?.comments[commentIndex]?.id, [record, commentIndex]);

    return (
        <div
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
        >
            <UserHeader
                actions={
                    <Typography.Title className={getBemClasses(styles, 'name')}>
                        {record?.name}
                    </Typography.Title>
                }
            />

            <div className={getBemClasses(styles, 'outerGrid')}>
                <div className={getBemClasses(styles, 'analysis')}>
                    <div className={getBemClasses(styles, 'timelineWrapper')}>
                        <RecordChatTimeline
                            comments={record?.comments ?? []}
                            index={commentIndex}
                            setIndex={setCommentIndex}
                        />
                    </div>

                    <div className={getBemClasses(styles, 'innerGrid')}>
                        <RecordTriggersConsole
                            comments={record?.comments ?? []}
                            index={commentIndex}
                            setIndex={setCommentIndex}
                        />

                        <div className={getBemClasses(styles, 'statisticsWrapper')}>
                            <Typography.Title className={getBemClasses(styles, 'statisticsTitle')}>
                                Частота повторений
                            </Typography.Title>
                            <RecordTriggersCounts triggersCount={record?.triggersCount ?? []} />
                        </div>

                        <RecordConclusions />

                        {id
                            ? <div className={getBemClasses(styles, 'reports')}>
                                <RecordReportModal />
                                <CreateReportModal
                                    recordId={id}
                                    triggerComponent={
                                        open => (
                                            <Button
                                                type="primary"
                                                color="#722ED1"
                                                size="large"
                                                onClick={open}
                                                className={getBemClasses(styles, 'reportButton')}
                                            >
                                        Составить отчет
                                            </Button>
                                        )
                                    }
                                /></div>
                            : null}
                    </div>
                </div>
                <RecordChat
                    currentCommentId={commentId}
                    className={getBemClasses(styles, 'chat')}
                    comments={record?.comments ?? []}
                />
            </div>
        </div>
    );
});
