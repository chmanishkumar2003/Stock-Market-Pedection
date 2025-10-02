import React from 'react';
import { Activity, Target, TrendingUp, Zap } from 'lucide-react';

const ModelMetrics: React.FC = () => {
  const metrics = {
    lstm: {
      mae: 0.0652,
      mse: 0.0064,
      rmse: 0.0801,
      accuracy: 87.2
    },
    hybrid: {
      mae: 0.0421,
      mse: 0.0026,
      rmse: 0.0509,
      accuracy: 92.8
    }
  };

  const improvement = {
    mae: ((metrics.lstm.mae - metrics.hybrid.mae) / metrics.lstm.mae * 100),
    mse: ((metrics.lstm.mse - metrics.hybrid.mse) / metrics.lstm.mse * 100),
    rmse: ((metrics.lstm.rmse - metrics.hybrid.rmse) / metrics.lstm.rmse * 100),
    accuracy: metrics.hybrid.accuracy - metrics.lstm.accuracy
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 relative overflow-hidden">
      {/* Background Image for Model Metrics */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/6802052/pexels-photo-6802052.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop)'
        }}
      ></div>
      <div className="flex items-center space-x-2 mb-6">
        <Activity className="h-5 w-5 text-green-400" />
        <h3 className="text-lg font-semibold text-white">Model Performance Metrics</h3>
        <span className="text-sm text-gray-400">(LSTM vs Hybrid)</span>
      </div>

      {/* Model Architecture Overview */}
      <div className="mb-6 p-4 bg-gray-700 rounded-lg relative z-10">
        <h4 className="text-sm font-medium text-white mb-3">Hybrid Model Architecture</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-sm font-medium text-blue-400 mb-2">LSTM Component</div>
            <div className="text-xs text-gray-400 space-y-1">
              <div>• 50 LSTM units with dropout (0.2)</div>
              <div>• Adam optimizer, learning rate 0.001</div>
              <div>• Sequential data processing</div>
              <div>• Temporal pattern recognition</div>
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-green-400 mb-2">Random Forest Component</div>
            <div className="text-xs text-gray-400 space-y-1">
              <div>• 100 estimators, max depth 10</div>
              <div>• Residual error correction</div>
              <div>• Non-linear relationship capture</div>
              <div>• Feature importance ranking</div>
            </div>
          </div>
        </div>
      </div>
      {/* Performance Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Zap className="h-4 w-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-400">LSTM Model</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">RMSE:</span>
              <span className="text-white font-medium">{metrics.lstm.rmse.toFixed(4)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Accuracy:</span>
              <span className="text-white font-medium">{metrics.lstm.accuracy}%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">MAE:</span>
              <span className="text-white font-medium">{metrics.lstm.mae.toFixed(4)}</span>
            </div>
          </div>
        </div>

        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Target className="h-4 w-4 text-green-400" />
            <span className="text-sm font-medium text-green-400">Hybrid Model</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">RMSE:</span>
              <span className="text-white font-medium">{metrics.hybrid.rmse.toFixed(4)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Accuracy:</span>
              <span className="text-white font-medium">{metrics.hybrid.accuracy}%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">MAE:</span>
              <span className="text-white font-medium">{metrics.hybrid.mae.toFixed(4)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-400 mb-3">Performance Improvement Analysis</h4>
        
        {[
          { name: 'MAE', lstm: metrics.lstm.mae, hybrid: metrics.hybrid.mae, improvement: improvement.mae },
          { name: 'MSE', lstm: metrics.lstm.mse, hybrid: metrics.hybrid.mse, improvement: improvement.mse },
          { name: 'RMSE', lstm: metrics.lstm.rmse, hybrid: metrics.hybrid.rmse, improvement: improvement.rmse }
        ].map((metric, index) => (
          <div key={index} className="bg-gray-700 rounded-lg p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-medium">{metric.name}</span>
              <div className="flex items-center space-x-1 text-green-400 text-sm">
                <TrendingUp className="h-3 w-3" />
                <span>{metric.improvement.toFixed(1)}% better</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">LSTM:</span>
                <span className="text-white">{metric.lstm.toFixed(4)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Hybrid:</span>
                <span className="text-green-400 font-medium">{metric.hybrid.toFixed(4)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Feature Engineering */}
      <div className="mt-6 p-4 bg-gray-700 rounded-lg">
        <h4 className="text-sm font-medium text-white mb-2">Feature Engineering & Input Data</h4>
        <div className="text-xs text-gray-400 space-y-1">
          <div>• Technical Indicators: MACD, RSI, Bollinger Bands, Moving Averages</div>
          <div>• Economic Features: VXN (volatility), USDX (dollar strength), UNRATE</div>
          <div>• Sentiment Features: BERT-derived positive, neutral, negative scores</div>
          <div>• Historical Prices: Last 5 days of OHLC data for temporal patterns</div>
          <div>• Volume Analysis: Trading volume patterns and anomaly detection</div>
          <div>• Market Trends: Sector performance and correlation analysis</div>
        </div>
      </div>
    </div>
  );
};

export default ModelMetrics;