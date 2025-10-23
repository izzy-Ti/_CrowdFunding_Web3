import { createThirdwebClient } from "thirdweb";
import { defineChain } from "thirdweb/chains";

// Replace this with your client ID string
// refer to https://portal.thirdweb.com/typescript/v5/client on how to get a client ID
const clientId = import.meta.env.VITE_TEMPLATE_CLIENT_ID;

// Define the chain (you can change this to your preferred network)
const chain = defineChain({
  id: 11155111, // Sepolia testnet
  name: "Sepolia",
  rpc: "https://sepolia.infura.io/v3/your-infura-key", // Replace with your RPC URL
});

export const client = createThirdwebClient({
  clientId: clientId,
  chains: [chain],
});
