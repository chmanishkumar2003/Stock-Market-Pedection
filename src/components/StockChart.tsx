import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StockChartProps {
  data: {
    dates: string[];
    actual: number[];
    lstm: number[];
    randomForest?: number[];
    hybrid: number[];
    currentPrice: number;
    change: number;
    changePercent: number;
  };
  symbol: string;
}

const StockChart: React.FC<StockChartProps> = ({ data, symbol }) => {
  const allPrices = [
    ...data.actual, 
    ...data.lstm, 
    ...(data.randomForest || []), 
    ...data.hybrid
  ];
  const maxPrice = Math.max(...allPrices);
  const minPrice = Math.min(...allPrices);
  const range = maxPrice - minPrice;

  const getY = (value: number) => {
    return ((maxPrice - value) / range) * 300 + 30; // 300px chart height with 30px padding
  };

  const createPath = (values: number[]) => {
    return values.map((value, index) => {
      const x = (index / (values.length - 1)) * 100;
      const y = getY(value);
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  return (
    <div className="space-y-6">
      {/* Current Price Display */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div>
            <div className="text-4xl font-bold text-white">${data.currentPrice.toFixed(2)}</div>
            <div className="text-lg text-gray-400 font-medium">{symbol}</div>
          </div>
          <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${
            data.change >= 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
          }`}>
            {data.change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            <span>{data.change >= 0 ? '+' : ''}{data.change.toFixed(2)}</span>
            <span>({data.changePercent >= 0 ? '+' : ''}{data.changePercent.toFixed(2)}%)</span>
          </div>
        </div>
        
        {/* Data Sources Indicator */}
        <div className="text-right">
          <div className="text-sm text-gray-400 mb-1">Data Sources:</div>
          <div className="flex flex-col space-y-1 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span className="text-gray-300">NASDAQ Historical Data</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-gray-300">FRED Economic Indicators</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span className="text-gray-300">BERT Sentiment Analysis</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-700 relative overflow-hidden">
        {/* Chart Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop)'
          }}
        ></div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-white mb-2">Stock Price Prediction Analysis</h3>
          <p className="text-sm text-gray-400">Hybrid Model combining LSTM temporal patterns with Random Forest error correction</p>
        </div>
        
        <svg width="100%" height="360" viewBox="0 0 100 360" className="overflow-visible relative z-10">
          {/* Grid lines */}
          {[0, 1, 2, 3, 4, 5, 6].map(i => (
            <g key={i}>
              <line
                x1="0"
                y1={30 + i * 50}
                x2="100"
                y2={30 + i * 50}
                stroke="#374151"
                strokeWidth="0.5"
                strokeDasharray="2,2"
              />
              <text
                x="-2"
                y={35 + i * 50}
                fill="#9CA3AF"
                fontSize="3.5"
                textAnchor="end"
              >
                ${(maxPrice - (i * range / 6)).toFixed(0)}
              </text>
            </g>
          ))}

          {/* Actual Price Line */}
          <path
            d={createPath(data.actual)}
            stroke="#9CA3AF"
            strokeWidth="1.5"
            fill="none"
          />

          {/* LSTM Predictions */}
          <path
            d={createPath(data.lstm)}
            stroke="#3B82F6"
            strokeWidth="2"
            fill="none"
            strokeDasharray="3,2"
          />

          {/* Hybrid Predictions */}
          <path
            d={createPath(data.hybrid)}
            stroke="#10B981"
            strokeWidth="2.5"
            fill="none"
          />

          {/* Random Forest Predictions */}
          {data.randomForest && (
            <path
              d={createPath(data.randomForest)}
              stroke="#8B5CF6"
              strokeWidth="2"
              fill="none"
              strokeDasharray="4,3"
            />
          )}

          {/* Data points for hybrid model */}
          {data.hybrid.map((value, index) => (
            <circle
              key={index}
              cx={(index / (data.hybrid.length - 1)) * 100}
              cy={getY(value)}
              r="1.2"
              fill="#10B981"
            />
          ))}
        </svg>

        {/* Time labels */}
        <div className="flex justify-between mt-4 text-sm text-gray-400 relative z-10">
          {data.dates.filter((_, i) => i % Math.floor(data.dates.length / 5) === 0).map((date, i) => (
            <span key={i}>{new Date(date).toLocaleDateString()}</span>
          ))}
        </div>
      </div>

      {/* Prediction Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <div className="text-blue-400 text-sm font-medium">LSTM Prediction</div>
          <div className="text-white text-xl font-bold mt-1">
            ${data.lstm[data.lstm.length - 1].toFixed(2)}
          </div>
          <div className="text-gray-400 text-sm mt-2">
            Sequential pattern analysis using 5-day price history, MACD, and sentiment scores
          </div>
        </div>
        {data.randomForest && (
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
            <div className="text-purple-400 text-sm font-medium">Random Forest Prediction</div>
            <div className="text-white text-xl font-bold mt-1">
              ${data.randomForest[data.randomForest.length - 1].toFixed(2)}
            </div>
            <div className="text-gray-400 text-sm mt-2">
              Non-linear pattern recognition with 100 estimators and economic indicators
            </div>
          </div>
        )}
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
          <div className="text-green-400 text-sm font-medium">Hybrid Model Prediction</div>
          <div className="text-white text-xl font-bold mt-1">
            ${data.hybrid[data.hybrid.length - 1].toFixed(2)}
          </div>
          <div className="text-gray-400 text-sm mt-2">
            LSTM + Random Forest combination with residual error correction
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockChart;