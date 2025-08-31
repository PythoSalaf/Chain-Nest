import React, { useState, useEffect } from 'react';
import {Coins, Send, User, Users, Target } from 'lucide-react';

interface DepositFormProps {
  account: string;
  onDeposit: () => void;
  initiateWithdraw: () => void;
  loading: boolean;
}

export let deposit_amount: string;
export let withdrawAmount:string;

export const DepositForm: React.FC<DepositFormProps> = ({
  account,
  onDeposit,
  initiateWithdraw,
  loading,
}) => {
  const [amount, setAmount] = useState('');
  const [selectedTab, setSelectedTab] = useState<'self' | 'custom'>('self');
  const [depositAmount, setDepositAmount] = useState('')
  

  useEffect(()=>{
      
    deposit_amount = depositAmount
    withdrawAmount = amount

  },[depositAmount, amount])

  const inititate = (e: React.FormEvent) => {
    e.preventDefault();
    if (Number(amount) > 0) {
      initiateWithdraw();
    }
  };

  return (
    <div className="bg-green-900 rounded-xl shadow-lg p-6 border border-green-400">
      <h3 className="text-xl font-semibold text-green-200 mb-6 flex items-center">
        <Send className="w-6 h-6 mr-2 text-green-300" />
        Deposit your FLR Tokens
      </h3>

      <div className="flex space-x-1 mb-6 bg-green-800 p-1 rounded-lg">
        <button
          onClick={() => setSelectedTab('self')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            selectedTab === 'self'
              ? 'bg-green-400 text-gray-900 shadow-sm'
              : 'text-green-300 hover:text-green-200'
          }`}
        >
          <Coins className="w-4 h-4 inline mr-2" />
          Deposit
        </button>
        <button
          onClick={() => setSelectedTab('custom')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            selectedTab === 'custom'
              ? 'bg-green-400 text-gray-900 shadow-sm'
              : 'text-green-300 hover:text-green-200'
          }`}
        >
          <Target className="w-4 h-4 inline mr-2" />
          Withdraw
        </button>
      </div>

      {selectedTab === 'self' && (
        <div className="space-y-4">
          <div className="p-4 bg-green-100 rounded-lg">
            <p className="text-gray-900 font-medium mb-2">Enter FLR amount to deposit</p>
            <input type="number" className="pl-[8px] space-y-4 text-gray-900 border-2 border-green-500 focus:border-green-600 focus:outline-none
             rounded-md py-1 text-lg mb-4 bg-white" placeholder='2 FLR' onChange={(e)=>{setDepositAmount(e.target.value)}} />
           
          </div>
          
          <button
            onClick={onDeposit}
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-700 disabled:to-gray-800 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100 flex items-center justify-center"
          >
            {loading ? 'Depositing...' : 'Deposit'}
          </button>
        </div>
      )}

      {selectedTab === 'custom' && (
        <form onSubmit={inititate} className="space-y-4">
          <div className="p-4 bg-green-100 rounded-lg">
            <p className="text-gray-900 font-medium mb-2">Enter Withdraw Amount</p>
            <p className="text-gray-700 text-sm">
              <span className="text-green-700 font-[800]">Note</span> The yield will subsequently be calculated for the unwithdrawn balance
            </p>
          </div>
          
          <div>
            {/* <label htmlFor="customAddress" className="block text-sm font-medium text-gray-700 mb-2">
              Ethereum Address
            </label> */}
            
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="2 FLR"
             // className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors font-mono text-sm"
            className="pl-[8px] space-y-4 text-gray-900 border-2 border-green-500 focus:border-green-600 focus:outline-none
             rounded-md py-1 text-lg mb-2 bg-white"
            />
            {amount && (
              <p className="text-green-300 text-sm">Enter value below {}## FLR</p>
            )}
          </div>
          
          <button
            type="submit"
            disabled={Number(amount) <= 0 || loading}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-700 disabled:to-gray-800 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100 flex items-center justify-center"
          >
            <Target className="w-5 h-5 mr-2" />
            {loading ? 'Intiating...' : 'Initiate Withdraw'}
          </button>
        </form>
      )}
    </div>
  );
};