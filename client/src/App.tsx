import React, { useState } from 'react';
import { Header, CampaignsList, CreateCampaign } from './components';

export function App() {
  const [activeTab, setActiveTab] = useState<'campaigns' | 'create'>('campaigns');

	return (
    <div className="min-h-screen bg-black">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
				<Header />

      {/* Main Content */}
      <main className="relative z-10">
        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="flex justify-center mb-8">
            <div className="bg-black/60 backdrop-blur-sm border border-green-500/20 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('campaigns')}
                className={`px-6 py-3 rounded-md font-semibold transition-all duration-200 ${
                  activeTab === 'campaigns'
                    ? 'bg-green-500 text-black shadow-lg shadow-green-500/25'
                    : 'text-gray-400 hover:text-green-400'
                }`}
              >
                Browse Campaigns
              </button>
              <button
                onClick={() => setActiveTab('create')}
                className={`px-6 py-3 rounded-md font-semibold transition-all duration-200 ${
                  activeTab === 'create'
                    ? 'bg-green-500 text-black shadow-lg shadow-green-500/25'
                    : 'text-gray-400 hover:text-green-400'
                }`}
              >
                Create Campaign
              </button>
            </div>
          </div>
				</div>

        {/* Tab Content */}
        {activeTab === 'campaigns' ? <CampaignsList /> : <CreateCampaign />}
		</main>

      {/* Footer */}
      <footer className="relative z-10 bg-black/60 backdrop-blur-sm border-t border-green-500/20 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-sm">CF</span>
              </div>
              <h3 className="text-xl font-bold text-white">
                <span className="text-green-400">Crowd</span>Fund
              </h3>
            </div>
            <p className="text-gray-400 text-sm">
              Decentralized crowdfunding platform built on blockchain
            </p>
            <div className="mt-4 pt-4 border-t border-gray-700">
              <p className="text-gray-500 text-xs">
                © 2024 CrowdFund DApp. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
		</div>
	);
}
