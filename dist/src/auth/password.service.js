"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordService = void 0;
const common_1 = require("@nestjs/common");
const node_crypto_1 = require("node:crypto");
const node_util_1 = require("node:util");
const scryptAsync = (0, node_util_1.promisify)(node_crypto_1.scrypt);
let PasswordService = class PasswordService {
    async hashPassword(password) {
        const salt = (0, node_crypto_1.randomBytes)(16).toString('hex');
        const derivedKey = (await scryptAsync(password, salt, 64));
        return `scrypt$${salt}$${derivedKey.toString('hex')}`;
    }
    async verifyPassword(password, storedHash) {
        const parts = storedHash.split('$');
        if (parts.length !== 3 || parts[0] !== 'scrypt') {
            return false;
        }
        const salt = parts[1];
        const expectedHex = parts[2];
        if (!salt || !expectedHex) {
            return false;
        }
        const expectedBuffer = Buffer.from(expectedHex, 'hex');
        const actualBuffer = (await scryptAsync(password, salt, expectedBuffer.length));
        if (expectedBuffer.length !== actualBuffer.length) {
            return false;
        }
        return (0, node_crypto_1.timingSafeEqual)(expectedBuffer, actualBuffer);
    }
};
exports.PasswordService = PasswordService;
exports.PasswordService = PasswordService = __decorate([
    (0, common_1.Injectable)()
], PasswordService);
//# sourceMappingURL=password.service.js.map