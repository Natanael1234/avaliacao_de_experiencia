import { Request, Response } from "express";
import express from 'express';
import { HttpError } from "../errors/http-error";
import { ResultSetDTO } from "../dto/paginationDTO";
import { TransacaoExperiencia } from "../entity/transacao-experiencia.entity";
import { Cliente } from "../entity/cliente.entity";
const transacaoExperienciaRouter = express.Router();

async function getCliente(clienteId: any) {
    if (!clienteId) throw new HttpError('Cliente indefinido', 400);
    let cliente = await Cliente.findOne({ where: { id: clienteId } });
    if (!cliente) throw new HttpError('Cliente não inexistente', 404);
    return cliente;
}

transacaoExperienciaRouter.post('/transacao-experiencia', async (req: Request, res: Response) => {
    try {
        let transacaoExperiencia;
        if (req.body.id) throw new HttpError('Transação/Experiência não deve ser especificada', 400);
        transacaoExperiencia = await TransacaoExperiencia.build(req.body);
        await transacaoExperiencia.save({ reload: true });
        return res.send(transacaoExperiencia);
    } catch (error) {
        console.error(error.message);
        return res.status(error['status'] || 500).send(error.message);
    }
});

transacaoExperienciaRouter.put('/transacao-experiencia', async (req: Request, res: Response) => {
    try {
        if (!req.body.id) throw new HttpError('Transação/Experiência não especificada', 400);
        let transacaoExperiencia = await TransacaoExperiencia.findOne({ where: { id: req.body.id } });
        if (!transacaoExperiencia) throw new HttpError('Transação/Experiência não encontrada', 404);
        if (req.body.valor) transacaoExperiencia.valor = req.body.valor;
        if (req.body.data) transacaoExperiencia.data = new Date(req.body.data);
        transacaoExperiencia.updateDate = new Date();
        await transacaoExperiencia.save({ reload: true });
        return res.send(transacaoExperiencia);
    } catch (error) {        
        console.error(error.message);
        return res.status(error['status'] || 500).send(error.message);
    }
});

transacaoExperienciaRouter.get('/cliente/:clienteId/transacoes-experiencias', async (req: Request, res: Response) => {
    try {
        let cliente = await getCliente(req.params.clienteId);
        let resultSet = ResultSetDTO.queryParamsToPaginationDTO<TransacaoExperiencia>(req.query);
        let transacoesExperiencias = await TransacaoExperiencia.findAndCount({
            take: resultSet.pageSize,
            skip: resultSet.offset,
            order: resultSet.order,
            where: { clienteId: cliente.id }
        });
        resultSet.list = <TransacaoExperiencia[]>transacoesExperiencias.map(transacaoExperiencia => transacaoExperiencia)[0];
        resultSet.total = <number>transacoesExperiencias[1];
        return res.send(resultSet);
    } catch (error) {
        console.error(error.message);
        return res.status(error['status'] || 500).send(error.message);
    }
});

export { transacaoExperienciaRouter };