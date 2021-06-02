import { IsBoolean, MaxLength, MinLength, Validate } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, UpdateDateColumn, CreateDateColumn, OneToMany, BeforeInsert, BeforeUpdate } from "typeorm";
import { TransacaoExperiencia } from "./transacao-experiencia.entity";
import { RequiredValidator } from "./validators/required.validator";
import validateEntity from "./validators/validator";

@Entity()
export class Colaborador extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Validate(RequiredValidator, { message: 'Nome é obrigatório.' })
    @MinLength(6, { message: 'Nome deve ter no mínimo 6 caracteres.' })
    @MaxLength(60, { message: 'Nome deve ter no máximo 60 caracteres.' })
    @Column({ nullable: false, type: "text" })
    nome: string;

    @CreateDateColumn({ type: "timestamp" })
    creationDate: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updateDate: Date;

    @IsBoolean({ message: 'Formato de dados inválido.' })
    @Column({ type: 'boolean', nullable: false, default: true })
    ativo: boolean;

    @OneToMany(() => TransacaoExperiencia, transacaoExperiencia => transacaoExperiencia.colaborador)
    transacaoExperiencia: TransacaoExperiencia[];

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

    static async build(data: any): Promise<Colaborador> {
        const colaborador = new Colaborador();
        colaborador.nome = data.nome;
        if (data.ativo != undefined && data.ativo != null) colaborador.ativo = !!data.ativo;
        return colaborador;
    }

}
