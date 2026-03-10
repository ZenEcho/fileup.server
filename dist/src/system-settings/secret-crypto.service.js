"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecretCryptoService = void 0;
const common_1 = require("@nestjs/common");
const node_crypto_1 = require("node:crypto");
const ENCRYPTED_VALUE_VERSION = 'v1';
let SecretCryptoService = class SecretCryptoService {
    encrypt(value) {
        if (!value) {
            throw new common_1.ServiceUnavailableException('Cannot encrypt empty secret value');
        }
        const key = this.resolveKey();
        const iv = (0, node_crypto_1.randomBytes)(12);
        const cipher = (0, node_crypto_1.createCipheriv)('aes-256-gcm', key, iv);
        const encrypted = Buffer.concat([
            cipher.update(value, 'utf8'),
            cipher.final(),
        ]);
        const authTag = cipher.getAuthTag();
        return [
            ENCRYPTED_VALUE_VERSION,
            iv.toString('hex'),
            authTag.toString('hex'),
            encrypted.toString('hex'),
        ].join(':');
    }
    decrypt(payload) {
        if (!payload) {
            throw new common_1.ServiceUnavailableException('Cannot decrypt empty secret payload');
        }
        const [version, ivHex, tagHex, cipherHex] = payload.split(':');
        if (version !== ENCRYPTED_VALUE_VERSION ||
            !ivHex ||
            !tagHex ||
            !cipherHex) {
            throw new common_1.ServiceUnavailableException('Invalid encrypted secret format');
        }
        const key = this.resolveKey();
        const iv = Buffer.from(ivHex, 'hex');
        const authTag = Buffer.from(tagHex, 'hex');
        const encrypted = Buffer.from(cipherHex, 'hex');
        const decipher = (0, node_crypto_1.createDecipheriv)('aes-256-gcm', key, iv);
        decipher.setAuthTag(authTag);
        const decrypted = Buffer.concat([
            decipher.update(encrypted),
            decipher.final(),
        ]);
        return decrypted.toString('utf8');
    }
    resolveKey() {
        const raw = (process.env['SETTINGS_ENCRYPTION_KEY'] || '').trim();
        if (!raw) {
            throw new common_1.ServiceUnavailableException('SETTINGS_ENCRYPTION_KEY is not configured. Please set a 32-byte base64 or 64-char hex key in server/.env and restart the server.');
        }
        const fromHex = /^[0-9a-fA-F]{64}$/.test(raw)
            ? Buffer.from(raw, 'hex')
            : null;
        const fromBase64 = (() => {
            try {
                const decoded = Buffer.from(raw, 'base64');
                if (decoded.length === 32) {
                    return decoded;
                }
                return null;
            }
            catch {
                return null;
            }
        })();
        const key = fromHex || fromBase64;
        if (!key || key.length !== 32) {
            throw new common_1.ServiceUnavailableException('SETTINGS_ENCRYPTION_KEY is invalid. It must be 32-byte base64 or 64-char hex. Please update server/.env and restart the server.');
        }
        return key;
    }
};
exports.SecretCryptoService = SecretCryptoService;
exports.SecretCryptoService = SecretCryptoService = __decorate([
    (0, common_1.Injectable)()
], SecretCryptoService);
//# sourceMappingURL=secret-crypto.service.js.map