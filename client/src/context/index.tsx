import React, { useContext, createContext, ReactNode } from "react";
import { useActiveAccount } from "thirdweb/react";
import { getContract, readContract, prepareContractCall, sendTransaction } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { client } from "../client";
import CrowdFundingABI from "../contracts/CrowdFunding.json";

// Helper function to convert ETH to wei
const parseEther = (value: string) => {
  return BigInt(Math.floor(parseFloat(value) * 1e18));
};

const StateContext = createContext({} as any);

interface Form {
  title: string;
  description: string;
  target: string;
  deadline: string;
  image: string;
}

interface Campaign {
  owner: string;
  title: string;
  description: string;
  target: string;
  deadline: string;
  amountcollected: string;
  image: string;
  donators: string[];
  donatersamount: string[];
}

export const StateContextProvider = ({ children }: { children: ReactNode }) => {
    const account = useActiveAccount();
    const address = account?.address;
    
    // Debug logging
    console.log("Account:", account);
    console.log("Address:", address);
    
    // Get contract address from environment variables
    const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
    
    console.log("Environment variables:");
    console.log("Contract Address:", contractAddress);
    
    // Use Thirdweb's built-in Sepolia chain definition
    console.log("Using Sepolia chain:", sepolia);
    
    // Get the contract instance
    const contract = getContract({
        client,
        chain: sepolia,
        address: contractAddress as `0x${string}`,
        abi: CrowdFundingABI
    });

    // Test contract connection
    const testContractConnection = async () => {
        try {
            console.log("Testing contract connection...");
            const noOfCampaigns = await readContract({
                contract,
                method: "NoOfCampains",
                params: []
            });
            console.log("Contract connection successful! Number of campaigns:", noOfCampaigns);
            return true;
        } catch (err) {
            console.error("Contract connection failed:", err);
            return false;
        }
    };

    // Test contract connection on mount
    React.useEffect(() => {
        if (contractAddress && contract) {
            testContractConnection();
        }
    }, [contractAddress, contract]);

    const publishCampaign = async (form: Form) => {
        try {
            if (!address) throw new Error("No wallet connected");
            if (!contractAddress) throw new Error("Contract address not configured");
            
            console.log("Creating campaign:", form);
            console.log("Contract instance:", contract);
            console.log("Account:", account);
            console.log("Form data:", {
                title: form.title,
                description: form.description,
                target: form.target,
                deadline: form.deadline,
                image: form.image
            });
            
            // Convert deadline to timestamp
            const deadlineTimestamp = Math.floor(new Date(form.deadline).getTime() / 1000);
            const currentTimestamp = Math.floor(Date.now() / 1000);
            
            console.log("Deadline timestamp:", deadlineTimestamp);
            console.log("Current timestamp:", currentTimestamp);
            console.log("Original deadline string:", form.deadline);
            console.log("Parsed date:", new Date(form.deadline));
            console.log("Is deadline in future?", deadlineTimestamp > currentTimestamp);
            
            // Validate deadline is in the future
            if (deadlineTimestamp <= currentTimestamp) {
                throw new Error("Deadline must be in the future");
            }
            
            // Prepare the contract call
            const transaction = prepareContractCall({
                contract,
                method: "createCampaign",
                params: [
                    address,                    // _owner
                    form.title,                // _title
                    form.description,          // _description
                    parseEther(form.target),   // _target
                    BigInt(deadlineTimestamp), // _deadline
                    form.image                 // _image
                ]
            });
            
            console.log("Transaction prepared:", transaction);
            console.log("Contract call parameters:", {
                owner: address,
                title: form.title,
                description: form.description,
                target: parseEther(form.target),
                deadline: BigInt(deadlineTimestamp),
                image: form.image
            });
            
            // Send the transaction
            const result = await sendTransaction({
                transaction,
                account: account!
            });
            
            console.log("Campaign created successfully:", result);
            console.log("Transaction hash:", result.transactionHash);
            
            // Wait a moment for the transaction to be mined
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            return { success: true, message: "Campaign created successfully!", transactionHash: result.transactionHash };
        } catch (err) {
            console.log(`contract failure`, err);
            console.error("Campaign creation error details:", {
                message: err instanceof Error ? err.message : 'Unknown error',
                stack: err instanceof Error ? err.stack : undefined,
                form,
                contractAddress,
                contract
            });
            alert(`Failed to create campaign: ${err instanceof Error ? err.message : 'Unknown error'}`);
            throw err;
        }
    };

    const donateToCampaign = async (campaignId: number, amount: string) => {
        try {
            if (!address) throw new Error("No wallet connected");
            if (!contractAddress) throw new Error("Contract address not configured");
            
            console.log("Donating to campaign:", campaignId, amount);
            
            // Prepare the contract call
            const transaction = prepareContractCall({
                contract,
                method: "DonateCampaign",
                params: [BigInt(campaignId)],
                value: parseEther(amount)
            });
            
            // Send the transaction
            const result = await sendTransaction({
                transaction,
                account: account!
            });
            
            console.log("Donation successful:", result);
            return { success: true, message: "Donation successful!", transactionHash: result.transactionHash };
        } catch (err) {
            console.log(`donation failure`, err);
            alert(`Failed to donate: ${err instanceof Error ? err.message : 'Unknown error'}`);
            throw err;
        }
    };

    const fetchCampaigns = async () => {
        try {
            if (!contractAddress) throw new Error("Contract address not configured");
            
            console.log("Fetching campaigns from contract...");
            console.log("Contract instance:", contract);
            
            // Read campaigns from contract
            const campaigns = await readContract({
                contract,
                method: "getCampain",
                params: []
            });
            
            console.log("Raw campaigns data:", campaigns);
            console.log("Campaigns type:", typeof campaigns);
            console.log("Campaigns length:", campaigns?.length);
            console.log("First campaign structure:", campaigns?.[0]);
            
            // Convert campaigns to the expected format
            const formattedCampaigns: Campaign[] = campaigns.map((campaign: any, index: number) => {
                console.log(`Campaign ${index}:`, campaign);
                console.log(`Campaign ${index} title:`, campaign.title);
                console.log(`Campaign ${index} description:`, campaign.description);
                
                return {
                    owner: campaign.owner,
                    title: campaign.title,
                    description: campaign.description,
                    target: (Number(campaign.target) / 1e18).toString(), // Convert from wei to ETH
                    deadline: new Date(Number(campaign.deadline) * 1000).toISOString(), // Convert timestamp to date
                    amountcollected: (Number(campaign.amountcollected) / 1e18).toString(), // Convert from wei to ETH
                    image: campaign.image,
                    donators: campaign.donators,
                    donatersamount: campaign.donatersamount.map((amount: bigint) => (Number(amount) / 1e18).toString())
                };
            });
            
            console.log("Formatted campaigns:", formattedCampaigns);
            return formattedCampaigns;
        } catch (err) {
            console.error("Failed to fetch campaigns:", err);
            console.error("Error details:", {
                message: err instanceof Error ? err.message : 'Unknown error',
                stack: err instanceof Error ? err.stack : undefined,
                contractAddress,
                contract
            });
            throw err;
        }
    };

    return (
        <StateContext.Provider
            value={{
                address,
                contract,
                createCampaign: publishCampaign,
                donateToCampaign,
                fetchCampaigns
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);