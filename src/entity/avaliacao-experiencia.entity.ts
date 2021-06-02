import { IsNumber, MaxLength, MinLength, Validate } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, UpdateDateColumn, CreateDateColumn, OneToMany, OneToOne, JoinColumn, BeforeInsert, BeforeUpdate } from "typeorm";
import { TransacaoExperiencia } from "./transacao-experiencia.entity";
import { RequiredValidator } from "./validators/required.validator";
import validateEntity from "./validators/validator";

@Entity()
export class AvaliacaoExperiencia extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @IsNumber({}, { message: "Nota deve ser numérica." })
    @Validate(RequiredValidator, { message: 'Nota é obrigatória.' })
    @Column({ nullable: false, type: "double" })
    nota: number;

    @Validate(RequiredValidator, { message: 'Comentário é obrigatório.' })
    @MinLength(6, { message: 'Comentário deve ter no mínimo 6 caracteres.' })
    @MaxLength(60, { message: 'Comentário deve ter no máximo 60 caracteres.' })
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
