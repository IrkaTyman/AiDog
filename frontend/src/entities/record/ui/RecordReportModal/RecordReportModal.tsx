import { Button, Form, Input, Modal, Tabs } from 'antd';
import { FC, useCallback, useState } from 'react';
import './style.css';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './RecordReportModal.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{}>;

export const RecordReportModal: FC<Props> = typedMemo(function RecordReportModal({
    className,
    'data-testid': dataTestId = 'RecordReportModal',
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentReportId, setCurrentReportId] = useState('null');

    const open = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const close = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    return (
        <>
            <Button type="text" onClick={open}>
                Показать отчеты
            </Button>
            <Modal
                title="Отчеты"
                open={isModalOpen}
                onOk={close}
                footer={null}
                onCancel={close}
                className={getBemClasses(styles, null, null, className)}
                data-testid={dataTestId}
            >
                <Tabs
                    onChange={setCurrentReportId}
                    type="card"
                    className="RecordReportModalTabs"
                    items={new Array(3).fill(null).map((_, i) => {
                        const id = String(i + 1);
                        return {
                            label: `Tab ${id}`,
                            key: id,
                            children: `Content of Tab Pane ${id}`,
                        };
                    })}
                />
            </Modal>
        </>
    );
});
