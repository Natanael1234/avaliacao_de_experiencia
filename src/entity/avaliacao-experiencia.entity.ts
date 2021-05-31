import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, UpdateDateColumn, CreateDateColumn, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { ConflictError } from "../errors/conflict.error";
import { NotFoundError } from "../errors/not-found.error";

import { TransacaoExperiencia } from "./transacao-experiencia.entity";

@Entity()
export class AvaliacaoExperiencia extends BaseEntity {

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

    @OneToOne(() => TransacaoExperiencia, transacaoExperiencia => transacaoExperiencia.avaliacaoExperiencia)
    @JoinColumn()
    transacaoExperiencia: TransacaoExperiencia;

    @Column({ type: 'int', nullable: true })
    transacaoExperienciaId?: number | null;

    static async build(data: any): Promise<AvaliacaoExperiencia> {
        const avaliacaoExperiencia = new AvaliacaoExperiencia();
        avaliacaoExperiencia.nota = data.nota;
        avaliacaoExperiencia.comentario = data.comentario;
        if (data.transacaoExperienciaId) {
            avaliacaoExperiencia.transacaoExperienciaId = data.transacaoExperienciaId;
        }
        return avaliacaoExperiencia;
    }

}
