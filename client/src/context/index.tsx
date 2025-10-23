import React, { useContext, createContext, ReactNode } from "react";
import { useActiveAccount, useSendTransaction } from "thirdweb/react";
import { getContract, toEther } from "thirdweb";
import { client } from "../client";

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
    
    // Get the contract instance
    const contract = getContract({
        client,
        chain: { 
            id: 11155111, 
            name: "Sepolia",
            rpc: "https://sepolia.infura.io/v3/your-infura-key"
        },
        address: "0xcf13ec03df554cdf126e6e24b66a9ee46034dbf6"
    });

    const { mutateAsync: sendTransaction } = useSendTransaction();

    const publishCampaign = async (form: Form) => {
        try {
            if (!address) throw new Error("No wallet connected");
            
            // For now, we'll use a simple approach
            // You'll need to implement the actual contract interaction
            console.log("Creating campaign:", form);
            alert("Campaign creation functionality needs to be implemented with proper contract ABI");
            return { success: true };
        } catch (err) {
            console.log(`contract failure`, err);
            throw err;
        }
    };

    const donateToCampaign = async (campaignId: number, amount: string) => {
        try {
            if (!address) throw new Error("No wallet connected");
            
            // For now, we'll use a simple approach
            // You'll need to implement the actual contract interaction
            console.log("Donating to campaign:", campaignId, amount);
            alert("Donation functionality needs to be implemented with proper contract ABI");
            return { success: true };
        } catch (err) {
            console.log(`donation failure`, err);
            throw err;
        }
    };

    return (
        <StateContext.Provider
            value={{
                address,
                contract,
                createCampaign: publishCampaign,
                donateToCampaign
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);