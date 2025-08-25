"use client";

import { Balance } from "../types/wallet";

export default function BalanceDisplay({
  address,
  balance,
}: {
  address: string;
  balance?: Balance;
}) {
  if (!balance) {
    return (
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-gray-600"></div>
        Loading balances...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 text-sm">
      <div className="bg-blue-50 rounded-lg p-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
            Ξ
          </div>
          <div>
            <p className="text-xs text-gray-600 uppercase tracking-wide">
              Ethereum
            </p>
            <p className="font-semibold text-gray-900">{balance.eth} ETH</p>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 rounded-lg p-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold">
            B
          </div>
          <div>
            <p className="text-xs text-gray-600 uppercase tracking-wide">
              BNB Chain
            </p>
            <p className="font-semibold text-gray-900">{balance.bnb} BNB</p>
          </div>
        </div>
      </div>
    </div>
  );
}
