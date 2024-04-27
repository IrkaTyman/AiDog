import { FC } from 'react';

import { RecordsGrid } from '@entities/record/ui/RecordsGrid';
import { UserHeader } from '@entities/user/ui/UserHeader';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './RecordsPage.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{}>;

export const RecordsPage: FC<Props> = typedMemo(function RecordsPage({
    className,
    'data-testid': dataTestId = 'RecordsPage',
}) {
    return (
        <div
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
        >
            <UserHeader />
            <RecordsGrid />
        </div>
    );
});
