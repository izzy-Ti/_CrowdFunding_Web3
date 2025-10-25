# CrowdFunding Frontend Setup

## Environment Variables

You need to set up the following environment variables in your `.env` file:

### 1. Thirdweb Client ID
- Go to [Thirdweb Portal](https://portal.thirdweb.com/)
- Create a new project or use an existing one
- Copy your Client ID
- Set it in `.env`:
```
VITE_TEMPLATE_CLIENT_ID=your_actual_client_id_here
```

### 2. Contract Address
- Deploy your contract using the scripts in the `web3` folder
- Copy the deployed contract address
- Set it in `.env`:
```
VITE_CONTRACT_ADDRESS=your_deployed_contract_address_here
```

## Example .env file:
```
VITE_TEMPLATE_CLIENT_ID=abc123def456ghi789
VITE_CONTRACT_ADDRESS=0x1234567890abcdef1234567890abcdef12345678
```

## Running the Application

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

## Features

- ✅ Connect wallet using Thirdweb
- ✅ Create new campaigns
- ✅ View all campaigns
- ✅ Donate to campaigns
- ✅ Real-time progress tracking
- ✅ Responsive design

## Notes

- Make sure your wallet is connected to Sepolia testnet
- You need Sepolia ETH to create campaigns and donate
- The contract must be deployed before the frontend can work
