import { Button, Form, Input, Modal, Select, SelectProps } from 'antd';
import { FC, useCallback, useState } from 'react';
import { useQueryClient } from 'react-query';

import { useCreateReport } from '@features/record/lib/useCreateReport';
import { useEditTrigger } from '@features/record/lib/useEditTrigger';
import { CreateReportModel } from '@features/record/model/CreateReportModel';

import { TriggerType } from '@entities/record/model/TriggerType';
import { TriggerTypeDTO } from '@entities/record/model/TriggerTypeDTO';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './EditTriggerModal.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    trigger: TriggerTypeDTO;
}>;

export const EditTriggerModal: FC<Props> = typedMemo(function EditTriggerModal({
    trigger,
    className,
    'data-testid': dataTestId = 'EditTriggerModal',
}) {
    const queryClient = useQueryClient();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { mutate: edit, isLoading } = useEditTrigger({
        onSuccess: () => {
            queryClient.resetQueries(['triggers/get']);
            setIsModalOpen(false);
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

    const onSubmit = useCallback((form: TriggerTypeDTO) => {
        edit({ ...trigger, ...form });
    }, [edit, trigger]);

    return (
        <>
            <Button type={'text'} onClick={open}>
                Изменить
            </Button>
            <Modal
                title="Изменение триггера"
                open={isModalOpen}
                onOk={close}
                onCancel={close}
                footer={null}
                className={getBemClasses(styles, null, null, className)}
                data-testid={dataTestId}
            >
                <Form
                    name="editTrigger"
                    className={getBemClasses(styles, 'form')}
                    onFinish={onSubmit}
                    autoComplete="off"
                    layout={'vertical'}
                    initialValues={trigger}
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
                        name="examples"
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
                        <Select placeholder="Выберите тип" size="large" options={typeOptions} />
                    </Form.Item>

                    <Form.Item className={getBemClasses(styles, 'ButtonContainer')}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            disabled={isLoading}
                        >
                            Изменить
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
});
