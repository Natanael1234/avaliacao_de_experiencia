import "reflect-metadata";
import express, { NextFunction } from 'express';
import { Database } from "./database";
import { clienteRouter } from "./routes/cliente.route";
import { Server } from "http";
import { transacaoExperienciaRouter } from "./routes/transacao-experiencia.route";
import { avaliacaoExperienciaRouter } from "./routes/avaliacao-experiencia.route";
import { lojaRouter } from "./routes/loja.route";
import { colaboradorRouter } from "./routes/colaborador.route";
import errorMiddleware from "./middleware/error.middleware";
import logErrorMiddleware from "./middleware/log-erros.middleware";

const getServer = async () => {
    const app = express();
    app.use(express.json());
    await Database.initialize();
    app.use(clienteRouter);
    app.use(colaboradorRouter);
    app.use(lojaRouter);
    app.use(transacaoExperienciaRouter);
    app.use(avaliacaoExperienciaRouter);
    app.use(errorMiddleware);
    app.use(logErrorMiddleware);
    const server = await app.listen(3000);
    server.on('error', (error)=>{
        console.log("################")
        console.error(error)
    })
    console.log('Listening at PORT ', 3000);
    return server;
}

const closeServer = async (server: Server) => {
    await Database.connection.close();
    (await server).close();
    console.log('Server closed!');
}

export { getServer, closeServer };

