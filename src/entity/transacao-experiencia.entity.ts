import { IsDate, IsInt, Validate } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, UpdateDateColumn, CreateDateColumn, ManyToOne, OneToOne, BeforeInsert, BeforeUpdate } from "typeorm";
import { AvaliacaoExperiencia } from "./avaliacao-experiencia.entity";
import { Cliente } from "./cliente.entity";
import { Colaborador } from "./colaborador.entity";
import { Loja } from "./loja.entity";
import { RequiredValidator } from "./validators/required.validator";
import validateEntity from "./validators/validator";

@Entity()
export class TransacaoExperiencia extends BaseEntity {


    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, type: "double" })
    valor: number;

    @Validate(RequiredValidator, { message: 'Data é obrigatório.' })
    @IsDate({ message: 'formato de Data inválido.' })
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

    @BeforeInsert()
    async validateInsert() {
        try {
            await validateEntity(this);
        } catch (error) {
            throw error;
        }
    }
    @BeforeUpdate()
    async validateUpdate() {
        this.updateDate = new Date();
        await validateEntity(this);
    }

    static async build(data: any): Promise<TransacaoExperiencia> {
        const transacaoExperiencia = new TransacaoExperiencia();
        transacaoExperiencia.id = data.id;
        return transacaoExperiencia;
    }

    setData(data: any) {
        if (!this.hasId()) {
            this.id = data.id;
        }
        if (data.valor !== undefined) this.valor = data.valor;
        if (data.data !== undefined) this.data = new Date(data.data);
        if (data.clienteId !== undefined) this.clienteId = data.clienteId;
        if (data.lojaId !== undefined) this.lojaId = data.lojaId;
        if (data.colaboradorId !== undefined) this.colaboradorId = data.colaboradorId;
        return this;
    }

}
