import React from 'react';
import { ConnectButton } from "thirdweb/react";
import { client } from "../client";
import { useStateContext } from "../context";

interface HeaderProps {
  activeTab: 'campaigns' | 'create' | 'about';
  setActiveTab: (tab: 'campaigns' | 'create' | 'about') => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const { address } = useStateContext();
  return (
    <header className="bg-black/90 backdrop-blur-sm border-b border-green-500/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-600 rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-xl">CF</span>
            </div>
            <h1 className="text-2xl font-bold text-white">
              <span className="text-green-400">Crowd</span>Fund
            </h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => setActiveTab('campaigns')}
              className={`transition-colors duration-200 ${
                activeTab === 'campaigns' ? 'text-green-400' : 'text-gray-300 hover:text-green-400'
              }`}
            >
              Campaigns
            </button>
            <button 
              onClick={() => setActiveTab('create')}
              className={`transition-colors duration-200 ${
                activeTab === 'create' ? 'text-green-400' : 'text-gray-300 hover:text-green-400'
              }`}
            >
              Create
            </button>
            <button 
              onClick={() => setActiveTab('about')}
              className={`transition-colors duration-200 ${
                activeTab === 'about' ? 'text-green-400' : 'text-gray-300 hover:text-green-400'
              }`}
            >
              About
            </button>
          </nav>

          {/* Connect Button and Status */}
          <div className="flex items-center space-x-4">
            {address && (
              <div className="text-sm text-green-400">
                Connected: {address.slice(0, 6)}...{address.slice(-4)}
              </div>
            )}
            <ConnectButton
              client={client}
              appMetadata={{
                name: "CrowdFund DApp",
                url: "https://crowdfund-dapp.com",
              }}
              theme="dark"
              connectButton={{
                label: address ? "Connected" : "Connect Wallet",
                style: {
                  backgroundColor: address ? "#059669" : "#10b981",
                  color: "#000000",
                  borderRadius: "8px",
                  padding: "12px 24px",
                  fontWeight: "600",
                  border: "1px solid #10b981",
                  boxShadow: "0 0 20px rgba(16, 185, 129, 0.3)",
                }
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
