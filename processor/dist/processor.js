"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Processor = void 0;
class Processor {
    constructor() {
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new Processor();
        }
        return this.instance;
    }
}
exports.Processor = Processor;
