import { Injectable } from '@nestjs/common';
import {
  randomBytes,
  scrypt as scryptCallback,
  timingSafeEqual,
} from 'node:crypto';
import { promisify } from 'node:util';

const scryptAsync = promisify(scryptCallback);

@Injectable()
export class PasswordService {
  async hashPassword(password: string): Promise<string> {
    const salt = randomBytes(16).toString('hex');
    const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;
    return `scrypt$${salt}$${derivedKey.toString('hex')}`;
  }

  async verifyPassword(password: string, storedHash: string): Promise<boolean> {
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
    const actualBuffer = (await scryptAsync(
      password,
      salt,
      expectedBuffer.length,
    )) as Buffer;

    if (expectedBuffer.length !== actualBuffer.length) {
      return false;
    }

    return timingSafeEqual(expectedBuffer, actualBuffer);
  }
}
