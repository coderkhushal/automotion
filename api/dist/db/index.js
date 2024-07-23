"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbManager = void 0;
const client_1 = require("@prisma/client");
class DbManager {
    constructor() {
        this.client = new client_1.PrismaClient();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new DbManager();
        }
        return this.instance;
    }
    getClient() {
        return this.client;
    }
}
exports.DbManager = DbManager;
