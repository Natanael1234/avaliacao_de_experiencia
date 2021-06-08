import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, UpdateDateColumn, CreateDateColumn, OneToMany, BeforeUpdate, DeleteDateColumn } from "typeorm";
import { TransacoesExperiencia } from "../../transacoes-experiencias/entities/transacoes-experiencia.entity";

@Entity()
export class Loja extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, type: "text" })
    nome: string;

    @CreateDateColumn({ type: "timestamp" })
    creationDate: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updateDate: Date;
    
    @DeleteDateColumn()
    deletedAt?: Date;

    @OneToMany(() => TransacoesExperiencia, transacaoExperiencia => transacaoExperiencia.loja)
    transacoesExperiencias: TransacoesExperiencia[];

    @BeforeUpdate()
    async validateUpdate() {console.log('#$%¨&*¨%$¨&*')
        this.updateDate = new Date();        
    }

}
