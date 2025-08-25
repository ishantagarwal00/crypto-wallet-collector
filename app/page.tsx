"use client";

import WalletCreator from "../components/WalletCreator";
import WalletList from "../components/WalletList";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto max-w-2xl px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Crypto Wallet Manager
          </h1>
          <p className="text-gray-600">
            Create and securely store encrypted cryptocurrency wallets
          </p>
        </div>

        <div className="space-y-6">
          <WalletCreator />
          <WalletList />
        </div>
      </main>
    </div>
  );
}
