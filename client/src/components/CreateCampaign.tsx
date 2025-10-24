import React, { useState } from 'react';
import { useStateContext } from '../context';

interface FormData {
  title: string;
  description: string;
  target: string;
  deadline: string;
  image: string;
}

const CreateCampaign: React.FC = () => {
  const { createCampaign, address, fetchCampaigns } = useStateContext();
  const [form, setForm] = useState<FormData>({
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: ''
  });
  const [isCreating, setIsCreating] = useState(false);

  // Debug logging
  console.log("CreateCampaign - Address:", address);
  console.log("CreateCampaign - Address type:", typeof address);
  console.log("CreateCampaign - Address length:", address?.length);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) {
      alert('Please connect your wallet first');
      return;
    }

    setIsCreating(true);
    try {
      const result = await createCampaign(form);
      console.log("Campaign creation result:", result);
      
      setForm({
        title: '',
        description: '',
        target: '',
        deadline: '',
        image: ''
      });
      
      alert('Campaign created successfully!');
      
      // Refresh campaigns to show the new one
      try {
        await fetchCampaigns();
        console.log("Campaigns refreshed after creation");
      } catch (refreshError) {
        console.error("Failed to refresh campaigns:", refreshError);
      }
    } catch (error) {
      console.error('Failed to create campaign:', error);
      alert('Failed to create campaign. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  if (!address || address === undefined || address === null || address === '') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-black/60 backdrop-blur-sm border border-green-500/20 rounded-xl p-8 text-center">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-green-400 text-2xl">🔗</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Connect Your Wallet</h2>
          <p className="text-gray-400 mb-4">
            Please connect your wallet to create a new campaign
          </p>
          <div className="text-sm text-gray-500">
            Debug: Address = {String(address)} (Type: {typeof address})
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-black/60 backdrop-blur-sm border border-green-500/20 rounded-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Create New Campaign</h2>
          <p className="text-gray-400">
            Start your crowdfunding journey and make a difference
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campaign Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
              Campaign Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-black/50 border border-green-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50 transition-all duration-200"
              placeholder="Enter your campaign title"
            />
          </div>

          {/* Campaign Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-3 bg-black/50 border border-green-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50 transition-all duration-200 resize-none"
              placeholder="Describe your campaign and its goals"
            />
          </div>

          {/* Target Amount */}
          <div>
            <label htmlFor="target" className="block text-sm font-medium text-gray-300 mb-2">
              Target Amount (ETH) *
            </label>
            <input
              type="number"
              id="target"
              name="target"
              value={form.target}
              onChange={handleChange}
              required
              min="0"
              step="0.001"
              className="w-full px-4 py-3 bg-black/50 border border-green-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50 transition-all duration-200"
              placeholder="0.0"
            />
          </div>

          {/* Deadline */}
          <div>
            <label htmlFor="deadline" className="block text-sm font-medium text-gray-300 mb-2">
              Campaign Deadline *
            </label>
            <input
              type="datetime-local"
              id="deadline"
              name="deadline"
              value={form.deadline}
              onChange={handleChange}
              required
              min={new Date().toISOString().slice(0, 16)}
              className="w-full px-4 py-3 bg-black/50 border border-green-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50 transition-all duration-200"
            />
          </div>

          {/* Campaign Image */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-300 mb-2">
              Campaign Image URL
            </label>
            <input
              type="url"
              id="image"
              name="image"
              value={form.image}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-black/50 border border-green-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50 transition-all duration-200"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isCreating}
            className="w-full py-4 px-6 bg-gradient-to-r from-green-500 to-green-600 text-black font-bold text-lg rounded-lg hover:from-green-400 hover:to-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-green-500/25 transform hover:scale-[1.02]"
          >
            {isCreating ? 'Creating Campaign...' : 'Create Campaign'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCampaign;
