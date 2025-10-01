import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Brain,
  BarChart3,
  Globe,
  Upload,
} from 'lucide-react';

import StockChart from './components/StockChart';
import SentimentAnalysis from './components/SentimentAnalysis';
import ModelMetrics from './components/ModelMetrics';
import EconomicIndicators from './components/EconomicIndicators';
import StockSelector from './components/StockSelector';
import CSVUpload from './components/CSVUpload';
import ModelComparison from './components/ModelComparison';
import SentimentTraining from './components/SentimentTraining';
import { generateMockData } from './utils/mockData';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedStock, setSelectedStock] = useState('AAPL');
  const [stockData, setStockData] = useState<any>(null);
  const [sentimentData, setSentimentData] = useState<any>(null);
  const [uploadedData, setUploadedData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const data = uploadedData || generateMockData(selectedStock);
      setStockData(data.stockData);
      setSentimentData(data.sentimentData);
      setLoading(false);
    };

    loadData();
  }, [selectedStock, uploadedData]);

  const handleDataUpload = (data: any) => {
    setUploadedData(data);
    setLoading(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center relative overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)',
          }}
        ></div>
        <div className="text-center relative z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto"></div>
          <p className="text-gray-300 mt-4">Loading market data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex relative">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 border-r border-gray-700 min-h-screen relative">
        {/* Sidebar Background Accent */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/6802049/pexels-photo-6802049.jpeg?auto=compress&cs=tinysrgb&w=400&h=800&fit=crop)',
          }}
        ></div>

        <div className="p-6 relative z-10">
          <nav className="space-y-4">
            <div className="text-gray-400 text-sm font-medium uppercase tracking-wide">
              Overview
            </div>
            <div className="space-y-2">
              <div
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer ${
                  activeTab === 'dashboard'
                    ? 'text-blue-400 bg-blue-400/10'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => setActiveTab('dashboard')}
              >
                <BarChart3 className="h-4 w-4" />
                <span className="text-sm">Price Prediction</span>
              </div>

              <div
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer ${
                  activeTab === 'upload'
                    ? 'text-blue-400 bg-blue-400/10'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => setActiveTab('upload')}
              >
                <Upload className="h-4 w-4" />
                <span className="text-sm">Data Upload</span>
              </div>

              <div
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer ${
                  activeTab === 'models'
                    ? 'text-blue-400 bg-blue-400/10'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => setActiveTab('models')}
              >
                <Activity className="h-4 w-4" />
                <span className="text-sm">Model Comparison</span>
              </div>

              <div
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer ${
                  activeTab === 'economic'
                    ? 'text-blue-400 bg-blue-400/10'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => setActiveTab('economic')}
              >
                <Globe className="h-4 w-4" />
                <span className="text-sm">Economic Indicators</span>
              </div>

              <div
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer ${
                  activeTab === 'sentiment'
                    ? 'text-blue-400 bg-blue-400/10'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => setActiveTab('sentiment')}
              >
                <Brain className="h-4 w-4" />
                <span className="text-sm">Sentiment Training</span>
              </div>
            </div>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex items-center justify-between relative z-10">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-500 p-2 rounded-lg">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">StockPredict AI</h1>
              <p className="text-sm text-gray-400">
                Advanced ML Prediction Platform
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <StockSelector
              selectedStock={selectedStock}
              onStockChange={setSelectedStock}
            />
          </div>
        </header>

        <main className="flex-1 p-6 relative z-10">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stock Overview */}
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 relative">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">
                    Stock Price Prediction Dashboard
                  </h2>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-400">LSTM Model</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-sm text-gray-400">
                        Random Forest
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-400">
                        Hybrid Model
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                      <span className="text-sm text-gray-400">
                        Actual Price
                      </span>
                    </div>
                  </div>
                </div>

                {stockData && (
                  <StockChart data={stockData} symbol={selectedStock} />
                )}
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ModelMetrics />
                <SentimentAnalysis data={sentimentData} />
              </div>
            </div>
          )}

          {activeTab === 'upload' && <CSVUpload onDataUpload={handleDataUpload} />}

          {activeTab === 'models' && <ModelComparison stockData={stockData} />}

          {activeTab === 'economic' && (
            <div className="space-y-6">
              <EconomicIndicators />
            </div>
          )}

          {activeTab === 'sentiment' && <SentimentTraining />}
        </main>
      </div>
    </div>
  );
}

export default App;
