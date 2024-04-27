import { Table, TableProps } from 'antd';
import { FC, ReactNode } from 'react';

import { useGetTriggerTypes } from '@entities/record';
import { TriggerTypeDTO } from '@entities/record/model/TriggerTypeDTO';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './TriggersTable.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    actions: (trigger: TriggerTypeDTO) => ReactNode;
}>;

const columns = (actions: (trigger: TriggerTypeDTO) => ReactNode): TableProps<TriggerTypeDTO>['columns'] => ([
    {
        title: 'Имя',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Описание',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Примеры',
        dataIndex: 'examples',
        key: 'examples',
    },
    {
        title: 'Цвет',
        key: 'color',
        dataIndex: 'color',
        render: color => (
            <div className={getBemClasses(styles, 'indicator')} style={{ backgroundColor: color }} />
        ),
    },
    {
        title: 'Тип',
        key: 'type',
        dataIndex: 'type',
    },
    {
        title: '',
        width: 150,
        key: 'action',
        render: (_, trigger) => actions(trigger),
    },
]);
export const TriggersTable: FC<Props> = typedMemo(function TriggersTable({
    actions,
    className,
    'data-testid': dataTestId = 'TriggersTable',
}) {
    const { data: triggers } = useGetTriggerTypes();
    return (
        <div
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
        >
            <Table columns={columns(actions)} dataSource={triggers ?? []} />
        </div>
    );
});
