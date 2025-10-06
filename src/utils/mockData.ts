export const generateMockData = (symbol: string) => {
  // Generate mock stock data
  const dates = [];
  const actual = [];
  const lstm = [];
  const randomForest = [];
  const hybrid = [];
  
  const basePrice = getBasePrice(symbol);
  let currentPrice = basePrice;
  
  // Generate 30 days of data
  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    dates.push(date.toISOString().split('T')[0]);
    
    // Simulate price movements
    const volatility = 0.02;
    const trend = Math.sin(i * 0.1) * 0.005;
    const randomChange = (Math.random() - 0.5) * volatility;
    
    currentPrice *= (1 + trend + randomChange);
    actual.push(currentPrice);
    
    // LSTM predictions (slightly off from actual)
    const lstmNoise = (Math.random() - 0.5) * 0.03;
    lstm.push(currentPrice * (1 + lstmNoise));
    
    // Random Forest predictions (different pattern)
    const rfNoise = (Math.random() - 0.5) * 0.025;
    randomForest.push(currentPrice * (1 + rfNoise));
    
    // Hybrid predictions (closer to actual)
    const hybridNoise = (Math.random() - 0.5) * 0.015;
    hybrid.push(currentPrice * (1 + hybridNoise));
  }
  
  const lastActual = actual[actual.length - 1];
  const previousPrice = actual[actual.length - 2];
  const change = lastActual - previousPrice;
  const changePercent = (change / previousPrice) * 100;

  // Generate sentiment data
  const sentimentData = generateSentimentData(symbol);

  return {
    stockData: {
      dates,
      actual,
      lstm,
      randomForest,
      hybrid,
      currentPrice: lastActual,
      change,
      changePercent
    },
    sentimentData
  };
};

const getBasePrice = (symbol: string) => {
  const prices: Record<string, number> = {
    'AAPL': 175,
    'NVDA': 450,
    'TSLA': 200,
    'AMZN': 140,
    'GOOGL': 125,
    'MSFT': 350
  };
  return prices[symbol] || 100;
};

const generateSentimentData = (symbol: string) => {
  const headlines = [
    {
      text: `${symbol} reports strong quarterly earnings, beating analyst expectations`,
      sentiment: 'positive' as const,
      score: 0.87,
      confidence: 0.92,
      emotions: {
        joy: 0.8,
        fear: 0.1,
        anger: 0.05,
        surprise: 0.7,
        sadness: 0.02,
        trust: 0.85
      }
    },
    {
      text: `Market volatility affects ${symbol} stock performance amid economic uncertainty`,
      sentiment: 'uncertain' as const,
      score: 0.72,
      confidence: 0.78,
      emotions: {
        joy: 0.2,
        fear: 0.6,
        anger: 0.3,
        surprise: 0.4,
        sadness: 0.3,
        trust: 0.4
      }
    },
    {
      text: `Analysts upgrade ${symbol} price target following recent product launch`,
      sentiment: 'bullish' as const,
      score: 0.92,
      confidence: 0.95,
      emotions: {
        joy: 0.9,
        fear: 0.05,
        anger: 0.02,
        surprise: 0.6,
        sadness: 0.01,
        trust: 0.88
      }
    },
    {
      text: `${symbol} faces regulatory challenges in international markets`,
      sentiment: 'bearish' as const,
      score: 0.78,
      confidence: 0.84,
      emotions: {
        joy: 0.1,
        fear: 0.7,
        anger: 0.5,
        surprise: 0.3,
        sadness: 0.4,
        trust: 0.2
      }
    },
    {
      text: `Institutional investors increase ${symbol} holdings in latest filing`,
      sentiment: 'greed' as const,
      score: 0.85,
      confidence: 0.89,
      emotions: {
        joy: 0.7,
        fear: 0.2,
        anger: 0.1,
        surprise: 0.5,
        sadness: 0.05,
        trust: 0.8
      }
    },
    {
      text: `${symbol} stock plummets as investors panic over earnings miss`,
      sentiment: 'fear' as const,
      score: 0.91,
      confidence: 0.94,
      emotions: {
        joy: 0.05,
        fear: 0.95,
        anger: 0.6,
        surprise: 0.8,
        sadness: 0.7,
        trust: 0.1
      }
    }
  ];

  // Calculate sentiment distribution
  const posCount = headlines.filter(h => h.sentiment === 'positive').length;
  const negCount = headlines.filter(h => h.sentiment === 'negative').length;
  const neuCount = headlines.filter(h => h.sentiment === 'neutral').length;
  const bullishCount = headlines.filter(h => h.sentiment === 'bullish').length;
  const bearishCount = headlines.filter(h => h.sentiment === 'bearish').length;
  const uncertainCount = headlines.filter(h => h.sentiment === 'uncertain').length;
  const fearCount = headlines.filter(h => h.sentiment === 'fear').length;
  const greedCount = headlines.filter(h => h.sentiment === 'greed').length;
  const total = headlines.length;

  const positive = posCount / total;
  const negative = negCount / total;
  const neutral = neuCount / total;
  const bullish = bullishCount / total;
  const bearish = bearishCount / total;
  const uncertain = uncertainCount / total;
  const fear = fearCount / total;
  const greed = greedCount / total;

  // Determine overall sentiment based on highest category
  const sentimentScores = { positive, negative, neutral, bullish, bearish, uncertain, fear, greed };
  const overallSentiment = Object.keys(sentimentScores).reduce((a, b) => 
    sentimentScores[a as keyof typeof sentimentScores] > sentimentScores[b as keyof typeof sentimentScores] ? a : b
  ) as 'positive' | 'negative' | 'neutral' | 'bullish' | 'bearish' | 'uncertain';

  return {
    positive,
    negative,
    neutral,
    bullish,
    bearish,
    uncertain,
    fear,
    greed,
    headlines,
    overallSentiment,
    modelMetrics: {
      accuracy: 0.942,
      precision: 0.924,
      recall: 0.918,
      f1Score: 0.921,
      confusionMatrix: [
        [45, 2, 1, 0, 1, 1, 0, 0], // Positive
        [1, 42, 2, 1, 2, 1, 1, 0], // Negative
        [2, 1, 38, 3, 2, 3, 1, 0], // Neutral
        [0, 1, 2, 41, 3, 2, 1, 0], // Bullish
        [1, 3, 1, 2, 39, 2, 2, 0], // Bearish
        [1, 2, 4, 2, 1, 35, 3, 2], // Uncertain
        [0, 2, 1, 0, 2, 3, 37, 5], // Fear
        [0, 0, 1, 1, 1, 2, 4, 41]  // Greed
      ]
    }
  };
};