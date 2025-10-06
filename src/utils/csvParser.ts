export interface ParsedCSVData {
  stockData: {
    dates: string[];
    actual: number[];
    lstm: number[];
    randomForest: number[];
    hybrid: number[];
    currentPrice: number;
    change: number;
    changePercent: number;
  };
  sentimentData: {
    positive: number;
    neutral: number;
    negative: number;
    headlines: Array<{
      text: string;
      sentiment: 'positive' | 'neutral' | 'negative';
      score: number;
    }>;
    overallSentiment: 'positive' | 'neutral' | 'negative';
  };
  totalRecords: number;
  dateRange: string;
  symbols: string[];
  columns: string[];
  sampleRows: any[];
}

export const parseCSVData = (csvText: string): ParsedCSVData => {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  
  // Validate required columns
  const requiredColumns = ['Date', 'Open', 'High', 'Low', 'Close', 'Volume'];
  const missingColumns = requiredColumns.filter(col => 
    !headers.some(h => h.toLowerCase().includes(col.toLowerCase()))
  );
  
  if (missingColumns.length > 0) {
    throw new Error(`Missing required columns: ${missingColumns.join(', ')}`);
  }

  // Parse data rows
  const rows = lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim());
    const row: any = {};
    headers.forEach((header, index) => {
      row[header] = values[index];
    });
    return row;
  });

  // Extract dates and prices
  const dates: string[] = [];
  const prices: number[] = [];
  const symbols = new Set<string>();

  rows.forEach(row => {
    const date = new Date(row.Date || row.date);
    if (!isNaN(date.getTime())) {
      dates.push(date.toISOString().split('T')[0]);
      prices.push(parseFloat(row.Close || row.close || '0'));
      
      if (row.Symbol || row.symbol) {
        symbols.add(row.Symbol || row.symbol);
      }
    }
  });

  // Generate mock predictions based on actual prices
  const lstm = prices.map(price => price * (0.98 + Math.random() * 0.04));
  const randomForest = prices.map(price => price * (0.99 + Math.random() * 0.02));
  const hybrid = prices.map(price => price * (0.995 + Math.random() * 0.01));

  const currentPrice = prices[prices.length - 1];
  const previousPrice = prices[prices.length - 2];
  const change = currentPrice - previousPrice;
  const changePercent = (change / previousPrice) * 100;

  // Generate mock sentiment data
  const sentimentData = {
    positive: 0.4 + Math.random() * 0.3,
    neutral: 0.2 + Math.random() * 0.3,
    negative: 0.1 + Math.random() * 0.3,
    headlines: [
      {
        text: "Market shows strong performance amid economic recovery",
        sentiment: 'positive' as const,
        score: 0.85
      },
      {
        text: "Analysts remain cautious about future market trends",
        sentiment: 'neutral' as const,
        score: 0.72
      },
      {
        text: "Volatility concerns affect investor sentiment",
        sentiment: 'negative' as const,
        score: 0.78
      }
    ],
    overallSentiment: 'positive' as const
  };

  // Calculate date range
  const sortedDates = dates.sort();
  const dateRange = `${sortedDates[0]} to ${sortedDates[sortedDates.length - 1]}`;

  return {
    stockData: {
      dates,
      actual: prices,
      lstm,
      randomForest,
      hybrid,
      currentPrice,
      change,
      changePercent
    },
    sentimentData,
    totalRecords: rows.length,
    dateRange,
    symbols: Array.from(symbols),
    columns: headers,
    sampleRows: rows.slice(0, 10)
  };
};