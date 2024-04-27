import { Button, Form, Input, Modal } from 'antd';
import { FC, ReactNode, useCallback, useState } from 'react';
import { useQueryClient } from 'react-query';

import { useCreateRecord } from '@features/record/lib/useCreateRecord';
import { CreateRecordModel } from '@features/record/model/CreateRecordModel';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './CreateRecordModal.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    triggerComponent: (open: () => void) => ReactNode;
}>;

export const CreateRecordModal: FC<Props> = typedMemo(function CreateRecordModal({
    triggerComponent,
    className,
    'data-testid': dataTestId = 'CreateRecordModal',
}) {
    const queryClient = useQueryClient();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { mutate: create, isLoading } = useCreateRecord({
        onSuccess: () => {
            queryClient.resetQueries('records/get');
        },
    });

    const open = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const close = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    const onSubmit = useCallback((form: CreateRecordModel) => {
        create(form);
    }, [create]);

    return (
        <>
            {triggerComponent(open)}
            <Modal
                title="Анализ записи"
                open={isModalOpen}
                onOk={close}
                onCancel={close}
                className={getBemClasses(styles, null, null, className)}
                data-testid={dataTestId}
            >
                <Form
                    name="createRecord"
                    className={getBemClasses(styles, 'form')}
                    onFinish={onSubmit}
                    autoComplete="off"
                    layout={'vertical'}
                    disabled={isLoading}
                >
                    <Form.Item
                        name="name"
                        rules={[{ required: true, message: 'Поле обязательно для ввода!' }]}
                    >
                        <Input placeholder="Введите название записи" size="large" />
                    </Form.Item>

                    <Form.Item name="previewSrc">
                        <Input placeholder="Вставьте ссылку на превью" size="large" />
                    </Form.Item>

                    <Form.Item className={getBemClasses(styles, 'ButtonContainer')}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            disabled={isLoading}
                        >
                            Проанализировать
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
});
