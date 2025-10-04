import React, { useState } from 'react';
import { Brain, Database, Target, BarChart3, Zap, Settings, CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react';

const SentimentTraining: React.FC = () => {
  const [activeTab, setActiveTab] = useState('methodology');

  const trainingSteps = [
    {
      id: 'data-collection',
      title: 'Data Collection & Preprocessing',
      icon: Database,
      color: 'blue',
      details: [
        'Collected 500K+ financial news articles from Reuters, Bloomberg, WSJ, and Financial Times',
        'Applied domain-specific preprocessing: financial entity recognition, acronym expansion',
        'Implemented data quality filters: minimum length, language detection, duplicate removal',
        'Created balanced dataset with stratified sampling across 8 sentiment classes',
        'Applied text normalization: lowercasing, punctuation handling, special character removal'
      ]
    },
    {
      id: 'annotation',
      title: 'Multi-Class Annotation Strategy',
      icon: Target,
      color: 'green',
      details: [
        'Developed comprehensive annotation guidelines for 8 sentiment classes',
        'Trained 15 financial domain experts for consistent labeling',
        'Implemented inter-annotator agreement validation (Cohen\'s κ = 0.87)',
        'Created emotion detection labels using Plutchik\'s wheel of emotions',
        'Applied active learning to identify and label challenging edge cases'
      ]
    },
    {
      id: 'model-architecture',
      title: 'Model Architecture Design',
      icon: Brain,
      color: 'purple',
      details: [
        'Fine-tuned FinBERT (BERT pre-trained on financial corpus) as base model',
        'Added multi-head classification layer for 8 sentiment classes',
        'Implemented attention mechanism for financial entity focus',
        'Added emotion detection branch with shared representations',
        'Applied dropout (0.3) and layer normalization for regularization'
      ]
    },
    {
      id: 'training-process',
      title: 'Training Process & Optimization',
      icon: Settings,
      color: 'orange',
      details: [
        'Used AdamW optimizer with learning rate scheduling (1e-5 to 1e-6)',
        'Applied gradient clipping (max_norm=1.0) to prevent exploding gradients',
        'Implemented focal loss to handle class imbalance effectively',
        'Used mixed precision training for computational efficiency',
        'Applied early stopping with patience=5 based on validation F1-score'
      ]
    },
    {
      id: 'evaluation',
      title: 'Comprehensive Evaluation',
      icon: BarChart3,
      color: 'red',
      details: [
        'Stratified 5-fold cross-validation for robust performance estimation',
        'Temporal validation: trained on historical data, tested on recent news',
        'Out-of-domain testing on cryptocurrency and commodity news',
        'Human evaluation study with 100 financial experts (agreement: 91.2%)',
        'A/B testing against baseline models (TextBlob, VADER, RoBERTa)'
      ]
    }
  ];

  const performanceMetrics = {
    overall: {
      accuracy: 94.2,
      precision: 92.4,
      recall: 91.8,
      f1Score: 92.1,
      macroF1: 89.7
    },
    classwise: [
      { class: 'Positive', precision: 95.2, recall: 94.8, f1: 95.0, support: 8420 },
      { class: 'Negative', precision: 93.8, recall: 92.1, f1: 92.9, support: 7890 },
      { class: 'Neutral', precision: 89.4, recall: 91.2, f1: 90.3, support: 9120 },
      { class: 'Bullish', precision: 91.7, recall: 89.3, f1: 90.5, support: 6780 },
      { class: 'Bearish', precision: 88.9, recall: 87.4, f1: 88.1, support: 6450 },
      { class: 'Uncertain', precision: 86.2, recall: 84.7, f1: 85.4, support: 4320 },
      { class: 'Fear', precision: 87.1, recall: 85.9, f1: 86.5, support: 3890 },
      { class: 'Greed', precision: 84.8, recall: 83.2, f1: 84.0, support: 3210 }
    ]
  };

  const dataAugmentation = [
    {
      technique: 'Synonym Replacement',
      description: 'Replace words with financial domain synonyms',
      improvement: '+2.3% F1'
    },
    {
      technique: 'Back Translation',
      description: 'Translate to German/French and back to English',
      improvement: '+1.8% F1'
    },
    {
      technique: 'Contextual Word Embedding',
      description: 'Replace words with contextually similar embeddings',
      improvement: '+2.1% F1'
    },
    {
      technique: 'Paraphrasing',
      description: 'Generate paraphrases using T5 model',
      improvement: '+1.5% F1'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
      green: 'bg-green-500/10 border-green-500/20 text-green-400',
      purple: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
      orange: 'bg-orange-500/10 border-orange-500/20 text-orange-400',
      red: 'bg-red-500/10 border-red-500/20 text-red-400'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 relative overflow-hidden">
        {/* Background Image for Sentiment Training */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/6802046/pexels-photo-6802046.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop)'
          }}
        ></div>
        <div className="flex items-center space-x-2 mb-6">
          <Brain className="h-5 w-5 text-purple-400" />
          <h2 className="text-xl font-bold text-white relative z-10">Advanced Sentiment Analysis Model Development</h2>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-6 border-b border-gray-600 relative z-10">
          {[
            { id: 'methodology', label: 'Training Methodology' },
            { id: 'performance', label: 'Performance Metrics' },
            { id: 'augmentation', label: 'Data Augmentation' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Training Methodology */}
        {activeTab === 'methodology' && (
          <div className="space-y-6 relative z-10">
            {trainingSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.id} className={`rounded-lg p-4 border ${getColorClasses(step.color)}`}>
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-700">
                      <span className="text-sm font-bold text-white">{index + 1}</span>
                    </div>
                    <Icon className="h-5 w-5" />
                    <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                  </div>
                  <ul className="space-y-2 ml-11">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start space-x-2 text-sm text-gray-300">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        )}

        {/* Performance Metrics */}
        {activeTab === 'performance' && (
          <div className="space-y-6">
            {/* Overall Performance */}
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-4">Overall Model Performance</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Object.entries(performanceMetrics.overall).map(([metric, value]) => (
                  <div key={metric} className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{value}%</div>
                    <div className="text-sm text-gray-400 capitalize">{metric.replace(/([A-Z])/g, ' $1')}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Class-wise Performance */}
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-4">Class-wise Performance Analysis</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left py-2 text-gray-400">Class</th>
                      <th className="text-right py-2 text-gray-400">Precision</th>
                      <th className="text-right py-2 text-gray-400">Recall</th>
                      <th className="text-right py-2 text-gray-400">F1-Score</th>
                      <th className="text-right py-2 text-gray-400">Support</th>
                    </tr>
                  </thead>
                  <tbody>
                    {performanceMetrics.classwise.map((classMetric, index) => (
                      <tr key={index} className="border-b border-gray-700">
                        <td className="py-2 text-white font-medium">{classMetric.class}</td>
                        <td className="text-right py-2 text-gray-300">{classMetric.precision}%</td>
                        <td className="text-right py-2 text-gray-300">{classMetric.recall}%</td>
                        <td className="text-right py-2 text-green-400 font-medium">{classMetric.f1}%</td>
                        <td className="text-right py-2 text-gray-400">{classMetric.support.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Validation Techniques */}
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-4">Validation Techniques</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-blue-400 mb-2">Cross-Validation Results</h4>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex justify-between">
                      <span>Fold 1:</span>
                      <span className="text-green-400">F1: 92.3%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fold 2:</span>
                      <span className="text-green-400">F1: 91.8%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fold 3:</span>
                      <span className="text-green-400">F1: 92.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fold 4:</span>
                      <span className="text-green-400">F1: 91.9%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fold 5:</span>
                      <span className="text-green-400">F1: 92.0%</span>
                    </div>
                    <div className="flex justify-between font-medium border-t border-gray-600 pt-2">
                      <span>Average:</span>
                      <span className="text-blue-400">F1: 92.1%</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-purple-400 mb-2">Temporal Validation</h4>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex justify-between">
                      <span>2020 Data:</span>
                      <span className="text-green-400">F1: 89.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>2021 Data:</span>
                      <span className="text-green-400">F1: 90.1%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>2022 Data:</span>
                      <span className="text-green-400">F1: 88.7%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>2023 Data:</span>
                      <span className="text-green-400">F1: 87.9%</span>
                    </div>
                    <div className="flex justify-between font-medium border-t border-gray-600 pt-2">
                      <span>Temporal Avg:</span>
                      <span className="text-purple-400">F1: 89.0%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Data Augmentation */}
        {activeTab === 'augmentation' && (
          <div className="space-y-6">
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-4">Data Augmentation Techniques</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dataAugmentation.map((technique, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-blue-400">{technique.technique}</h4>
                      <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                        {technique.improvement}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300">{technique.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Class Balancing Strategy */}
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-4">Class Balancing Strategy</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-800 rounded-lg p-3">
                    <h4 className="text-sm font-medium text-orange-400 mb-2">SMOTE Oversampling</h4>
                    <p className="text-xs text-gray-300">Synthetic minority oversampling for fear, greed, and uncertain classes</p>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3">
                    <h4 className="text-sm font-medium text-red-400 mb-2">Focal Loss</h4>
                    <p className="text-xs text-gray-300">Dynamic loss weighting to focus on hard-to-classify examples</p>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3">
                    <h4 className="text-sm font-medium text-green-400 mb-2">Cost-Sensitive Learning</h4>
                    <p className="text-xs text-gray-300">Higher penalty for misclassifying minority classes</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hyperparameter Optimization */}
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-4">Hyperparameter Optimization</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-blue-400 mb-2">Optimal Parameters</h4>
                  <div className="space-y-1 text-sm text-gray-300">
                    <div className="flex justify-between">
                      <span>Learning Rate:</span>
                      <span className="text-white">1e-5</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Batch Size:</span>
                      <span className="text-white">16</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Max Sequence Length:</span>
                      <span className="text-white">512</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dropout Rate:</span>
                      <span className="text-white">0.3</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Weight Decay:</span>
                      <span className="text-white">0.01</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-purple-400 mb-2">Search Strategy</h4>
                  <div className="space-y-1 text-xs text-gray-300">
                    <div>• Bayesian optimization with Gaussian processes</div>
                    <div>• 200 trials with early stopping</div>
                    <div>• Multi-objective optimization (F1 + efficiency)</div>
                    <div>• Cross-validation for robust evaluation</div>
                    <div>• Automated hyperparameter tuning pipeline</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SentimentTraining;