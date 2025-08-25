import walletReducer, { addWallet, clearError } from "../store/walletSlice";

jest.mock("ethers", () => ({
  Wallet: {
    createRandom: jest.fn(() => ({
      address: "0x1234567890123456789012345678901234567890",
      privateKey:
        "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    })),
  },
}));

const mockLocalStorage = {
  getItem: jest.fn(() => null),
  setItem: jest.fn(),
};
Object.defineProperty(window, "localStorage", { value: mockLocalStorage });

describe("walletSlice", () => {
  const initialState = {
    wallets: [],
    balances: {},
    loading: false,
    error: null as string | null,
  };

  it("should handle addWallet", () => {
    const action = addWallet("password123");
    const state = walletReducer(initialState, action);
    expect(state.wallets.length).toBe(1);
    expect(state.wallets[0]).toHaveProperty("address");
    expect(state.wallets[0]).toHaveProperty("encryptedKey");
    expect(state.wallets[0]).toHaveProperty("iv");
  });

  it("should handle clearError", () => {
    const stateWithError = { ...initialState, error: "Oops" };
    const state = walletReducer(stateWithError, clearError());
    expect(state.error).toBeNull();
  });
});
