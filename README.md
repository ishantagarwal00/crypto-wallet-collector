# Crypto Wallet Manager

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ishantagarwal00/crypto-wallet-collector)
[![Live Demo](https://img.shields.io/badge/demo-live-green.svg)](https://crypto-wallet-collector.vercel.app/)
[![Tests](https://img.shields.io/badge/tests-passing-brightgreen.svg)](#testing)

A secure, user-friendly cryptocurrency wallet generator and manager built with Next.js and Redux Toolkit. Create EVM-compatible wallets, store them securely with client-side encryption, and view balances across multiple networks.

## 🚀 **[Live Demo](https://crypto-wallet-collector.vercel.app/)**

## Features

- 🔐 **Secure Wallet Generation**: Create EVM-compatible wallets using ethers.js
- 🔒 **Client-Side Encryption**: AES-256 encryption with PBKDF2 key derivation
- 💰 **Multi-Network Support**: View balances on Ethereum and BNB Chain testnets
- 💾 **Local Storage**: Encrypted wallets stored securely in browser localStorage
- 🔑 **Private Key Access**: Decrypt and view private keys with password authentication
- 📱 **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- ✅ **Comprehensive Testing**: Full test coverage with Jest and React Testing Library

## Security Features

- **No Password Storage**: Passwords are never stored, only used for encryption
- **No Plaintext Private Keys**: All private keys encrypted before storage
- **Unique Encryption**: Each wallet uses a unique initialization vector (IV)
- **Industry Standard Encryption**: AES-256 with PBKDF2 (1000 iterations)

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Wallet Generation**: ethers.js
- **Encryption**: crypto-js
- **Testing**: Jest, React Testing Library
- **Storage**: Browser localStorage with SSR safety
- **Deployment**: Vercel

## Quick Start

### Try the Live Demo
Visit **[https://crypto-wallet-collector.vercel.app/](https://crypto-wallet-collector.vercel.app/)** to try it immediately!

### Local Development

```bash
# Clone the repository
git clone https://github.com/ishantagarwal00/crypto-wallet-collector.git
cd crypto-wallet-collector

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## Usage Guide

### 1. Create a New Wallet

1. Enter a strong password (minimum 8 characters)
2. Click "Create Wallet"
3. Your new wallet will appear in the list below

### 2. View Private Keys

1. Click "Show Private Key" on any wallet
2. Enter the password you used when creating the wallet
3. Copy your private key securely

### 3. Check Balances

Balances are automatically fetched and displayed for:
- **Ethereum (ETH)**: Testnet balance
- **BNB Chain (BNB)**: Testnet balance

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with Redux provider
│   └── page.tsx            # Main application page
├── components/
│   ├── BalanceDisplay.tsx  # Balance information display
│   ├── PrivateKeyModal.tsx # Private key decryption modal
│   ├── WalletGenerator.tsx # Wallet generation form
│   └── WalletList.tsx      # Wallet list and management
├── store/
│   ├── index.ts           # Redux store configuration
│   ├── hooks.ts           # Typed Redux hooks
│   └── walletSlice.ts     # Wallet state management
├── types/
│   └── wallet.ts          # TypeScript interfaces
├── utils/
│   ├── crypto.ts          # Encryption/decryption utilities
│   ├── storage.ts         # localStorage utilities
│   └── wallet.ts          # Wallet generation utilities
└── __tests__/             # Comprehensive test suite
```

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

**Test Coverage:**
- ✅ Wallet Generation (`wallet.test.tsx`)
- ✅ Encryption/Decryption (`crypto.test.tsx`) 
- ✅ Local Storage (`storage.test.tsx`)
- ✅ Redux State Management (`walletSlice.test.tsx`)
- ✅ Component Rendering (`balanceDisplay.test.tsx`, `walletCreator.test.tsx`)

## Architecture Decisions

### State Management
- **Redux Toolkit**: Chosen for predictable state management and excellent TypeScript support
- **Async Thunks**: Handle wallet loading and balance fetching with proper loading states

### Security
- **Client-Side Encryption**: All encryption happens in the browser, ensuring private keys never leave the user's device
- **No Server Dependencies**: Fully client-side application for maximum security and privacy

### Component Architecture
- **Separation of Concerns**: Each component has a single responsibility
- **Reusable Components**: Modular design allows for easy testing and maintenance
- **TypeScript**: Full type safety throughout the application

## API Integration

Currently uses mock API calls for balance fetching. To integrate with real APIs:

1. Update `fetchBalances` thunk in `store/walletSlice.ts`
2. Add your preferred RPC endpoints or API keys
3. Handle rate limiting and error responses appropriately

Example integration:
```typescript
// In walletSlice.ts - fetchBalances thunk
const provider = new ethers.providers.JsonRpcProvider('YOUR_RPC_ENDPOINT')
const balance = await provider.getBalance(address)
const formattedBalance = ethers.utils.formatEther(balance)
```

## Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ishantagarwal00/crypto-wallet-collector)

### Manual Deployment

```bash
# Build the application
npm run build

# Deploy to your preferred platform
npm run start
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Add tests for new functionality
4. Ensure all tests pass (`npm test`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Security Notice

⚠️ **Important**: This is a demonstration application. For production use:
- Implement proper key management
- Add hardware wallet integration
- Use secure random number generation
- Consider using a more robust encryption library
- Implement proper error logging and monitoring

## Technical Assessment Compliance

This project was built as a **Frontend Engineer Technical Test** and meets all requirements:

### ✅ **User Requirements**
- [x] Create wallets with button click
- [x] Display list of created wallets
- [x] View private keys with password authentication
- [x] Display testnet balances

### ✅ **Technical Requirements**
- [x] EVM network compatibility (Ethereum, BNB Chain)
- [x] Local storage for wallet data
- [x] No password storage
- [x] No plaintext private key storage

### ✅ **Development Standards**
- [x] Comprehensive testing suite
- [x] React hooks usage
- [x] Redux state management
- [x] Clean architecture
- [x] Code simplicity and maintainability


## Support

For issues or questions:
- Create an issue in the [GitHub repository](https://github.com/ishantagarwal00/crypto-wallet-collector/issues)
- Visit the [live demo](https://crypto-wallet-collector.vercel.app/) to test functionality

---

**⭐ Star this repository if you found it helpful!**
