import {Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Record} from "../../record/entities/record.entity";
import {Comment} from "../../comment/entities/comment.entity";
import {Trigger} from "../../trigger/entities/trigger.entity";

@Entity()
export class RecordTrigger {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Record, (record) => record.triggers, {nullable: true})
    @JoinColumn({ name: 'record'})
    record: Record

    @ManyToOne(() => Comment, (comment) => comment.triggers, {nullable: true})
    @JoinColumn({ name: 'comment'})
    comment: Comment

    @ManyToOne(() => Trigger, (trigger) => trigger.recordTriggers, {nullable: true})
    @JoinColumn({ name: 'trigger'})
    trigger: Trigger
}
