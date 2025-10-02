import React from 'react';
import { Globe, DollarSign, Users, TrendingUp, BarChart3, MessageCircle } from 'lucide-react';

const EconomicIndicators: React.FC = () => {
  const indicators = [
    {
      name: 'VXN (Volatility Index)',
      value: 18.42,
      change: -2.1,
      icon: TrendingUp,
      color: 'blue',
      description: 'Market volatility and fear gauge'
    },
    {
      name: 'USDX (Dollar Index)',
      value: 103.25,
      change: 0.8,
      icon: DollarSign,
      color: 'green',
      description: 'US Dollar strength vs major currencies'
    },
    {
      name: 'UNRATE (Unemployment Rate)',
      value: 3.7,
      change: -0.1,
      icon: Users,
      color: 'purple',
      description: 'US unemployment rate percentage'
    }
  ];

  const getColorClasses = (color: string, isPositive: boolean) => {
    const colors = {
      blue: isPositive ? 'text-blue-400 bg-blue-500/10' : 'text-red-400 bg-red-500/10',
      green: isPositive ? 'text-green-400 bg-green-500/10' : 'text-red-400 bg-red-500/10',
      purple: isPositive ? 'text-purple-400 bg-purple-500/10' : 'text-red-400 bg-red-500/10'
    };
    return colors[color as keyof typeof colors];
  };

  const getIconColor = (color: string) => {
    const colors = {
      blue: 'text-blue-400',
      green: 'text-green-400',
      purple: 'text-purple-400'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 relative overflow-hidden">
      {/* Background Image for Economic Indicators */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop)'
        }}
      ></div>
      <div className="flex items-center space-x-2 mb-6">
        <Globe className="h-5 w-5 text-orange-400" />
        <h3 className="text-lg font-semibold text-white">Economic Indicators</h3>
        <span className="text-sm text-gray-400">(FRED API Data)</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
        {indicators.map((indicator, index) => {
          const Icon = indicator.icon;
          const isPositive = indicator.change >= 0;
          
          return (
            <div key={index} className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <Icon className={`h-5 w-5 ${getIconColor(indicator.color)}`} />
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getColorClasses(indicator.color, isPositive)}`}>
                  {isPositive ? '+' : ''}{indicator.change.toFixed(1)}%
                </div>
              </div>
              
              <div className="mb-2">
                <div className="text-xl font-bold text-white">{indicator.value}</div>
                <div className="text-sm font-medium text-gray-300">{indicator.name}</div>
              </div>
              
              <div className="text-xs text-gray-400">{indicator.description}</div>
            </div>
          );
        })}
      </div>

      {/* Additional Economic Context */}
      <div className="mt-6 p-4 bg-gray-700 rounded-lg">
        <h4 className="text-sm font-medium text-white mb-2">Market Context</h4>
        <div className="text-xs text-gray-400 space-y-1">
          <div>• Low volatility (VXN &lt; 20) indicates stable market conditions</div>
          <div>• Strong dollar (USDX &gt; 100) may pressure international stocks</div>
          <div>• Low unemployment suggests healthy economic fundamentals</div>
          <div>• These indicators are integrated into our hybrid prediction model</div>
        </div>
      </div>
    </div>
  );
};

export default EconomicIndicators;