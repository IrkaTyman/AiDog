import { Button, Modal, Tabs } from 'antd';
import { FC, useCallback, useState } from 'react';
import './style.css';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './RecordReportModal.module.css';
import { RecordDTO } from '../../model/RecordDTO';

export type Props = ClassNameProps & TestProps & Readonly<{
    reports: RecordDTO['reports'];
}>;

export const RecordReportModal: FC<Props> = typedMemo(function RecordReportModal({
    reports,
    className,
    'data-testid': dataTestId = 'RecordReportModal',
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentReportId, setCurrentReportId] = useState(reports[0].id);

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
                    activeKey={currentReportId}
                    className="RecordReportModalTabs"
                    items={reports.map(report => {
                        return {
                            label: `${report.user.firstName}`,
                            key: report.id,
                            children: report.report,
                        };
                    })}
                />
            </Modal>
        </>
    );
});
