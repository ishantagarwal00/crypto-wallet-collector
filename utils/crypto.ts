import CryptoJS from "crypto-js";

export function encryptPrivateKey(key: string, password: string) {
  const ivWord = CryptoJS.lib.WordArray.random(16);
  const iv = ivWord.toString(CryptoJS.enc.Hex);
  const encrypted = CryptoJS.AES.encrypt(
    key,
    CryptoJS.PBKDF2(password, ivWord, { keySize: 256 / 32, iterations: 1000 }),
    { iv: ivWord }
  );
  return { encryptedKey: encrypted.toString(), iv };
}

export function decryptPrivateKey(
  encryptedKey: string,
  password: string,
  iv: string
) {
  try {
    const ivValue = CryptoJS.enc.Hex.parse(iv);
    const key = CryptoJS.PBKDF2(password, ivValue, {
      keySize: 256 / 32,
      iterations: 1000,
    });
    const bytes = CryptoJS.AES.decrypt(encryptedKey, key, { iv: ivValue });
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);

    if (!decrypted) {
      return "";
    }

    return decrypted;
  } catch (error) {
    return "";
  }
}
