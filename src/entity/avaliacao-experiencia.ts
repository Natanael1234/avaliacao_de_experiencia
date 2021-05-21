import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, UpdateDateColumn, CreateDateColumn, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { HttpError } from "../errors/http-error";
import { transacaoExperienciaRouter } from "../routes/transacao-experiencia.route";

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
        let avaliacaoExperiencia = new AvaliacaoExperiencia();
        avaliacaoExperiencia.nota = data.nota;
        avaliacaoExperiencia.comentario = data.comentario;
        if (data.transacaoExperienciaId) {
            let avaliacaoExperienciaExistente = await AvaliacaoExperiencia.findOne({ where: { transacaoExperienciaId: data.transacaoExperienciaId } })
            if (avaliacaoExperienciaExistente) throw new HttpError('Avaliação de experiência já cadastrada', 409);
            let transacaoExperiencia = await TransacaoExperiencia.findOne({ where: { id: data.transacaoExperienciaId } });
            if (!transacaoExperiencia) throw new HttpError('Transação/Experiência não encontrada', 404);
            avaliacaoExperiencia.transacaoExperiencia = transacaoExperiencia;
        }
        return avaliacaoExperiencia;
    }

}
