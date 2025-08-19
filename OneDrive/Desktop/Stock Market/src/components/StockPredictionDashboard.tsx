import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { TrendingUp, TrendingDown, Brain, Database, BarChart3, Target, Zap, Activity } from "lucide-react";

// Mock data generators
const generateStockData = (symbol: string) => {
  const basePrice = Math.random() * 500 + 100;
  const data = [];
  let price = basePrice;
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    const change = (Math.random() - 0.5) * 20;
    price = Math.max(price + change, basePrice * 0.5);
    
    data.push({
      date: date.toISOString().split('T')[0],
      actual: Math.round(price * 100) / 100,
      predicted: Math.round((price + (Math.random() - 0.5) * 10) * 100) / 100,
      volume: Math.floor(Math.random() * 1000000) + 500000,
    });
  }
  
  return data;
};

const generatePredictionData = () => {
  const data = [];
  let price = 250;
  
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    
    const change = (Math.random() - 0.4) * 15; // Slight upward bias
    price = Math.max(price + change, 200);
    
    data.push({
      date: date.toISOString().split('T')[0],
      prediction: Math.round(price * 100) / 100,
      confidence: Math.round((Math.random() * 30 + 70) * 100) / 100,
      upperBound: Math.round((price * 1.05) * 100) / 100,
      lowerBound: Math.round((price * 0.95) * 100) / 100,
    });
  }
  
  return data;
};

const modelMetrics = [
  { name: "LSTM Model", accuracy: 84.2, precision: 81.7, recall: 86.3, f1Score: 83.9 },
  { name: "Random Forest", accuracy: 78.9, precision: 76.4, recall: 82.1, f1Score: 79.1 },
  { name: "Hybrid Model", accuracy: 87.6, precision: 85.2, recall: 89.1, f1Score: 87.1 },
];

const techStack = [
  { category: "ML Frameworks", items: ["TensorFlow", "Keras", "Scikit-learn", "PyTorch"] },
  { category: "Data Processing", items: ["Pandas", "NumPy", "Apache Spark", "Dask"] },
  { category: "Database", items: ["PostgreSQL", "Redis", "InfluxDB", "MongoDB"] },
  { category: "APIs", items: ["Alpha Vantage", "Yahoo Finance", "Quandl", "IEX Cloud"] },
];

export default function StockPredictionDashboard() {
  const [selectedStock, setSelectedStock] = useState("AAPL");
  const [stockData, setStockData] = useState(() => generateStockData("AAPL"));
  const [predictionData, setPredictionData] = useState(() => generatePredictionData());

  const handleStockSearch = () => {
    const newStockData = generateStockData(selectedStock);
    const newPredictionData = generatePredictionData();
    setStockData(newStockData);
    setPredictionData(newPredictionData);
  };

  const currentPrice = stockData[stockData.length - 1]?.actual || 0;
  const previousPrice = stockData[stockData.length - 2]?.actual || 0;
  const priceChange = currentPrice - previousPrice;
  const priceChangePercent = ((priceChange / previousPrice) * 100);

  const nextPrediction = predictionData[1];
  const predictedChange = nextPrediction ? nextPrediction.prediction - currentPrice : 0;
  const predictedChangePercent = ((predictedChange / currentPrice) * 100);

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Stock Market Prediction System
            </h1>
            <p className="text-muted-foreground mt-2">
              AI-powered stock forecasting using hybrid ML models
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Input
              placeholder="Enter stock symbol (e.g., AAPL)"
              value={selectedStock}
              onChange={(e) => setSelectedStock(e.target.value.toUpperCase())}
              className="w-48"
            />
            <Button onClick={handleStockSearch} className="bg-gradient-primary">
              <Target className="w-4 h-4 mr-2" />
              Predict
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Current Price</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${currentPrice}</div>
              <div className={`flex items-center text-sm ${priceChange >= 0 ? 'text-gain' : 'text-loss'}`}>
                {priceChange >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)} ({priceChangePercent.toFixed(1)}%)
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Tomorrow's Prediction</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${nextPrediction?.prediction.toFixed(2)}</div>
              <div className={`flex items-center text-sm ${predictedChange >= 0 ? 'text-gain' : 'text-loss'}`}>
                {predictedChange >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                {predictedChange >= 0 ? '+' : ''}{predictedChange.toFixed(2)} ({predictedChangePercent.toFixed(1)}%)
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Model Confidence</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{nextPrediction?.confidence.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">
                <Badge variant="secondary" className="bg-primary/20 text-primary">High Accuracy</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Model Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gold">Hybrid</div>
              <div className="text-sm text-muted-foreground flex items-center">
                <Brain className="w-4 h-4 mr-1" />
                LSTM + Random Forest
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard */}
        <Tabs defaultValue="predictions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-muted">
            <TabsTrigger value="predictions" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Predictions
            </TabsTrigger>
            <TabsTrigger value="methodology" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Methodology
            </TabsTrigger>
            <TabsTrigger value="performance" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Performance
            </TabsTrigger>
            <TabsTrigger value="technology" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Technology
            </TabsTrigger>
          </TabsList>

          <TabsContent value="predictions" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-primary" />
                    Historical vs Predicted
                  </CardTitle>
                  <CardDescription>Past 30 days comparison</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={stockData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--popover))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }} 
                      />
                      <Legend />
                      <Line type="monotone" dataKey="actual" stroke="hsl(var(--primary))" strokeWidth={2} />
                      <Line type="monotone" dataKey="predicted" stroke="hsl(var(--gold))" strokeWidth={2} strokeDasharray="5 5" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-gain" />
                    7-Day Forecast
                  </CardTitle>
                  <CardDescription>Confidence intervals included</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={predictionData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--popover))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }} 
                      />
                      <Area type="monotone" dataKey="upperBound" stackId="1" stroke="hsl(var(--primary))" fill="hsl(var(--primary) / 0.1)" />
                      <Area type="monotone" dataKey="lowerBound" stackId="1" stroke="hsl(var(--primary))" fill="hsl(var(--primary) / 0.1)" />
                      <Line type="monotone" dataKey="prediction" stroke="hsl(var(--primary))" strokeWidth={3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="methodology" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gradient-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Database className="w-5 h-5 mr-2 text-primary" />
                    Data Preprocessing Pipeline
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center p-3 rounded-lg bg-muted">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm mr-3">1</div>
                      <div>
                        <div className="font-medium">Data Collection</div>
                        <div className="text-sm text-muted-foreground">Historical prices, volume, market indicators</div>
                      </div>
                    </div>
                    <div className="flex items-center p-3 rounded-lg bg-muted">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm mr-3">2</div>
                      <div>
                        <div className="font-medium">Feature Engineering</div>
                        <div className="text-sm text-muted-foreground">Technical indicators, moving averages</div>
                      </div>
                    </div>
                    <div className="flex items-center p-3 rounded-lg bg-muted">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm mr-3">3</div>
                      <div>
                        <div className="font-medium">Normalization</div>
                        <div className="text-sm text-muted-foreground">Min-max scaling, outlier removal</div>
                      </div>
                    </div>
                    <div className="flex items-center p-3 rounded-lg bg-muted">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm mr-3">4</div>
                      <div>
                        <div className="font-medium">Sequence Creation</div>
                        <div className="text-sm text-muted-foreground">Time series windows for LSTM</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="w-5 h-5 mr-2 text-gold" />
                    Hybrid Model Architecture
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
                      <div className="font-medium text-primary">LSTM Network</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Captures temporal dependencies and long-term patterns
                      </div>
                      <div className="flex space-x-2 mt-2">
                        <Badge variant="outline" className="text-xs">3 Layers</Badge>
                        <Badge variant="outline" className="text-xs">128 Units</Badge>
                        <Badge variant="outline" className="text-xs">Dropout 0.2</Badge>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg border border-gain/20 bg-gain/5">
                      <div className="font-medium text-gain">Random Forest</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Handles non-linear relationships and feature importance
                      </div>
                      <div className="flex space-x-2 mt-2">
                        <Badge variant="outline" className="text-xs">100 Trees</Badge>
                        <Badge variant="outline" className="text-xs">Max Depth 10</Badge>
                        <Badge variant="outline" className="text-xs">Min Samples 5</Badge>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg border border-gold/20 bg-gold/5">
                      <div className="font-medium text-gold">Ensemble Method</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Weighted combination with confidence scoring
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-primary" />
                  Model Performance Metrics
                </CardTitle>
                <CardDescription>Comparison across different algorithms</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={modelMetrics}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--popover))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Legend />
                    <Bar dataKey="accuracy" fill="hsl(var(--primary))" />
                    <Bar dataKey="precision" fill="hsl(var(--gain))" />
                    <Bar dataKey="recall" fill="hsl(var(--gold))" />
                    <Bar dataKey="f1Score" fill="hsl(var(--warning))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="technology" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {techStack.map((stack, index) => (
                <Card key={index} className="bg-gradient-card border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Zap className="w-5 h-5 mr-2 text-primary" />
                      {stack.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      {stack.items.map((item, itemIndex) => (
                        <Badge key={itemIndex} variant="secondary" className="justify-center">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}