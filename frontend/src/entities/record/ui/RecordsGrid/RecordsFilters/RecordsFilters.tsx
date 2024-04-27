import { Dropdown, DropDownProps, MenuProps, Select, SelectProps, Tag, Tooltip } from 'antd';
import { FC, useCallback, useMemo, useState } from 'react';

import { useGetTriggerTypes } from '@entities/record/lib/useGetTriggerTypes';
import { RecordStatus } from '@entities/record/model/RecordStatus';
import { TriggerType } from '@entities/record/model/TriggerType';
import { TriggerTypeDTO } from '@entities/record/model/TriggerTypeDTO';

import Plus from '@shared/assets/icons/Plus.svg';
import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './RecordsFilters.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    status: RecordStatus;
    setStatus: (status: RecordStatus) => void;
    triggers: string[];
    setTriggers: (triggers: string[]) => void;
}>;

export const RecordsFilters: FC<Props> = typedMemo(function RecordsFilters({
    status,
    setStatus,
    triggers,
    setTriggers,
    className,
    'data-testid': dataTestId = 'RecordsFilters',
}) {
    const { data: types } = useGetTriggerTypes();

    const [statusOptions] = useState<SelectProps['options']>([
        { label: 'Не просмотренные', value: RecordStatus.New },
        { label: 'Просмотренные', value: RecordStatus.Old },
    ]);

    const selectedTriggers = useMemo(() =>
        types?.filter(({ id }) => triggers.includes(id)) ?? [],
    [triggers, types]);
    const triggersOptions = useMemo<MenuProps['items']>(
        () => types?.filter(({ id }) => !triggers.includes(id)).map(type => ({
            label: type.name,
            key: type.id,
        })) ?? [],
        [types, triggers],
    );

    const addTrigger = useCallback((id: string) => {
        setTriggers(triggers.concat(id));
    }, [setTriggers, triggers]);

    const deleteTrigger = useCallback((deletedId: string) => {
        setTriggers(triggers.filter(id => id !== deletedId));
    }, [setTriggers, triggers]);

    return (
        <div
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
        >
            <div>
                {selectedTriggers.map(type => {
                    const isLongTag = type.name.length > 20;
                    const tagElem = (
                        <Tag
                            key={type.id}
                            closable
                            style={{ userSelect: 'none' }}
                            onClose={() => deleteTrigger(type.id)}
                        >
                            {isLongTag ? `${type.name.slice(0, 20)}...` : type.name}
                        </Tag>
                    );
                    return isLongTag
                        ? (
                            <Tooltip title={type.name} key={type.id}>
                                {tagElem}
                            </Tooltip>
                        )
                        : (
                            tagElem
                        );
                })}
                <Dropdown
                    menu={{
                        items: triggersOptions,
                        onClick: ({ key }) => addTrigger(key),
                    }}
                    trigger={['click']}
                >
                    <Tag icon={<Plus />}>
                        New Tag
                    </Tag>
                </Dropdown>
            </div>

            <div>
                <Select
                    value={status}
                    style={{ width: 200 }}
                    onChange={setStatus}
                    options={statusOptions}
                />
            </div>
        </div>
    );
});
