import React from 'react';
import { Wallet, AlertCircle } from 'lucide-react';

interface WalletConnectionProps {
  account: string | null;
  isConnecting: boolean;
  isOnCrossFi: boolean;
  connectWallet: () => void;
  switchtoCrossFi: () => void;
}

export const WalletConnection: React.FC<WalletConnectionProps> = ({
  account,
  isConnecting,
  isOnCrossFi,
  connectWallet,
  switchtoCrossFi,
}) => {
  if (!account) {
    return (
      <div className="bg-green-900 rounded-xl shadow-lg p-6 border border-green-400">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-200 rounded-full mb-4">
            <Wallet className="w-8 h-8 text-gray-900" />
          </div>
          <h3 className="text-xl font-semibold text-green-200 mb-2">
            Connect Your Wallet
          </h3>
          <p className="text-green-300 mb-6">
            Connect your wallet to start earn on your FLR
          </p>
          <button
            onClick={connectWallet}
            disabled={isConnecting}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-700 disabled:to-gray-800 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100"
          >
            {isConnecting ? 'Connecting...' : 'Connect Wallet'}
          </button>
        </div>
      </div>
    );
  }

  if (!isOnCrossFi) {
    return (
      <div className="bg-green-800 border border-green-400 rounded-xl p-6">
        <div className="flex items-center">
          <AlertCircle className="w-6 h-6 text-green-400 mr-3" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-green-200">
              Switch to Flare Coston 2
            </h3>
            <p className="text-green-300 mt-1">
              This application requires the Cross Finance network to function properly
            </p>
          </div>
          <button
            onClick={switchtoCrossFi}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Switch Network
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-green-100 border border-green-600 rounded-xl p-4">
      <div className="flex items-center">
        <div className="w-3 h-3 bg-green-600 rounded-full mr-3"></div>
        <div>
          <p className="text-gray-900 font-medium">Connected on <b>Flare Testnet Coston 2 </b></p>
          <p className="text-gray-700 text-sm">
            {account.slice(0, 6)}...{account.slice(-4)}
          </p>
        </div>
      </div>
    </div>
  );
};