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
const amqp_send_1 = require("./amqp-send");
const amqp_accept_1 = require("./amqp-accept");
const app = new Koa();
const router = new KoaRouter();
const send = new amqp_send_1.default();
const accept = new amqp_accept_1.default();
app.use(bodyparser());
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield accept.accept('hello');
}))();
router.get('/', (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const msg = yield send.createChannel('hello', 'hello world', 'success');
    console.log('msg', msg);
    ctx.body = msg.content.toString();
}));
app.on('error', (err) => {
    console.log(err);
});
app.use(router.routes()).use(router.allowedMethods()).listen(3001);
//# sourceMappingURL=index.js.map