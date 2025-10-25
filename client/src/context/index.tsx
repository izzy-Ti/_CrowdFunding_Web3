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
            const deadlineDate = new Date(form.deadline);
            if (isNaN(deadlineDate.getTime())) {
                throw new Error("Invalid date format. Please use YYYY-MM-DDTHH:MM format");
            }
            
            const deadlineTimestamp = Math.floor(deadlineDate.getTime() / 1000);
            const currentTimestamp = Math.floor(Date.now() / 1000);
            
            console.log("Deadline date string:", form.deadline);
            console.log("Parsed deadline date:", deadlineDate);
            console.log("Deadline timestamp (seconds):", deadlineTimestamp);
            console.log("Current timestamp (seconds):", currentTimestamp);
            console.log("Time remaining (seconds):", deadlineTimestamp - currentTimestamp);
            
            // Validate deadline is in the future (with at least 1 hour buffer)
            const oneHourInSeconds = 3600;
            if (deadlineTimestamp <= currentTimestamp + oneHourInSeconds) {
                throw new Error("Deadline must be at least 1 hour in the future");
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
            
            // Convert amount to wei for the contract
            const weiAmount = parseEther(amount);
            console.log(`Donating ${amount} ETH (${weiAmount} wei) to campaign ${campaignId}`);
            
            // Prepare the contract call
            const transaction = prepareContractCall({
                contract,
                method: "DonateCampaign",
                params: [BigInt(campaignId)],
                value: weiAmount
            });
            
            // Send the transaction
            console.log("Sending donation transaction...");
            const result = await sendTransaction({
                transaction,
                account: account!
            });
            
            console.log("Donation transaction sent:", result);
            
            // Wait for the transaction to be mined
            console.log("Waiting for transaction to be confirmed...");
            await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds
            
            // Refresh the campaigns to update the UI
            console.log("Refreshing campaigns...");
            await fetchCampaigns();
            
            console.log("Donation successful and campaigns refreshed");
            return { 
                success: true, 
                message: `Successfully donated ${amount} ETH!`, 
                transactionHash: result.transactionHash 
            };
        } catch (err) {
            console.error("Donation failed:", err);
            const errorMessage = err instanceof Error ? err.message : 'Unknown error';
            console.error("Error details:", { error: err });
            alert(`Failed to donate: ${errorMessage}`);
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
                
                // Convert BigInt values to strings for proper handling
                const targetWei = typeof campaign.target === 'bigint' 
                    ? campaign.target.toString() 
                    : campaign.target;
                    
                const amountCollectedWei = typeof campaign.amountcollected === 'bigint'
                    ? campaign.amountcollected.toString()
                    : campaign.amountcollected;
                
                // Log raw values for debugging
                console.log(`Campaign ${index} raw target:`, campaign.target, 'type:', typeof campaign.target);
                console.log(`Campaign ${index} raw amount collected:`, campaign.amountcollected, 'type:', typeof campaign.amountcollected);
                
                // Convert from wei to ETH with proper decimal handling
                const targetEth = (Number(targetWei) / 1e18).toFixed(6);
                const amountCollectedEth = (Number(amountCollectedWei) / 1e18).toFixed(6);
                
                console.log(`Campaign ${index} target (ETH):`, targetEth);
                console.log(`Campaign ${index} amount collected (ETH):`, amountCollectedEth);
                
                // Format donators amounts
                const formattedDonations = campaign.donatersamount.map((amount: any) => {
                    const amountWei = typeof amount === 'bigint' ? amount.toString() : amount;
                    return (Number(amountWei) / 1e18).toFixed(6);
                });
                
                return {
                    owner: campaign.owner,
                    title: campaign.title,
                    description: campaign.description,
                    target: targetEth,
                    deadline: new Date(Number(campaign.deadline) * 1000).toISOString(),
                    amountcollected: amountCollectedEth,
                    image: campaign.image,
                    donators: campaign.donators,
                    donatersamount: formattedDonations
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