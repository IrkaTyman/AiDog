import { FC, useCallback, useEffect, useMemo } from 'react';

import { useGetRecords } from '@entities/record/lib/useGetRecords';
import { RecordStatus } from '@entities/record/model/RecordStatus';
import { RecordCard } from '@entities/record/ui/RecordsGrid/RecordCard';
import { RecordsFilters } from '@entities/record/ui/RecordsGrid/RecordsFilters';

import { useQueryParamState } from '@shared/hooks/useQueryParamState';
import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './RecordsGrid.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{}>;

export const RecordsGrid: FC<Props> = typedMemo(function RecordsGrid({
    className,
    'data-testid': dataTestId = 'RecordsGrid',
}) {
    const [status, setStatus] = useQueryParamState('status');
    const [triggersIds, setTriggersIds] = useQueryParamState('triggers');

    const parsedStatus = useMemo(() => status as RecordStatus, [status]);
    const parsedTriggers = useMemo(() => triggersIds?.split(',') ?? [], [triggersIds]);
    const setParsedTriggers = useCallback((triggers: string[]) => {
        setTriggersIds(triggers.join(','));
    }, []);

    const { data: records } = useGetRecords({ status: parsedStatus, triggers: parsedTriggers });

    useEffect(() => {
        setStatus(RecordStatus.New);
    }, []);

    return (
        <div
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
        >
            <RecordsFilters
                status={parsedStatus}
                setStatus={setStatus}
                triggers={parsedTriggers}
                setTriggers={setParsedTriggers}
            />

            <div className={getBemClasses(styles, 'records')}>
                {records?.map(record => <RecordCard record={record} />)}
            </div>
        </div>
    );
});
