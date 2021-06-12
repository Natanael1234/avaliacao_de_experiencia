

import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, UpdateDateColumn, CreateDateColumn, OneToOne, JoinColumn, BeforeUpdate } from "typeorm";
import { curDateWithoutTimezone } from "../../../utils/date.utils";
import { TransacoesExperiencia } from "../../transacoes-experiencias/entities/transacoes-experiencia.entity";

@Entity()
export class AvaliacoesExperiencia extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, type: "double" })
    nota: number;

    @Column({ nullable: false, unique: true, type: "varchar" })
    comentario: string;

    @CreateDateColumn({ type: "timestamp" })
    creationDate: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updateDate: Date;

    @OneToOne(() => TransacoesExperiencia, transacaoExperiencia => transacaoExperiencia.avaliacaoExperiencia)
    @JoinColumn()
    transacaoExperiencia: TransacoesExperiencia;

    @Column({ type: 'int', nullable: true })
    transacaoExperienciaId: number;

    @BeforeUpdate()
    async beforeUpdate() {
        this.updateDate = curDateWithoutTimezone();
    }

}
