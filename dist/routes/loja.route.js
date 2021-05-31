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
exports.lojaRouter = void 0;
var express_1 = __importDefault(require("express"));
var paginationDTO_1 = require("../dto/paginationDTO");
var loja_entity_1 = require("../entity/loja.entity");
var bad_request_error_1 = require("../errors/bad-request.error");
var not_found_error_1 = require("../errors/not-found.error");
var lojaRouter = express_1.default.Router();
exports.lojaRouter = lojaRouter;
lojaRouter.post('/loja', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var loja;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (req.body.id)
                    return [2 /*return*/, next(new bad_request_error_1.BadRequestError('Loja não deve ser especificada'))];
                return [4 /*yield*/, loja_entity_1.Loja.build(req.body)];
            case 1:
                loja = _a.sent();
                loja
                    .save()
                    .then(function (entity) { return res.send(entity); })
                    .catch(next);
                return [2 /*return*/];
        }
    });
}); });
lojaRouter.put('/loja', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var loja;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.id)
                    return [2 /*return*/, next(new bad_request_error_1.BadRequestError('Loja indefinida'))];
                return [4 /*yield*/, loja_entity_1.Loja.findOne({ where: { id: req.body.id } })];
            case 1:
                loja = _a.sent();
                if (!loja)
                    return [2 /*return*/, next(new not_found_error_1.NotFoundError('Loja não encontrada'))];
                if (req.body.nome)
                    loja.nome = req.body.nome;
                if (req.body.ativa != undefined && req.body.ativa != null)
                    loja.ativa = !!req.body.ativa;
                loja.updateDate = new Date();
                loja
                    .save()
                    .then(function (entity) { return res.send(entity); })
                    .catch(next);
                return [2 /*return*/];
        }
    });
}); });
lojaRouter.get('/lojas', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var where, resultSet, lojas;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                where = {};
                if (req.query.ativa == 'true')
                    where.ativa = true;
                else if (req.query.ativa == 'false')
                    where.ativa = false;
                else if (req.query.ativa != undefined)
                    return [2 /*return*/, next(new bad_request_error_1.BadRequestError('Parâmetro inválido'))];
                resultSet = paginationDTO_1.ResultSetDTO.queryParamsToPaginationDTO(req.query);
                return [4 /*yield*/, loja_entity_1.Loja.findAndCount({
                        take: resultSet.pageSize,
                        skip: resultSet.offset,
                        order: resultSet.order,
                        where: where
                    })];
            case 1:
                lojas = _a.sent();
                resultSet.list = lojas.map(function (loja) { return loja; })[0];
                resultSet.total = lojas[1];
                res.send(resultSet);
                return [2 /*return*/];
        }
    });
}); });
lojaRouter.delete('/loja/:lojaId', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var lojaId, loja;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.params.lojaId)
                    return [2 /*return*/, next(new bad_request_error_1.BadRequestError('Loja indefinida'))];
                lojaId = Number(req.params.lojaId);
                return [4 /*yield*/, loja_entity_1.Loja.findOne({ where: { id: lojaId } })];
            case 1:
                loja = _a.sent();
                if (!loja)
                    return [2 /*return*/, next(new not_found_error_1.NotFoundError('Loja não encontrada'))];
                loja.updateDate = new Date();
                loja.ativa = false;
                loja
                    .save()
                    .then(function (entity) { return res.send(entity); })
                    .catch(next);
                return [2 /*return*/];
        }
    });
}); });
