import {Image, Tag, Typography} from 'antd';
import React, {FC} from 'react';

import Check from '@shared/assets/icons/Check.svg';
import LeftText from '@shared/assets/icons/LeftText.svg';
import Warning from '@shared/assets/icons/Warning.svg';
import {getBemClasses, typedMemo} from '@shared/lib';
import {ClassNameProps, TestProps} from '@shared/types';

import styles from './RecordCard.module.css';
import {RecordViewDTO} from '../../../model/RecordViewDTO';
import {TriggerType} from '../../../model/TriggerType';
import {Link} from "react-router-dom";

export type Props = ClassNameProps & TestProps & Readonly<{
    record: RecordViewDTO;
}>;

export const RecordCard: FC<Props> = typedMemo(function RecordCard({
   record,
   className,
   'data-testid': dataTestId = 'RecordCard',
}) {
    return (
        <Link to={record.id} className={getBemClasses(styles, 'link')}>
            <div className={getBemClasses(styles, null, null, className)}
                 data-testid={dataTestId}
            >
                <div className={getBemClasses(styles, 'imageWrapper')}>
                    <Image
                        preview={false}
                        className={getBemClasses(styles, 'image')}
                        src={record.previewSrc}
                        fallback=""
                        width="100%"
                    />
                </div>
                <div className={getBemClasses(styles, 'info')}>
                    <Typography.Title className={getBemClasses(styles, 'name')}>
                        {record.name}
                    </Typography.Title>

                    <div className={getBemClasses(styles, 'triggers')}>
                        {record.triggerTypes.map(type => {
                            const color = type.type === TriggerType.Bad ? '#EC4747' : '#73D13D';
                            return (
                                <Tag color={color} className={getBemClasses(styles, 'trigger')}>
                                    {type.type === TriggerType.Bad
                                        ? <Warning className={getBemClasses(styles, 'triggerIcon')}/>
                                        : <Check className={getBemClasses(styles, 'triggerIcon')}/>
                                    }
                                    <Typography.Text>
                                        {type.count}
                                    </Typography.Text>
                                </Tag>
                            );
                        })}
                        <Tag color="#8D6CEA" className={getBemClasses(styles, 'trigger')}>
                            <LeftText className={getBemClasses(styles, 'triggerIcon')}/>
                            <Typography.Text>
                                {record.commentsCount}
                            </Typography.Text>
                        </Tag>
                    </div>
                </div>
            </div>
        </Link>
    );
});
