"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transacaoExperienciaRouter = void 0;
var express_1 = __importDefault(require("express"));
var http_error_1 = require("../errors/http-error");
var paginationDTO_1 = require("../dto/paginationDTO");
var transacao_experiencia_entity_1 = require("../entity/transacao-experiencia.entity");
var cliente_entity_1 = require("../entity/cliente.entity");
var transacaoExperienciaRouter = express_1.default.Router();
exports.transacaoExperienciaRouter = transacaoExperienciaRouter;
function getCliente(clienteId) {
    return __awaiter(this, void 0, void 0, function () {
        var cliente;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!clienteId)
                        throw new http_error_1.HttpError('Cliente indefinido', 400);
                    return [4 /*yield*/, cliente_entity_1.Cliente.findOne({ where: { id: clienteId } })];
                case 1:
                    cliente = _a.sent();
                    if (!cliente)
                        throw new http_error_1.HttpError('Cliente não inexistente', 404);
                    return [2 /*return*/, cliente];
            }
        });
    });
}
transacaoExperienciaRouter.post('/transacao-experiencia', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var transacaoExperiencia, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                transacaoExperiencia = void 0;
                if (req.body.id)
                    throw new http_error_1.HttpError('Transação/Experiência não deve ser especificada', 400);
                return [4 /*yield*/, transacao_experiencia_entity_1.TransacaoExperiencia.build(req.body)];
            case 1:
                transacaoExperiencia = _a.sent();
                return [4 /*yield*/, transacaoExperiencia.save({ reload: true })];
            case 2:
                _a.sent();
                return [2 /*return*/, res.send(transacaoExperiencia)];
            case 3:
                error_1 = _a.sent();
                console.error(error_1.message);
                return [2 /*return*/, res.status(error_1['status'] || 500).send(error_1.message)];
            case 4: return [2 /*return*/];
        }
    });
}); });
transacaoExperienciaRouter.put('/transacao-experiencia', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var transacaoExperiencia, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                if (!req.body.id)
                    throw new http_error_1.HttpError('Transação/Experiência não especificada', 400);
                return [4 /*yield*/, transacao_experiencia_entity_1.TransacaoExperiencia.findOne({ where: { id: req.body.id } })];
            case 1:
                transacaoExperiencia = _a.sent();
                if (!transacaoExperiencia)
                    throw new http_error_1.HttpError('Transação/Experiência não encontrada', 404);
                if (req.body.valor)
                    transacaoExperiencia.valor = req.body.valor;
                if (req.body.data)
                    transacaoExperiencia.data = new Date(req.body.data);
                transacaoExperiencia.updateDate = new Date();
                return [4 /*yield*/, transacaoExperiencia.save({ reload: true })];
            case 2:
                _a.sent();
                return [2 /*return*/, res.send(transacaoExperiencia)];
            case 3:
                error_2 = _a.sent();
                console.error(error_2.message);
                return [2 /*return*/, res.status(error_2['status'] || 500).send(error_2.message)];
            case 4: return [2 /*return*/];
        }
    });
}); });
transacaoExperienciaRouter.get('/cliente/:clienteId/transacoes-experiencias', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var cliente, resultSet, transacoesExperiencias, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, getCliente(req.params.clienteId)];
            case 1:
                cliente = _a.sent();
                resultSet = paginationDTO_1.ResultSetDTO.queryParamsToPaginationDTO(req.query);
                return [4 /*yield*/, transacao_experiencia_entity_1.TransacaoExperiencia.findAndCount({
                        take: resultSet.pageSize,
                        skip: resultSet.offset,
                        order: resultSet.order,
                        where: { clienteId: cliente.id }
                    })];
            case 2:
                transacoesExperiencias = _a.sent();
                resultSet.list = transacoesExperiencias.map(function (transacaoExperiencia) { return transacaoExperiencia; })[0];
                resultSet.total = transacoesExperiencias[1];
                return [2 /*return*/, res.send(resultSet)];
            case 3:
                error_3 = _a.sent();
                console.error(error_3.message);
                return [2 /*return*/, res.status(error_3['status'] || 500).send(error_3.message)];
            case 4: return [2 /*return*/];
        }
    });
}); });
