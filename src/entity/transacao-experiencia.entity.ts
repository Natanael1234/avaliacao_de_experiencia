import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, UpdateDateColumn, CreateDateColumn, ManyToOne, OneToOne } from "typeorm";
import { HttpError } from "../errors/http-error";
import { AvaliacaoExperiencia } from "./avaliacao-experiencia";
import { Cliente } from "./cliente.entity";
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

    @OneToOne(() => AvaliacaoExperiencia, avaliacaoExperiencia => avaliacaoExperiencia.transacaoExperiencia) 
    avaliacaoExperiencia: AvaliacaoExperiencia;

    static async getCliente(clienteId: any) {
        if (!clienteId) throw new HttpError('Cliente indefinido', 400);
        let cliente = await Cliente.findOne({ where: { id: clienteId } });        
        if (!cliente) throw new HttpError('Cliente inexistente', 404);
        return cliente;
    }

    static async getLoja(lojaId: any) {
        if (!lojaId) throw new HttpError('Loja indefinida', 400);
        let loja = await Loja.findOne({ where: { id: lojaId } });        
        if (!loja) throw new HttpError('Loja não inexistente', 404);
        return loja;
    }

    static async build(data: any): Promise<TransacaoExperiencia> {
        let transacaoExperiencia = new TransacaoExperiencia();
        transacaoExperiencia.valor = data.valor;
        if (data.data) transacaoExperiencia.data = new Date(data.data);
        if (data.clienteId) {
            transacaoExperiencia.cliente = await TransacaoExperiencia.getCliente(data.clienteId);
        }
        if (data.lojaId) {
            transacaoExperiencia.loja = await TransacaoExperiencia.getLoja(data.lojaId);
        }
        return transacaoExperiencia;
    }

}
