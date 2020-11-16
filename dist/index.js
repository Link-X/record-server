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
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const KoaRouter = require("koa-router");
const bodyparser = require('koa-bodyparser');
const amqp_1 = require("./amqp");
const app = new Koa();
const router = new KoaRouter();
const accept = new amqp_1.amqpAccept({ acceptName: 'recordData' });
const send = new amqp_1.amqpSend();
app.use(bodyparser());
router.get('/', (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const msg = yield send.createChannel('recordData', 'hello world', 'success');
    ctx.body = msg.content.toString();
    next();
}));
app.on('error', (err) => {
    console.log(err);
});
app.use(router.routes()).use(router.allowedMethods()).listen(3001);
//# sourceMappingURL=index.js.map