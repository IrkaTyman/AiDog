import {Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {RecordTrigger} from "../../record_triggers/entities/record_trigger.entity";


export enum TriggerTypes {
    GOOD = "good",
    BAD = "bad",
    NEUTRAL = "neutral"
}

@Entity()
export class Trigger {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    examples: string;

    @Column()
    color: string;

    @Column({
        type: "enum",
        enum: ["good", "bad", "neutral"],
        default: "neutral"
    })
    type: TriggerTypes;

    @OneToMany(() => RecordTrigger, (recordTrigger) => recordTrigger.id, {nullable: true})
    @JoinColumn({name: 'triggers'})
    recordTriggers: RecordTrigger[]
}
