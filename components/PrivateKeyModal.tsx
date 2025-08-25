"use client";

import { useState, useEffect } from "react";
import { decryptPrivateKey } from "../utils/crypto";
import { EncryptedWallet } from "../types/wallet";

export default function PrivateKeyModal({
  wallet,
  onClose,
}: {
  wallet: EncryptedWallet;
  onClose: () => void;
}) {
  const [password, setPassword] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [error, setError] = useState("");
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleDecrypt = async () => {
    setIsDecrypting(true);
    setError("");

    try {
      const key = decryptPrivateKey(wallet.encryptedKey, password, wallet.iv);
      if (!key) {
        throw new Error("Invalid password");
      }
      setPrivateKey(key);
    } catch {
      setError("Invalid password. Please try again.");
      setPrivateKey("");
    } finally {
      setIsDecrypting(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(privateKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-md transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Private Key</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Password
              </label>
              <input
                type="password"
                placeholder="Enter wallet password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 text-gray-900"
                onKeyDown={(e) => e.key === "Enter" && handleDecrypt()}
                disabled={isDecrypting}
                autoFocus
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                {error}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleDecrypt}
                disabled={!password || isDecrypting}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium px-4 py-3 rounded-lg transition-colors duration-200"
              >
                {isDecrypting ? "Decrypting..." : "Decrypt"}
              </button>
              <button
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
            </div>

            {privateKey && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Private Key
                  </span>
                  <button
                    onClick={copyToClipboard}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors px-2 py-1 rounded hover:bg-blue-50"
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
                <div className="font-mono text-xs break-all bg-white p-3 rounded border text-gray-800 max-h-20 overflow-y-auto">
                  {privateKey}
                </div>
                <p className="text-xs text-red-600 mt-2">
                  Keep this private key secure. Never share it with anyone.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
