import React from 'react';
import { useStateContext } from '../context';
import { formatCurrency, formatDate, calculateProgress, getTimeRemaining, getDefaultCampaignImage } from '../utils/formatting';

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

interface CampaignCardProps {
  campaign: Campaign;
  id: number;
  onDonate: (id: number, amount: string) => void;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign, id, onDonate }) => {
  const { address } = useStateContext();
  const [donationAmount, setDonationAmount] = React.useState('');
  const [isDonating, setIsDonating] = React.useState(false);

  const target = parseFloat(campaign.target);
  const collected = parseFloat(campaign.amountcollected);
  const progress = calculateProgress(collected, target);
  const { isExpired } = getTimeRemaining(campaign.deadline);
  const campaignImage = campaign.image || getDefaultCampaignImage(campaign.title);

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!donationAmount || parseFloat(donationAmount) <= 0) return;
    
    setIsDonating(true);
    try {
      await onDonate(id, donationAmount);
      setDonationAmount('');
    } catch (error) {
      console.error('Donation failed:', error);
    } finally {
      setIsDonating(false);
    }
  };

  return (
    <div className="bg-black/60 backdrop-blur-sm border border-green-500/20 rounded-xl overflow-hidden hover:border-green-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/10">
      {/* Campaign Image */}
      <div className="relative h-48 bg-gradient-to-br from-green-900/20 to-black">
        <img 
          src={campaignImage} 
          alt={campaign.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              parent.innerHTML = `
                <div class="w-full h-full flex items-center justify-center">
                  <div class="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                    <span class="text-green-400 text-2xl">💰</span>
                  </div>
                </div>
              `;
            }
          }}
        />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            isExpired 
              ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
              : 'bg-green-500/20 text-green-400 border border-green-500/30'
          }`}>
            {isExpired ? 'Expired' : 'Active'}
          </span>
        </div>
      </div>

      {/* Campaign Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
          {campaign.title}
        </h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-3">
          {campaign.description}
        </p>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Progress</span>
            <span>{progress.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <p className="text-gray-400">Raised</p>
            <p className="text-green-400 font-semibold">
              {formatCurrency(collected)}
            </p>
          </div>
          <div>
            <p className="text-gray-400">Target</p>
            <p className="text-white font-semibold">
              {formatCurrency(target)}
            </p>
          </div>
        </div>

        {/* Deadline */}
        <div className="mb-4">
          <p className="text-gray-400 text-sm">Deadline</p>
          <p className="text-white font-medium">
            {formatDate(campaign.deadline)}
          </p>
        </div>

        {/* Donation Form */}
        {!isExpired && address && (
          <form onSubmit={handleDonate} className="space-y-3">
            <div className="flex space-x-2">
              <input
                type="number"
                step="0.001"
                min="0"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
                placeholder="0.0"
                className="flex-1 px-3 py-2 bg-black/50 border border-green-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50"
              />
              <span className="px-3 py-2 bg-green-500/10 text-green-400 border border-green-500/30 rounded-lg flex items-center">
                ETH
              </span>
            </div>
            <button
              type="submit"
              disabled={isDonating || !donationAmount || parseFloat(donationAmount) <= 0}
              className="w-full py-2 px-4 bg-gradient-to-r from-green-500 to-green-600 text-black font-semibold rounded-lg hover:from-green-400 hover:to-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-green-500/25"
            >
              {isDonating ? 'Donating...' : 'Donate Now'}
            </button>
          </form>
        )}

        {/* Donors Count */}
        <div className="mt-4 pt-4 border-t border-gray-700">
          <p className="text-gray-400 text-sm">
            {campaign.donators.length} donor{campaign.donators.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
