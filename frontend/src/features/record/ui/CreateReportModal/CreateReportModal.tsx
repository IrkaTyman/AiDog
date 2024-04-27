import { Button, Form, Input, Modal } from 'antd';
import { FC, ReactNode, useCallback, useState } from 'react';
import { useQueryClient } from 'react-query';

import { useCreateRecord } from '@features/record/lib/useCreateRecord';
import { useCreateReport } from '@features/record/lib/useCreateReport';
import { CreateRecordModel } from '@features/record/model/CreateRecordModel';
import { CreateReportModel } from '@features/record/model/CreateReportModel';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './CreateReportModal.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    recordId: string;
    triggerComponent: (open: () => void) => ReactNode;
}>;

export const CreateReportModal: FC<Props> = typedMemo(function CreateReportModal({
    triggerComponent,
    recordId,
    className,
    'data-testid': dataTestId = 'CreateReportModal',
}) {
    const queryClient = useQueryClient();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { mutate: create, isLoading } = useCreateReport({
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

    const onSubmit = useCallback((form: CreateReportModel) => {
        create({ ...form, recordId });
    }, [create, recordId]);

    return (
        <>
            {triggerComponent(open)}
            <Modal
                title="Создание отчета"
                open={isModalOpen}
                onOk={close}
                onCancel={close}
                className={getBemClasses(styles, null, null, className)}
                data-testid={dataTestId}
            >
                <Form
                    name="createReport"
                    className={getBemClasses(styles, 'form')}
                    onFinish={onSubmit}
                    autoComplete="off"
                    layout={'vertical'}
                    disabled={isLoading}
                >
                    <Form.Item
                        name="report"
                        rules={[{ required: true, message: 'Поле обязательно для ввода!' }]}
                    >
                        <Input.TextArea placeholder="Напишите отчет" size="large" />
                    </Form.Item>

                    <Form.Item className={getBemClasses(styles, 'ButtonContainer')}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            disabled={isLoading}
                        >
                            Отправить
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
});
