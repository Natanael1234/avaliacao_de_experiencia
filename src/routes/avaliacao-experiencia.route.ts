import { NextFunction, Request, Response } from "express";
import express from 'express';
import { ResultSetDTO } from "../dto/paginationDTO";
import { BadRequestError } from "../errors/bad-request.error";
import { AvaliacaoExperiencia } from "../entity/avaliacao-experiencia.entity";
const avaliacaoExperienciaRouter = express.Router();

avaliacaoExperienciaRouter.post('/avaliacao-experiencia', async (req: Request, res: Response, next: NextFunction) => {
    if (req.body.id) return next(new BadRequestError('A avaliação de experiência não deve ser especificada'));
    const avaliacaoExperiencia = await AvaliacaoExperiencia.build(req.body);
    avaliacaoExperiencia
        .save({ reload: true })
        .then((entity) => res.send(entity))
        .catch(next);
});

avaliacaoExperienciaRouter.get('/avaliacoes-experiencias', async (req: Request, res: Response) => {
    const resultSet = ResultSetDTO.queryParamsToPaginationDTO<AvaliacaoExperiencia>(req.query);    
    const avaliacoesExperiencias = await AvaliacaoExperiencia.findAndCount({
        take: resultSet.pageSize,
        skip: resultSet.offset,
        order: resultSet.order
    });
    resultSet.list = <AvaliacaoExperiencia[]>avaliacoesExperiencias.map(avaliacaoExperiencia => avaliacaoExperiencia)[0];
    resultSet.total = <number>avaliacoesExperiencias[1];
    res.send(resultSet);
});

export { avaliacaoExperienciaRouter };