import { Connection, createConnection, Repository } from "typeorm";
import { Cliente } from "./entity/cliente.entity";

/** Acesso a base de dados. */
export class Database {

    /** Conexão com a base de dados. */
    public static connection: Connection;
    /** Repositório de usuários. */
    public static userRepository: Repository<Cliente>;

    /** Inicializa a base de dados. */
    public static async initialize() {
        // cria a conexão com a base de dados.
        this.connection = await createConnection();
        // obtém o repositório de usuários.
        this.userRepository = this.connection.getRepository(Cliente);
    }

    public static async recreateDatabase() {
        try {
            console.log('Recriando a base de dados...');
            await this.connection.dropDatabase();
            await this.connection.synchronize();
            console.log('Base de dados Recriada.');
        } catch (error) {
            console.error('Falha ao recriar base de dados.');
            throw error;
        }
    }

}