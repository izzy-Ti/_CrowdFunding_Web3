import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-black font-bold text-3xl">CF</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            About <span className="text-green-400">CrowdFund</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A decentralized crowdfunding platform built on blockchain technology, 
            empowering creators and supporters worldwide.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-black/60 backdrop-blur-sm border border-green-500/20 rounded-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            Our <span className="text-green-400">Mission</span>
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed text-center">
            To democratize funding by creating a transparent, secure, and accessible platform 
            where anyone can support causes they believe in or launch their own campaigns 
            without traditional barriers.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-black/60 backdrop-blur-sm border border-green-500/20 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-green-400 text-2xl">🔒</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Secure & Transparent</h3>
            <p className="text-gray-400">
              All transactions are recorded on the blockchain, ensuring complete transparency and security.
            </p>
          </div>

          <div className="bg-black/60 backdrop-blur-sm border border-green-500/20 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-green-400 text-2xl">🌍</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Global Access</h3>
            <p className="text-gray-400">
              Anyone, anywhere can create campaigns or donate, breaking down geographical barriers.
            </p>
          </div>

          <div className="bg-black/60 backdrop-blur-sm border border-green-500/20 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-green-400 text-2xl">⚡</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Fast & Efficient</h3>
            <p className="text-gray-400">
              Instant transactions with minimal fees, powered by blockchain technology.
            </p>
          </div>

          <div className="bg-black/60 backdrop-blur-sm border border-green-500/20 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-green-400 text-2xl">🎯</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Goal-Oriented</h3>
            <p className="text-gray-400">
              Set clear funding targets and deadlines to focus your campaign efforts.
            </p>
          </div>

          <div className="bg-black/60 backdrop-blur-sm border border-green-500/20 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-green-400 text-2xl">👥</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Community Driven</h3>
            <p className="text-gray-400">
              Built by and for the community, with no central authority controlling the platform.
            </p>
          </div>

          <div className="bg-black/60 backdrop-blur-sm border border-green-500/20 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-green-400 text-2xl">💎</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Low Fees</h3>
            <p className="text-gray-400">
              Minimal transaction fees compared to traditional crowdfunding platforms.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-black/60 backdrop-blur-sm border border-green-500/20 rounded-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            How It <span className="text-green-400">Works</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-black font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Create Campaign</h3>
              <p className="text-gray-400">
                Set up your campaign with a clear goal, description, and funding target.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-black font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Share & Promote</h3>
              <p className="text-gray-400">
                Share your campaign with your network and community to gain support.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-black font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Receive Funds</h3>
              <p className="text-gray-400">
                Collect donations directly to your wallet when supporters contribute.
              </p>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="bg-black/60 backdrop-blur-sm border border-green-500/20 rounded-xl p-8">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            Built With <span className="text-green-400">Modern Technology</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-400 text-xl">⚛️</span>
              </div>
              <p className="text-gray-300 font-medium">React</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-purple-400 text-xl">🔷</span>
              </div>
              <p className="text-gray-300 font-medium">TypeScript</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-green-400 text-xl">⛓️</span>
              </div>
              <p className="text-gray-300 font-medium">Blockchain</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-orange-400 text-xl">🔶</span>
              </div>
              <p className="text-gray-300 font-medium">Thirdweb</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
