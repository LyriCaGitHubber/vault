import { readFile } from 'fs/promises';
import CryptoJS from 'crypto-js';

export async function validateMasterPassword(
  password: string
): Promise<boolean> {
  const hashedMasterPassword = await readFile('.password', 'utf-8');
  const hashedPassword = CryptoJS.SHA256(password).toString();
  return hashedMasterPassword === hashedPassword;
}
