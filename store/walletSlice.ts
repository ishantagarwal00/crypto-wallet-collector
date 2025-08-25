import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { createWallet } from "../utils/wallet";
import { encryptPrivateKey } from "../utils/crypto";
import { saveWallets, loadWallets } from "../utils/storage";
import { EncryptedWallet } from "../types/wallet";

export interface Balance {
  eth: string;
  bnb: string;
}

export interface WalletState {
  wallets: EncryptedWallet[];
  balances: Record<string, Balance>;
  loading: boolean;
  error: string | null;
}

const initialState: WalletState = {
  wallets: [],
  balances: {},
  loading: false,
  error: null,
};

export const loadWalletsFromStorage = createAsyncThunk(
  "wallet/loadFromStorage",
  async () => {
    return loadWallets();
  }
);

export const fetchBalances = createAsyncThunk(
  "wallet/fetchBalances",
  async (address: string) => {
    try {
      const ethBalance = "0.0";
      const bnbBalance = "0.0";

      return {
        address,
        balance: {
          eth: ethBalance,
          bnb: bnbBalance,
        },
      };
    } catch (error) {
      throw new Error("Failed to fetch balances");
    }
  }
);

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    addWallet: {
      reducer: (state, action: PayloadAction<EncryptedWallet>) => {
        state.wallets.push(action.payload);
        saveWallets(state.wallets);
      },
      prepare: (password: string) => {
        const { address, privateKey } = createWallet();
        const { encryptedKey, iv } = encryptPrivateKey(privateKey, password);
        return {
          payload: {
            address,
            encryptedKey,
            iv,
          },
        };
      },
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadWalletsFromStorage.fulfilled, (state, action) => {
        state.wallets = action.payload;
      })
      .addCase(fetchBalances.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBalances.fulfilled, (state, action) => {
        state.loading = false;
        state.balances[action.payload.address] = action.payload.balance;
      })
      .addCase(fetchBalances.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch balances";
      });
  },
});

export const { addWallet, clearError } = walletSlice.actions;
export default walletSlice.reducer;
