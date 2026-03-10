import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';

const ENCRYPTED_VALUE_VERSION = 'v1';

@Injectable()
export class SecretCryptoService {
  encrypt(value: string): string {
    if (!value) {
      throw new ServiceUnavailableException(
        'Cannot encrypt empty secret value',
      );
    }

    const key = this.resolveKey();
    const iv = randomBytes(12);
    const cipher = createCipheriv('aes-256-gcm', key, iv);

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

  decrypt(payload: string): string {
    if (!payload) {
      throw new ServiceUnavailableException(
        'Cannot decrypt empty secret payload',
      );
    }

    const [version, ivHex, tagHex, cipherHex] = payload.split(':');
    if (
      version !== ENCRYPTED_VALUE_VERSION ||
      !ivHex ||
      !tagHex ||
      !cipherHex
    ) {
      throw new ServiceUnavailableException('Invalid encrypted secret format');
    }

    const key = this.resolveKey();
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(tagHex, 'hex');
    const encrypted = Buffer.from(cipherHex, 'hex');

    const decipher = createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(authTag);

    const decrypted = Buffer.concat([
      decipher.update(encrypted),
      decipher.final(),
    ]);

    return decrypted.toString('utf8');
  }

  private resolveKey() {
    const raw = (process.env['SETTINGS_ENCRYPTION_KEY'] || '').trim();
    if (!raw) {
      throw new ServiceUnavailableException(
        'SETTINGS_ENCRYPTION_KEY is not configured. Please set a 32-byte base64 or 64-char hex key in server/.env and restart the server.',
      );
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
      } catch {
        return null;
      }
    })();

    const key = fromHex || fromBase64;
    if (!key || key.length !== 32) {
      throw new ServiceUnavailableException(
        'SETTINGS_ENCRYPTION_KEY is invalid. It must be 32-byte base64 or 64-char hex. Please update server/.env and restart the server.',
      );
    }

    return key;
  }
}
