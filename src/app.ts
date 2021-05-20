import "reflect-metadata";
import express from 'express';
import { Database } from "./database";
import { clienteRouter } from "./routes/cliente.route";
import { Server } from "http";
import { transacaoExperienciaRouter } from "./routes/transacao-experiencia.route";

const getServer = async () => {
    const app = express();
    app.use(express.json());
    await Database.initialize();
    app.use(clienteRouter);
    app.use(transacaoExperienciaRouter);
    let server = await app.listen(5000);
    console.log('Listening at PORT ', 5000);
    return server;
}

const closeServer = async (server: Server) => {
    await Database.connection.close();
    (await server).close();
    console.log('Server closed!');
}

export { getServer, closeServer };

