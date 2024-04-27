import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Record} from "../../record/entities/record.entity";
import {RecordTrigger} from "../../record_triggers/entities/record_trigger.entity";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    studentNickname: string;

    @Column()
    message: string;

    @Column({type: 'time'})
    time: string;

    @ManyToOne(() => Record, (record) => record.id)
    @JoinColumn({name: 'record_id'})
    record: Record;

    @OneToMany(() => RecordTrigger, (recordTrigger) => recordTrigger.comment, {nullable: true})
    @JoinColumn({name: 'triggers'})
    triggers: RecordTrigger[]
}
