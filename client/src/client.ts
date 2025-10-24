import { createThirdwebClient } from "thirdweb";
import { defineChain } from "thirdweb/chains";

// Replace this with your client ID string
// refer to https://portal.thirdweb.com/typescript/v5/client on how to get a client ID
const clientId = import.meta.env.VITE_TEMPLATE_CLIENT_ID || "demo_client_id";

// Define the chain (you can change this to your preferred network)
const chain = defineChain({
  id: 11155111, // Sepolia testnet
  name: "Sepolia",
  rpc: "https://sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161", // Public Sepolia RPC
});

export const client = createThirdwebClient({
  clientId: clientId,
});
