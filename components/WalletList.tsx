"use client";

import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { fetchBalances, loadWalletsFromStorage } from "../store/walletSlice";
import PrivateKeyModal from "./PrivateKeyModal";
import BalanceDisplay from "./BalanceDisplay";
import { EncryptedWallet } from "../types/wallet";

export default function WalletList() {
  const wallets = useAppSelector((state) => state.wallet.wallets);
  const balances = useAppSelector((state) => state.wallet.balances);
  const dispatch = useAppDispatch();
  const [selectedWallet, setSelectedWallet] = useState<EncryptedWallet | null>(
    null
  );

  useEffect(() => {
    dispatch(loadWalletsFromStorage());
  }, [dispatch]);

  useEffect(() => {
    wallets.forEach((w) => dispatch(fetchBalances(w.address)));
  }, [wallets, dispatch]);

  const handleShowPrivateKey = (wallet: EncryptedWallet) => {
    setSelectedWallet(wallet);
  };

  const handleCloseModal = () => {
    setSelectedWallet(null);
  };

  if (wallets.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 border text-center">
        <div className="text-gray-400 mb-4">
          <svg
            className="mx-auto h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No wallets yet
        </h3>
        <p className="text-gray-500">Create your first wallet to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Your Wallets</h2>

      {wallets.map((wallet, index) => (
        <div
          key={wallet.address}
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 border"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-medium text-gray-500">
              Wallet #{index + 1}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-3">
            <div className="flex-1 bg-gray-50 rounded-lg p-3">
              <p className="font-mono text-sm break-all text-gray-700">
                {wallet.address}
              </p>
            </div>

            <div className="flex-shrink-0">
              <button
                onClick={() => handleShowPrivateKey(wallet)}
                className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200"
              >
                Show Private Key
              </button>
            </div>
          </div>
          <BalanceDisplay
            address={wallet.address}
            balance={balances[wallet.address]}
          />
        </div>
      ))}
      {selectedWallet && (
        <PrivateKeyModal wallet={selectedWallet} onClose={handleCloseModal} />
      )}
    </div>
  );
}
