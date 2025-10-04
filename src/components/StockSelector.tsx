import React from 'react';
import { ChevronDown } from 'lucide-react';

interface StockSelectorProps {
  selectedStock: string;
  onStockChange: (stock: string) => void;
}

const StockSelector: React.FC<StockSelectorProps> = ({ selectedStock, onStockChange }) => {
  const stocks = [
    'AAPL', 'ABBV', 'ACN', 'AMZN', 'ASML', 'AVGO', 'AXP', 'AZN', 'BABA', 'BAC',
    'CRM', 'CSCO', 'FMX', 'GOOG', 'GOOGL', 'HD', 'IBM', 'JNJ', 'JPM', 'KO',
    'LLY', 'MA', 'MS', 'NFLX', 'NVDA', 'NVO', 'ORCL', 'PG', 'SMFG', 'TM',
    'TMUS', 'TSLA', 'TSM', 'UNH', 'V', 'WFC', 'WMT', 'XOM'
  ];

  const getCompanyName = (symbol: string) => {
    const names: Record<string, string> = {
      'AAPL': 'Apple Inc.',
      'ABBV': 'AbbVie Inc.',
      'AMZN': 'Amazon.com Inc.',
      'NVDA': 'NVIDIA Corporation',
      'TSLA': 'Tesla Inc.',
      'GOOGL': 'Alphabet Inc.',
      'MSFT': 'Microsoft Corporation'
    };
    return names[symbol] || `${symbol} Inc.`;
  };

  return (
    <div className="relative">
      <select
        value={selectedStock}
        onChange={(e) => onStockChange(e.target.value)}
        className="appearance-none bg-gray-700 border border-gray-600 text-white px-4 py-2 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {stocks.map((stock) => (
          <option key={stock} value={stock}>
            {stock} - {getCompanyName(stock)}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
    </div>
  );
};

export default StockSelector;