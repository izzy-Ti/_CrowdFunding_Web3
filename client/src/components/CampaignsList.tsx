import React, { useState, useEffect } from 'react';
import { useStateContext } from '../context';
import CampaignCard from './CampaignCard';

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

const CampaignsList: React.FC = () => {
  const { contract, address, donateToCampaign } = useStateContext();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // For now, we'll show a placeholder message
      // You'll need to implement the actual contract reading
      console.log("Fetching campaigns...");
      
      // Mock data for demonstration
      setCampaigns([]);
    } catch (err) {
      console.error('Failed to fetch campaigns:', err);
      setError('Failed to load campaigns. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, [contract]);

  const handleDonate = async (campaignId: number, amount: string) => {
    if (!address) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      await donateToCampaign(campaignId, amount);
      // Refresh campaigns after donation
      await fetchCampaigns();
      alert('Donation successful!');
    } catch (error) {
      console.error('Donation failed:', error);
      alert('Donation failed. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading campaigns...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-400 text-2xl">⚠️</span>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Error Loading Campaigns</h3>
          <p className="text-gray-400 mb-4">{error}</p>
          <button
            onClick={fetchCampaigns}
            className="px-6 py-2 bg-green-500 text-black font-semibold rounded-lg hover:bg-green-400 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (campaigns.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-green-400 text-2xl">📋</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">No Campaigns Yet</h3>
          <p className="text-gray-400 mb-6">
            Be the first to create a campaign and start making a difference!
          </p>
          <a
            href="#create"
            className="inline-block px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-black font-semibold rounded-lg hover:from-green-400 hover:to-green-500 transition-all duration-200 shadow-lg hover:shadow-green-500/25"
          >
            Create Campaign
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Active <span className="text-green-400">Campaigns</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Discover and support amazing projects
          </p>
        </div>

        {/* Campaigns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.map((campaign, index) => (
            <CampaignCard
              key={index}
              campaign={campaign}
              id={index}
              onDonate={handleDonate}
            />
          ))}
        </div>

        {/* Refresh Button */}
        <div className="text-center mt-12">
          <button
            onClick={fetchCampaigns}
            className="px-6 py-3 bg-black/60 border border-green-500/30 text-green-400 font-semibold rounded-lg hover:bg-green-500/10 hover:border-green-500/50 transition-all duration-200"
          >
            Refresh Campaigns
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignsList;
