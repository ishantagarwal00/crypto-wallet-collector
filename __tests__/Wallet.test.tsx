import { createWallet } from "../utils/wallet";
jest.mock("ethers", () => ({
  Wallet: {
    createRandom: jest.fn(() => ({
      address: "0x1234567890123456789012345678901234567890",
      privateKey:
        "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    })),
  },
}));

describe("wallet util", () => {
  it("creates a valid wallet with address and privateKey", () => {
    const { address, privateKey } = createWallet();
    expect(address).toMatch(/^0x[a-fA-F0-9]{40}$/);
    expect(privateKey).toMatch(/^0x[a-fA-F0-9]{64}$/);
  });
});
