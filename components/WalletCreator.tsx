"use client";

import { useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { addWallet } from "../store/walletSlice";

export default function WalletCreator() {
  const dispatch = useAppDispatch();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateWallet = async () => {
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setIsCreating(true);
    setError("");

    try {
      await dispatch(addWallet(password));
      setPassword("");
    } catch (err) {
      setError("Failed to create wallet");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Create New Wallet
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Encryption Password
          </label>
          <input
            type="password"
            placeholder="Enter a strong password (min 8 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 text-gray-900"
            onKeyDown={(e) => e.key === "Enter" && handleCreateWallet()}
            disabled={isCreating}
          />
        </div>

        {error && (
          <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
            {error}
          </div>
        )}

        <button
          onClick={handleCreateWallet}
          disabled={isCreating || password.length === 0}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200"
        >
          {isCreating ? "Creating..." : "Create Wallet"}
        </button>
      </div>
    </div>
  );
}
