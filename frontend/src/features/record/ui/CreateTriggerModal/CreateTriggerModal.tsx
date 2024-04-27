import { Button, Form, Input, Modal, Select, SelectProps } from 'antd';
import { FC, ReactNode, useCallback, useState } from 'react';
import { useQueryClient } from 'react-query';

import { useCreateReport } from '@features/record/lib/useCreateReport';
import { CreateReportModel } from '@features/record/model/CreateReportModel';

import { TriggerType } from '@entities/record/model/TriggerType';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './CreateTriggerModal.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    triggerComponent: (open: () => void) => ReactNode;
}>;

export const CreateTriggerModal: FC<Props> = typedMemo(function CreateTriggerModal({
    triggerComponent,
    className,
    'data-testid': dataTestId = 'CreateTriggerModal',
}) {
    const queryClient = useQueryClient();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { mutate: create, isLoading } = useCreateReport({
        onSuccess: () => {
            queryClient.resetQueries('records/get');
        },
    });

    const [typeOptions] = useState<SelectProps['options']>([
        { label: 'Плохой', value: TriggerType.Bad },
        { label: 'Хороший', value: TriggerType.Good },
        { label: 'Нейтральный', value: TriggerType.Neutral },
    ]);

    const open = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const close = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    const onSubmit = useCallback((form: CreateReportModel) => {
        create(form);
    }, [create]);

    return (
        <>
            {triggerComponent(open)}
            <Modal
                title="Создание триггера"
                open={isModalOpen}
                onOk={close}
                onCancel={close}
                className={getBemClasses(styles, null, null, className)}
                data-testid={dataTestId}
            >
                <Form
                    name="createTrigger"
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
                        <Input placeholder="Введите название" size="large" />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        rules={[{ required: true, message: 'Поле обязательно для ввода!' }]}
                    >
                        <Input.TextArea placeholder="Введите описание" size="large" />
                    </Form.Item>

                    <Form.Item
                        name="example"
                        rules={[{ required: true, message: 'Поле обязательно для ввода!' }]}
                    >
                        <Input.TextArea placeholder="Введите примеры тригеров" size="large" />
                    </Form.Item>

                    <Form.Item
                        name="color"
                        rules={[{ required: true, message: 'Поле обязательно для ввода!' }]}
                    >
                        <Input placeholder="Введите цвет тега, наример #000000" size="large" />
                    </Form.Item>

                    <Form.Item
                        name="type"
                        rules={[{ required: true, message: 'Поле обязательно для ввода!' }]}
                    >
                        <Select placeholder="Напишите отчет" size="large" options={typeOptions} />
                    </Form.Item>

                    <Form.Item className={getBemClasses(styles, 'ButtonContainer')}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            disabled={isLoading}
                        >
                            Создать
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
});
