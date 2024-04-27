import { Badge, Image, Typography } from 'antd';
import { FC } from 'react';

import Check from '@shared/assets/icons/Check.svg';
import LeftText from '@shared/assets/icons/LeftText.svg';
import Warning from '@shared/assets/icons/Warning.svg';
import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './RecordCard.module.css';
import { RecordViewDTO } from '../../../model/RecordViewDTO';
import { TriggerType } from '../../../model/TriggerType';

export type Props = ClassNameProps & TestProps & Readonly<{
    record: RecordViewDTO;
}>;

export const RecordCard: FC<Props> = typedMemo(function RecordCard({
    record,
    className,
    'data-testid': dataTestId = 'RecordCard',
}) {
    return (
        <div className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
        >
            <div className={getBemClasses(styles, 'imageWrapper')}>
                <Image
                    className={getBemClasses(styles, 'image')}
                    src={record.previewSrc}
                    fallback=""
                />
            </div>
            <div className={getBemClasses(styles, 'info')}>
                <Typography.Title className={getBemClasses(styles, 'name')}>
                    {record.name}
                </Typography.Title>

                <div className={getBemClasses(styles, 'triggers')}>
                    {record.triggerTypes.map(type => {
                        const color = type.type === TriggerType.Bad ? 'red' : 'green';
                        return (
                            <Badge
                                color={color}
                                count={<>
                                    {type.type === TriggerType.Bad
                                        ? <Warning className={getBemClasses(styles, 'triggerIcon')} />
                                        : <Check className={getBemClasses(styles, 'triggerIcon')} />
                                    }
                                    <Typography.Text>
                                        {type.count}
                                    </Typography.Text>
                                </>}
                            />
                        );
                    })}
                    <Badge
                        color="purple"
                        count={<>
                            <LeftText className={getBemClasses(styles, 'triggerIcon')} />
                            <Typography.Text>
                                {-1}
                            </Typography.Text>
                        </>}
                    />
                </div>
            </div>
        </div>
    );
});
