import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Record} from "../../record/entities/record.entity";

@Entity()
export class Result {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    result: string;

    @ManyToOne(() => Record, (record) => record.id, {nullable: true})
    @JoinColumn({ name: 'record'})
    record: Record
}
