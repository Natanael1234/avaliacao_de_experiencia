import "reflect-metadata";
import express from 'express';
import { Database } from "./database";
import { clienteRouter } from "./routes/cliente.route";
import { Server } from "http";
import { transacaoExperienciaRouter } from "./routes/transacao-experiencia.route";
import { avaliacaoExperienciaRouter } from "./routes/avaliacao-experiencia.route";
import { lojaRouter } from "./routes/loja.route";

const getServer = async () => {
    const app = express();
    app.use(express.json());
    await Database.initialize();
    app.use(clienteRouter);
    app.use(lojaRouter);
    app.use(transacaoExperienciaRouter);
    app.use(avaliacaoExperienciaRouter);
    let server = await app.listen(3000);
    console.log('Listening at PORT ', 3000);
    return server;
}

const closeServer = async (server: Server) => {
    await Database.connection.close();
    (await server).close();
    console.log('Server closed!');
}

export { getServer, closeServer };

