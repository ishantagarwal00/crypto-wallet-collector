import { encryptPrivateKey, decryptPrivateKey } from "../utils/crypto";

describe("crypto utils", () => {
  const password = "strongpassword";
  const privateKey =
    "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890";

  it("encrypts and decrypts a private key correctly", () => {
    const { encryptedKey, iv } = encryptPrivateKey(privateKey, password);
    expect(typeof encryptedKey).toBe("string");
    expect(typeof iv).toBe("string");

    const decrypted = decryptPrivateKey(encryptedKey, password, iv);
    expect(decrypted).toBe(privateKey);
  });

  it("returns empty string when password is wrong", () => {
    const { encryptedKey, iv } = encryptPrivateKey(privateKey, password);
    const result = decryptPrivateKey(encryptedKey, "wrongpass", iv);
    expect(result).toBe("");
  });
});
