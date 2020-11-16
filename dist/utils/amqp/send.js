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
const UUID = require("uuid");
const base_1 = require("./base");
class amqpSend extends base_1.default {
    constructor() {
        super();
        this.createChannel = (msgName, msg, backName) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                yield this.connect();
                const ch = yield this.conn.createChannel();
                yield ch.assertQueue(backName, { durable: false });
                ch.consume(backName, (backMsg) => {
                    resolve(backMsg);
                    ch.close();
                }, { noAck: true });
                ch.sendToQueue(msgName, Buffer.from(JSON.stringify(msg)), {
                    replyTo: backName,
                    correlationId: UUID.v1(),
                });
            }));
        });
    }
}
exports.default = amqpSend;
//# sourceMappingURL=send.js.map