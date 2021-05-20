import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, UpdateDateColumn, CreateDateColumn, ManyToOne } from "typeorm";
import { HttpError } from "../errors/http-error";
import { Cliente } from "./cliente.entity";

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

    @ManyToOne(() => Cliente, cliente => cliente.transacoesExperiencias)
    cliente: Cliente;

    @Column({ type: 'int', nullable: true })
    clienteId?: number | null

    static async getCliente(clienteId: any) {
        if (!clienteId) throw new HttpError('Cliente indefinido', 400);
        let cliente = await Cliente.findOne({ where: { id: clienteId } });
        if (!cliente) throw new HttpError('Cliente não inexistente', 404);
        return cliente;
    }

    static async build(data: any): Promise<TransacaoExperiencia> {
        let transacaoExperiencia = new TransacaoExperiencia();
        transacaoExperiencia.valor = data.valor;
        if (data.data) transacaoExperiencia.data = new Date(data.data);
        if (data.clienteId) {
            transacaoExperiencia.cliente = await TransacaoExperiencia.getCliente(data.clienteId);
        }
        return transacaoExperiencia;
    }

}
