import { BadRequestError } from "../errors/bad-request.error";

/** Objeto de transferência de dados de paginação. */
export class ResultSetDTO<Type> {

    /** Número da página começando em 1. Mínimo 1. Por padrão 1. */
    page: number = 1;

    /** Quantidade de itens da página. Mínimo 1. Máximo 100. Por padrão 10. */
    pageSize: number = 10;

    offset: number;

    order: any;

    total: number = 0;

    list: Type[] = [];

    public static build<T>(data: { page: number, pageSize: number, order?: any }): ResultSetDTO<T> {
        const resultSetDTO = new ResultSetDTO<T>();
        resultSetDTO.order = data.order;
        resultSetDTO.page = Math.max(1, data.page || 1);
        resultSetDTO.pageSize = Math.max(1, Math.min(data.pageSize || 10, 100));
        resultSetDTO.offset = (resultSetDTO.page - 1) * resultSetDTO.pageSize;
        return resultSetDTO;
    }

    /**
     * @param query dados do corpo da requisição http a serem convertidos em paginação.     
     * @returns ResultSet de paginação.
     */
    public static queryParamsToPaginationDTO<T>(query: any): ResultSetDTO<T> {
        const page = query.page ? Number(query.page) : 1;
        const pageSize = query.pageSize ? Number(query.pageSize) : 10;
        const orderBy: string = query.orderBy;
        const orderDirection: 'ASC' | 'DESC' = query.orderDirection;
        const order: any = {};
        if (orderBy) {
            // if (!['ASC', 'DESC', '', undefined].includes(orderDirection)) {
            //     throw new BadRequestError('Sentido de ordenação inválido');
            // }
            order.orderBy = orderDirection;
        } 
        // else if (orderDirection) {
        //     throw new BadRequestError('Campo de ordenação inválido');
        // }
        return ResultSetDTO.build<T>({
            page,
            pageSize: Number(pageSize),
            order
        });
    }
}


