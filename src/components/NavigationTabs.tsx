import React from 'react';
import { BarChart3, Upload, Activity, Globe, Brain } from 'lucide-react';

interface NavigationTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const NavigationTabs: React.FC<NavigationTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'upload', label: 'Data Upload', icon: Upload },
    { id: 'models', label: 'Model Comparison', icon: Activity },
    { id: 'economic', label: 'Economic Analysis', icon: Globe },
    { id: 'sentiment', label: 'Sentiment Training', icon: Brain }
  ];

  return (
    <div className="bg-gray-800 border-b border-gray-700">
      <div className="flex space-x-8 px-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default NavigationTabs;