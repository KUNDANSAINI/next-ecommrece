// import crypto from 'crypto';
const crypto = require('crypto');
const { ENCRYPTION_KEY } = require('../config/env');

function encryptPayload(payload) {
  const iv = crypto.randomBytes(16);
  const keyBuffer = Buffer.from(ENCRYPTION_KEY, 'hex');
  const cipher = crypto.createCipheriv('aes-256-gcm', keyBuffer, iv);
  let encrypted = cipher.update(JSON.stringify(payload), 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag().toString('hex');
  return `${iv.toString('hex')}:${encrypted}:${authTag}`;
}

// Decrypt the payload after verifying the JWT
function decryptPayload(encryptedPayload) {
  const parts = encryptedPayload.split(':');
  const iv = Buffer.from(parts.shift(), 'hex');
  const encrypted = parts.shift();
  const authTag = Buffer.from(parts.shift(), 'hex');
  const keyBuffer = Buffer.from(ENCRYPTION_KEY, 'hex');
  const decipher = crypto.createDecipheriv('aes-256-gcm', keyBuffer, iv);
  decipher.setAuthTag(authTag);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return JSON.parse(decrypted);
}

module.exports = { encryptPayload, decryptPayload };