# Setup Guide for CrowdFund DApp

## 🚀 Quick Start

### 1. Environment Setup

Create a `.env.local` file in the `client` directory:

```bash
# Get your client ID from https://portal.thirdweb.com/typescript/v5/client
VITE_TEMPLATE_CLIENT_ID=your_thirdweb_client_id_here
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

## 🔧 Configuration

### Thirdweb Setup

1. Go to [Thirdweb Portal](https://portal.thirdweb.com/typescript/v5/client)
2. Create a new project
3. Copy your Client ID
4. Add it to your `.env.local` file

### Network Configuration

The app is currently configured for Sepolia testnet. To change networks:

1. Update `client/src/client.ts`:
```typescript
const chain = defineChain({
  id: YOUR_CHAIN_ID,
  name: "Your Network Name",
  rpc: "YOUR_RPC_URL",
});
```

2. Update the contract address in `client/src/context/index.tsx`:
```typescript
address: "YOUR_CONTRACT_ADDRESS"
```

## 📝 Contract Integration

### Current Status
- ✅ Frontend UI is complete and functional
- ✅ Wallet connection works
- ⚠️ Contract integration needs ABI implementation

### To Complete Contract Integration

1. **Add Contract ABI**: Create a contract ABI file with your smart contract functions
2. **Update Context**: Replace placeholder functions with actual contract calls
3. **Test Functions**: Ensure all contract interactions work properly

### Required Contract Functions
- `createCampaign(address, string, string, uint256, uint256, string)`
- `DonateCampaign(uint256)`
- `getCampain()`
- `getDonners(uint256)`

## 🎨 Features

- **Modern UI**: Black theme with glowing green accents
- **Responsive Design**: Works on all devices
- **Wallet Integration**: MetaMask and other Web3 wallets
- **Type Safety**: Full TypeScript support
- **Error Handling**: Comprehensive error states

## 🐛 Troubleshooting

### Common Issues

1. **Buffer Error**: Fixed with Vite configuration
2. **Provider Error**: Fixed with proper Thirdweb v5 setup
3. **Contract Errors**: Need proper ABI implementation

### Development Tips

- Use browser dev tools to debug contract interactions
- Check console for detailed error messages
- Ensure wallet is connected before testing functions

## 📚 Next Steps

1. Deploy your smart contract
2. Get the contract ABI
3. Update the context with real contract calls
4. Test all functionality
5. Deploy to production

## 🆘 Support

If you encounter issues:
1. Check the console for errors
2. Verify your environment variables
3. Ensure your wallet is connected
4. Check network configuration
