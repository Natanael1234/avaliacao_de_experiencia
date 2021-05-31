import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, UpdateDateColumn, CreateDateColumn, ManyToOne, OneToOne } from "typeorm";
import { AvaliacaoExperiencia } from "./avaliacao-experiencia.entity";
import { Cliente } from "./cliente.entity";
import { Colaborador } from "./colaborador.entity";
import { Loja } from "./loja.entity";

@Entity()
export class TransacaoExperiencia extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, type: "double" })
    valor: number;

    @Column({ nullable: false, type: "timestamp" })
    data: Date;

    @CreateDateColumn({ type: "timestamp" })
    creationDate: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updateDate: Date;

    @ManyToOne(() => Cliente, cliente => cliente.transacaoExperiencia)
    cliente: Cliente;

    @Column({ type: 'int', nullable: true })
    clienteId?: number | null

    @ManyToOne(() => Loja, loja => loja.transacaoExperiencia)
    loja: Loja;

    @Column({ type: 'int', nullable: true })
    lojaId?: number | null

    @ManyToOne(() => Colaborador, colaborador => colaborador.transacaoExperiencia)
    colaborador: Colaborador;

    @Column({ type: 'int', nullable: true })
    colaboradorId?: number | null

    @OneToOne(() => AvaliacaoExperiencia, avaliacaoExperiencia => avaliacaoExperiencia.transacaoExperiencia)
    avaliacaoExperiencia: AvaliacaoExperiencia;

    static async build(data: any): Promise<TransacaoExperiencia> {
        const transacaoExperiencia = new TransacaoExperiencia();
        transacaoExperiencia.valor = data.valor;
        if (data.data) transacaoExperiencia.data = new Date(data.data);
        if (data.clienteId) transacaoExperiencia.clienteId = data.clienteId;
        if (data.lojaId) transacaoExperiencia.lojaId = data.lojaId;
        if (data.colaboradorId) transacaoExperiencia.colaboradorId = data.colaboradorId;
        return transacaoExperiencia;
    }

}
