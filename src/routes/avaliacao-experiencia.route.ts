import { Request, Response } from "express";
import express from 'express';
import { HttpError } from "../errors/http-error";
import { ResultSetDTO } from "../dto/paginationDTO";
import { AvaliacaoExperiencia } from "../entity/avaliacao-experiencia";
const avaliacaoExperienciaRouter = express.Router();

avaliacaoExperienciaRouter.post('/avaliacao-experiencia', async (req: Request, res: Response) => {
    try {
        let avaliacaoExperiencia;
        if (req.body.id) throw new HttpError('A avaliação de experiência não deve ser especificada', 400);
        avaliacaoExperiencia = await AvaliacaoExperiencia.build(req.body);
        await avaliacaoExperiencia.save({ reload: true });
        return res.send(avaliacaoExperiencia);
    } catch (error) {
        console.error(error.message);
        return res.status(error['status'] || 500).send(error.message);
    }
});

avaliacaoExperienciaRouter.get('/avaliacoes-experiencias', async (req: Request, res: Response) => {
    try {
        let resultSet = ResultSetDTO.queryParamsToPaginationDTO<AvaliacaoExperiencia>(req.query);
        let avaliacoesExperiencias = await AvaliacaoExperiencia.findAndCount({
            take: resultSet.pageSize,
            skip: resultSet.offset,
            order: resultSet.order
        });
        resultSet.list = <AvaliacaoExperiencia[]>avaliacoesExperiencias.map(avaliacaoExperiencia => avaliacaoExperiencia)[0];
        resultSet.total = <number>avaliacoesExperiencias[1];
        return res.send(resultSet);
    } catch (error) {
        console.error(error.message);
        return res.status(error['status'] || 500).send(error.message);
    }
});

export { avaliacaoExperienciaRouter };