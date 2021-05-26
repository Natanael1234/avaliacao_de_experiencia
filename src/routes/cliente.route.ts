import { Request, Response } from "express";
import express from 'express';
import { Cliente } from "../entity/cliente.entity";
import { HttpError } from "../errors/http-error";
import { ResultSetDTO } from "../dto/paginationDTO";
const clienteRouter = express.Router();

clienteRouter.post('/cliente', async (req: Request, res: Response) => {
    try {
        let cliente;
        if (req.body.id) throw new HttpError('Cliente não deve ser especificado', 400);
        cliente = await Cliente.build(req.body);
        await cliente.save();
        return res.send(cliente)
    } catch (error) {
        console.error(error.message);
        return res.status(error['status'] || 500).send(error.message);
    }
});

clienteRouter.put('/cliente', async (req: Request, res: Response) => {
    try {
        if (!req.body.id) throw new HttpError('Cliente não especificado', 400);
        let cliente = await Cliente.findOne({ where: { id: req.body.id } });
        if (!cliente) throw new HttpError('Cliente indefinido', 404);
        if (req.body.nome) cliente.nome = req.body.nome;
        if (req.body.email) cliente.email = req.body.email;
        if (req.body.telefone) cliente.telefone = req.body.telefone;
        if (req.body.cpf) cliente.cpf = req.body.cpf;
        if (req.body.ativo != undefined && req.body.ativo != null) cliente.ativo = !!req.body.ativo;
        cliente.updateDate = new Date();
        await cliente.save({ reload: true });
        return res.send(cliente)
    } catch (error) {
        console.error(error.message);
        return res.status(error['status'] || 500).send(error.message);
    }
});

clienteRouter.get('/clientes', async (req: Request, res: Response) => {
    try {
        let resultSet = ResultSetDTO.queryParamsToPaginationDTO<Cliente>(req.query);
        let where: any = {};
        if (req.query.ativo == 'true') where.ativo = true;
        else if (req.query.ativo == 'false') where.ativo = false;
        else if (req.query.ativo != undefined) throw new HttpError('Parâmetro inválido', 400);
        let clientes = await Cliente.findAndCount({
            take: resultSet.pageSize,
            skip: resultSet.offset,
            order: resultSet.order, 
            where
        });
        resultSet.list = <Cliente[]>clientes.map(cliente => cliente)[0];
        resultSet.total = <number>clientes[1];
        return res.send(resultSet);
    } catch (error) {
        console.error(error.message);
        return res.status(error['status'] || 500).send(error.message);
    }
});

clienteRouter.delete('/cliente/:clienteId', async (req: Request, res: Response) => {
    try {
        if (!req.params.clienteId) throw new HttpError('Cliente indefinido', 400);
        let clienteId = Number(req.params.clienteId);
        let cliente = await Cliente.findOne({ where: { id: clienteId } });
        if (!cliente) throw new HttpError('Cliente não encontrado', 404);
        cliente.updateDate = new Date();
        cliente.ativo = false;
        await cliente.save({ reload: true });
        return res.send(cliente);
    } catch (error) {
        console.error(error.message);
        return res.status(error['status'] || 500).send(error.message);
    }
})

export { clienteRouter };