import { Request, Response } from "express";
import express from 'express';
import { HttpError } from "../errors/http-error";
import { ResultSetDTO } from "../dto/paginationDTO";
import { Colaborador } from "../entity/colaborador.entity";
const colaboradorRouter = express.Router();

colaboradorRouter.post('/colaborador', async (req: Request, res: Response) => {
    try {
        let colaborador;
        if (req.body.id) throw new HttpError('Colaborador não deve ser especificado', 400);
        colaborador = await Colaborador.build(req.body);
        await colaborador.save();
        return res.send(colaborador)
    } catch (error) {
        console.error(error.message);
        return res.status(error['status'] || 500).send(error.message);
    }
});

colaboradorRouter.put('/colaborador', async (req: Request, res: Response) => {
    try {
        if (!req.body.id) throw new HttpError('Colaborador não especificado', 400);
        let colaborador = await Colaborador.findOne({ where: { id: req.body.id } });
        if (!colaborador) throw new HttpError('Colaborador indefinido', 404);
        if (req.body.nome) colaborador.nome = req.body.nome;
        if (req.body.ativo != undefined && req.body.ativo != null) colaborador.ativo = !!req.body.ativo;
        colaborador.updateDate = new Date();
        await colaborador.save({ reload: true });
        return res.send(colaborador)
    } catch (error) {
        console.error(error.message);
        return res.status(error['status'] || 500).send(error.message);
    }
});

colaboradorRouter.get('/colaboradores', async (req: Request, res: Response) => {
    try {
        let resultSet = ResultSetDTO.queryParamsToPaginationDTO<Colaborador>(req.query);        
        let colaboradores = await Colaborador.findAndCount({
            take: resultSet.pageSize,
            skip: resultSet.offset,
            order: resultSet.order
        });
        resultSet.list = <Colaborador[]>colaboradores.map(colaborador => colaborador)[0];
        resultSet.total = <number>colaboradores[1];
        return res.send(resultSet);
    } catch (error) {
        console.error(error.message);
        return res.status(error['status'] || 500).send(error.message);
    }
});

colaboradorRouter.delete('/colaborador/:colaboradorId', async (req: Request, res: Response) => {
    try {
        if (!req.params.colaboradorId) throw new HttpError('Colaborador indefinido', 400);
        let colaboradorId = Number(req.params.colaboradorId);
        let colaborador = await Colaborador.findOne({ where: { id: colaboradorId } });
        if (!colaborador) throw new HttpError('Colaborador não encontrado', 404);
        colaborador.ativo = false;
        colaborador.updateDate = new Date();
        await colaborador.save({ reload: true });
        return res.send(colaborador);
    } catch (error) {
        console.error(error.message);
        return res.status(error['status'] || 500).send(error.message);
    }
})

export { colaboradorRouter };