import { render, screen, fireEvent } from "@testing-library/react";
import WalletCreator from "../components/WalletCreator";
import { Provider } from "react-redux";
import { store } from "../store";

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

describe("WalletGenerator", () => {
  it("displays error for short password and clears it on valid input", () => {
    render(
      <Provider store={store}>
        <WalletCreator />
      </Provider>
    );

    const input = screen.getByPlaceholderText(/enter a strong password/i);
    const button = screen.getByRole("button", { name: /create wallet/i });

    fireEvent.change(input, { target: { value: "short" } });
    fireEvent.click(button);
    expect(
      screen.getByText(/password must be at least 8 characters/i)
    ).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "longenough" } });
    fireEvent.click(button);
    expect(
      screen.queryByText(/password must be at least 8 characters/i)
    ).toBeNull();
  });
});
