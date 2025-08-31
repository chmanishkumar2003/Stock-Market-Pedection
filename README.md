📈 Stock Market Prediction using Machine Learning
📌 Overview

This project predicts stock market trends using a hybrid machine learning approach that combines LSTM (Long Short-Term Memory) and Random Forest algorithms. The system analyzes historical stock data, extracts meaningful features, and provides future stock price predictions with visualization support.

🚀 Features

✅ Fetches stock data using yfinance

✅ Preprocesses and cleans data (handles missing values, normalization, feature engineering)

✅ Implements LSTM model for time-series forecasting

✅ Implements Random Forest model for feature-based prediction

✅ Combines results into a hybrid model for better accuracy

✅ Visualizes real vs predicted stock prices

✅ Stores stock data into SQL database for future use

🛠️ Tech Stack

Programming Language: Python

Libraries:

Data Handling → pandas, numpy

Visualization → matplotlib, seaborn

Machine Learning → scikit-learn, tensorflow, keras

Stock Data → yfinance

Database: SQL
Installation

Clone this repository:

git clone https://github.com/yourusername/stock-market-prediction.git
cd stock-market-prediction


Create and activate a virtual environment (optional but recommended):

python -m venv venv
source venv/bin/activate   # On Mac/Linux
venv\Scripts\activate      # On Windows


Install dependencies:

pip install -r requirements.txt

▶️ Usage
1. Fetch Stock Data
import yfinance as yf
df = yf.download("AAPL", start="2015-01-01", end="2023-12-31")

2. Train Models
python src/lstm_model.py
python src/random_forest.py

3. Hybrid Prediction
python src/hybrid_model.py

4. Visualization Example
plt.plot(real_prices, label="Real Price")
plt.plot(predicted_prices, label="Predicted Price")
plt.legend()
plt.show()

📊 Results

LSTM captured time-series patterns

Random Forest captured feature-based indicators

Hybrid model improved accuracy by 10–15% compared to individual models

👥 Team & Role

Team Size: 2

My Role: Data preprocessing, ML model development (LSTM & RF), hybrid integration, visualization

🚧 Challenges

Handling missing stock data

Avoiding overfitting in LSTM

Aligning predictions from two models

✅ Outcome

Successfully built a working stock prediction system

Learned DSA applications, ML techniques, and data engineering

Gained hands-on experience with time-series forecasting
