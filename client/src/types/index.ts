import { type Contract } from "thirdweb";

export interface Campaign {
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

export interface CampaignFormData {
  title: string;
  description: string;
  target: string;
  deadline: string;
  image: string;
}

export interface StateContextType {
  address?: string;
  contract: Contract | null;
  createCampaign: (form: CampaignFormData) => Promise<{ success: boolean; message: string; transactionHash?: string }>;
  fetchCampaigns: () => Promise<Campaign[]>;
  donateToCampaign: (campaignId: number, amount: string) => Promise<{ success: boolean; message: string; transactionHash?: string }>;
}
