import CryptoJS from 'crypto-js';

const secretKey = import.meta.env.VITE_APP_CRYPTO_KEY; 
console.log(secretKey)
// Encrypt data with a secret key
export function encryptData(data) {
  if (data === null || data === undefined) {
    return null;
  }
  try {
    return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
  } catch (error) {
    console.error('Encryption error:', error);
    return null;
  }
}

// Decrypt data with a secret key
export function decryptData(encryptedData) {
  if (!encryptedData) {
    return null;
  }
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    console.error('Decryption error:', error);
    return null;
  }
}