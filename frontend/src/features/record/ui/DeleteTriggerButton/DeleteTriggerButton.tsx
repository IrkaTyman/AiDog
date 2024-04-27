import { Button } from 'antd';
import { FC, useCallback, MouseEvent } from 'react';
import { useQueryClient } from 'react-query';

import { useDeleteTrigger } from '@features/record/lib/useDeleteTrigger';

import { TriggerTypeDTO } from '@entities/record/model/TriggerTypeDTO';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './DeleteTriggerButton.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    trigger: TriggerTypeDTO;
}>;

export const DeleteTriggerButton: FC<Props> = typedMemo(function DeleteTriggerButton({
    className,
    trigger,
    'data-testid': dataTestId = 'DeleteTriggerButton',
}) {
    const queryClient = useQueryClient();
    const { mutate: deleteTrigger, isLoading } = useDeleteTrigger({
        onSuccess: () => {
            queryClient.resetQueries(['triggers/get']);
        },
    });

    const onDelete = useCallback((event: MouseEvent) => {
        event.preventDefault();
        const canDelete = confirm(`Удалить триггер ${trigger.name}?`);
        if (!canDelete) {
            return;
        }
        console.log('delete');
        deleteTrigger(trigger.id);
    }, [deleteTrigger, trigger]);

    return (
        <Button
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
            type="text"
            danger
            loading={isLoading}
            disabled={isLoading}
            onClick={onDelete}
        >
            Удалить
        </Button>
    );
});
