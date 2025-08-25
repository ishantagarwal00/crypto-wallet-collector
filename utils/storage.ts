import { EncryptedWallet } from "../types/wallet";

const STORAGE_KEY = "encrypted-wallets";

const isClient = typeof window !== "undefined";

export function saveWallets(wallets: EncryptedWallet[]): void {
  if (!isClient) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wallets));
  } catch (error) {
    console.error("Failed to save wallets:", error);
  }
}

export function loadWallets(): EncryptedWallet[] {
  if (!isClient) return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to load wallets:", error);
    return [];
  }
}
