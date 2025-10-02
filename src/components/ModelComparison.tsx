import React, { useState } from 'react';
import { Activity, Brain, TreePine, Zap, TrendingUp, BarChart3 } from 'lucide-react';

interface ModelComparisonProps {
  stockData: any;
}

const ModelComparison: React.FC<ModelComparisonProps> = ({ stockData }) => {
  const [selectedModel, setSelectedModel] = useState('all');

  const models = [
    {
      id: 'lstm',
      name: 'LSTM Model',
      icon: Brain,
      color: 'blue',
      description: 'Long Short-Term Memory neural network for sequential data',
      metrics: {
        mae: 0.0652,
        mse: 0.0064,
        rmse: 0.0801,
        accuracy: 87.2,
        r2: 0.842
      },
      features: [
        'Sequential pattern recognition',
        'Memory cells for long-term dependencies',
        'Handles temporal relationships',
        'Good for trend prediction'
      ]
    },
    {
      id: 'rf',
      name: 'Random Forest',
      icon: TreePine,
      color: 'purple',
      description: 'Ensemble method using multiple decision trees',
      metrics: {
        mae: 0.0587,
        mse: 0.0048,
        rmse: 0.0693,
        accuracy: 89.1,
        r2: 0.867
      },
      features: [
        'Handles non-linear relationships',
        'Feature importance ranking',
        'Robust to outliers',
        'Good generalization'
      ]
    },
    {
      id: 'hybrid',
      name: 'Hybrid Model',
      icon: Zap,
      color: 'green',
      description: 'LSTM + Random Forest combination for enhanced accuracy',
      metrics: {
        mae: 0.0421,
        mse: 0.0026,
        rmse: 0.0509,
        accuracy: 92.8,
        r2: 0.912
      },
      features: [
        'Combines temporal and non-linear patterns',
        'Error correction mechanism',
        'Best overall performance',
        'Robust predictions'
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
      purple: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
      green: 'bg-green-500/10 border-green-500/20 text-green-400'
    };
    return colors[color as keyof typeof colors];
  };

  const getChartColor = (color: string) => {
    const colors = {
      blue: '#3B82F6',
      purple: '#8B5CF6',
      green: '#10B981'
    };
    return colors[color as keyof typeof colors];
  };

  const renderModelChart = (model: any) => {
    if (!stockData) return null;

    const data = stockData.actual.map((actual: number, index: number) => ({
      actual,
      predicted: model.id === 'lstm' ? stockData.lstm[index] : 
                 model.id === 'rf' ? stockData.randomForest?.[index] || stockData.hybrid[index] :
                 stockData.hybrid[index]
    }));

    const maxPrice = Math.max(...data.map((d: any) => Math.max(d.actual, d.predicted)));
    const minPrice = Math.min(...data.map((d: any) => Math.min(d.actual, d.predicted)));
    const range = maxPrice - minPrice;

    const getY = (value: number) => ((maxPrice - value) / range) * 200 + 20;

    const actualPath = data.map((d: any, i: number) => {
      const x = (i / (data.length - 1)) * 100;
      const y = getY(d.actual);
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');

    const predictedPath = data.map((d: any, i: number) => {
      const x = (i / (data.length - 1)) * 100;
      const y = getY(d.predicted);
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');

    return (
      <div className="bg-gray-900 rounded-lg p-4">
        <svg width="100%" height="240" viewBox="0 0 100 240" className="overflow-visible">
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map(i => (
            <g key={i}>
              <line
                x1="0"
                y1={20 + i * 50}
                x2="100"
                y2={20 + i * 50}
                stroke="#374151"
                strokeWidth="0.5"
                strokeDasharray="2,2"
              />
              <text
                x="-2"
                y={25 + i * 50}
                fill="#9CA3AF"
                fontSize="3"
                textAnchor="end"
              >
                ${(maxPrice - (i * range / 4)).toFixed(0)}
              </text>
            </g>
          ))}

          {/* Actual Price Line */}
          <path
            d={actualPath}
            stroke="#9CA3AF"
            strokeWidth="1.2"
            fill="none"
          />

          {/* Predicted Price Line */}
          <path
            d={predictedPath}
            stroke={getChartColor(model.color)}
            strokeWidth="1.5"
            fill="none"
          />

          {/* Data points */}
          {data.map((d: any, index: number) => (
            <circle
              key={index}
              cx={(index / (data.length - 1)) * 100}
              cy={getY(d.predicted)}
              r="0.8"
              fill={getChartColor(model.color)}
            />
          ))}
        </svg>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 relative overflow-hidden">
        {/* Background Image for Model Comparison */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/6802044/pexels-photo-6802044.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop)'
          }}
        ></div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white relative z-10">Model Performance Comparison</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedModel('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors relative z-10 ${
                selectedModel === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              All Models
            </button>
            {models.map((model) => (
              <button
                key={model.id}
                onClick={() => setSelectedModel(model.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors relative z-10 ${
                  selectedModel === model.id
                    ? `bg-${model.color}-600 text-white`
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {model.name}
              </button>
            ))}
          </div>
        </div>

        {/* Performance Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 relative z-10">
          {models.map((model) => {
            const Icon = model.icon;
            return (
              <div
                key={model.id}
                className={`rounded-lg p-4 border ${getColorClasses(model.color)}`}
              >
                <div className="flex items-center space-x-2 mb-3">
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{model.name}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Accuracy:</span>
                    <span className="text-white font-medium">{model.metrics.accuracy}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">RMSE:</span>
                    <span className="text-white font-medium">{model.metrics.rmse.toFixed(4)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">R²:</span>
                    <span className="text-white font-medium">{model.metrics.r2.toFixed(3)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Individual Model Details */}
      {(selectedModel === 'all' ? models : models.filter(m => m.id === selectedModel)).map((model) => {
        const Icon = model.icon;
        return (
          <div key={model.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center space-x-3 mb-4">
              <div className={`p-2 rounded-lg ${getColorClasses(model.color)}`}>
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{model.name}</h3>
                <p className="text-sm text-gray-400">{model.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Performance Chart */}
              <div>
                <h4 className="text-white font-medium mb-3">Prediction vs Actual</h4>
                {renderModelChart(model)}
                <div className="flex justify-between mt-2 text-xs text-gray-400">
                  <span>30 days ago</span>
                  <span>Today</span>
                </div>
              </div>

              {/* Detailed Metrics */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-white font-medium mb-3">Performance Metrics</h4>
                  <div className="space-y-3">
                    {Object.entries(model.metrics).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm uppercase">{key}:</span>
                        <span className="text-white font-medium">
                          {typeof value === 'number' ? 
                            (key === 'accuracy' ? `${value}%` : value.toFixed(4)) : 
                            value
                          }
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-3">Key Features</h4>
                  <ul className="space-y-2">
                    {model.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2 text-sm text-gray-300">
                        <div className={`w-2 h-2 rounded-full bg-${model.color}-400`}></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Comparison Summary */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Model Comparison Summary</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Model</th>
                <th className="text-right py-3 px-4 text-gray-400 font-medium">MAE</th>
                <th className="text-right py-3 px-4 text-gray-400 font-medium">MSE</th>
                <th className="text-right py-3 px-4 text-gray-400 font-medium">RMSE</th>
                <th className="text-right py-3 px-4 text-gray-400 font-medium">Accuracy</th>
                <th className="text-right py-3 px-4 text-gray-400 font-medium">R²</th>
              </tr>
            </thead>
            <tbody>
              {models.map((model) => (
                <tr key={model.id} className="border-b border-gray-700">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full bg-${model.color}-400`}></div>
                      <span className="text-white font-medium">{model.name}</span>
                    </div>
                  </td>
                  <td className="text-right py-3 px-4 text-gray-300">{model.metrics.mae.toFixed(4)}</td>
                  <td className="text-right py-3 px-4 text-gray-300">{model.metrics.mse.toFixed(4)}</td>
                  <td className="text-right py-3 px-4 text-gray-300">{model.metrics.rmse.toFixed(4)}</td>
                  <td className="text-right py-3 px-4 text-gray-300">{model.metrics.accuracy}%</td>
                  <td className="text-right py-3 px-4 text-gray-300">{model.metrics.r2.toFixed(3)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ModelComparison;