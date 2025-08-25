export interface EncryptedWallet {
  address: string;
  encryptedKey: string;
  iv: string;
}

export interface Balance {
  eth: string;
  bnb: string;
}
