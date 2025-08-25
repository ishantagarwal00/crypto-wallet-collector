import { render, screen } from "@testing-library/react";
import BalanceDisplay from "../components/BalanceDisplay";

describe("BalanceDisplay", () => {
  it("shows loading when no balance", () => {
    render(<BalanceDisplay address="0x0" />);
    expect(screen.getByText(/loading balances/i)).toBeInTheDocument();
  });

  it("renders ETH and BNB values when provided", () => {
    render(
      <BalanceDisplay address="0x0" balance={{ eth: "1.23", bnb: "4.56" }} />
    );

    expect(screen.getByText("1.23 ETH")).toBeInTheDocument();
    expect(screen.getByText("4.56 BNB")).toBeInTheDocument();
    expect(screen.getByText("Ethereum")).toBeInTheDocument();
    expect(screen.getByText("BNB Chain")).toBeInTheDocument();
  });
});
