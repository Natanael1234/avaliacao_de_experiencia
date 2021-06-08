
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, UpdateDateColumn, CreateDateColumn, OneToMany, BeforeUpdate, DeleteDateColumn } from "typeorm";
import { TransacoesExperiencia } from "../../transacoes-experiencias/entities/transacoes-experiencia.entity";


@Entity()
export class Cliente extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, type: "text" })
    nome: string;

    @Column({ nullable: true, unique: true, type: "varchar" })
    email: string;

    @Column({ nullable: false, type: "text" })
    telefone: string;

    @Column({ nullable: false, type: "text" })
    cpf: string;

    @CreateDateColumn({ type: "timestamp" })
    creationDate: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updateDate: Date;
    
    @DeleteDateColumn()
    deletedAt?: Date;

    @OneToMany(() => TransacoesExperiencia, transacaoExperiencia => transacaoExperiencia.cliente)
    transacoesExperiencias: TransacoesExperiencia[];

    @BeforeUpdate()
    async validateUpdate() {
        this.updateDate = new Date();        
    }

}
