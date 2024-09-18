import CryptoJS from 'crypto-js';

const secretKey = import.meta.env.VITE_APP_CRYPTO_KEY; 

export function encryptData(data) {
  if (data === null || data === undefined) {
    return null;
  }
  try {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
    return encrypted;
  } catch (error) {
    return null;
  }
}

export function decryptData(encryptedData) {
  if (!encryptedData) {
    return null;
  }
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    
    if (!decryptedData) {
      return null;
    }

    try {
      return JSON.parse(decryptedData);
    } catch (parseError) {
      return null;
    }
  } catch (error) {
    return null;
  }
}
