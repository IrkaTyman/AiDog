import {Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Comment} from "../../comment/entities/comment.entity";
import {RecordTrigger} from "../../record_triggers/entities/record_trigger.entity";


export enum RecordStatus {
    NEW = "new",
    OLD = "old"
}

@Entity()
export class Record {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    previewSrc: string;

    @Column({
        type: "enum",
        enum: ["new", "old"],
        default: "new"
    })
    status: RecordStatus;

    @OneToMany(() => Comment, (comment) => comment.record)
    comments: Comment[];

    @OneToMany(() => RecordTrigger, (recordTrigger) => recordTrigger.record, {nullable: true})
    @JoinColumn({name: 'triggers'})
    triggers: RecordTrigger[]
}
