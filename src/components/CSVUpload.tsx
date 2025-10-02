import React, { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, X, Download } from 'lucide-react';
import { parseCSVData } from '../utils/csvParser';
import BgImage from "./upload_logo.jpeg"; 


interface CSVUploadProps {
  onDataUpload: (data: any) => void;
}

const CSVUpload: React.FC<CSVUploadProps> = ({ onDataUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [previewData, setPreviewData] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file: File) => {
    if (!file.name.toLowerCase().endsWith('.csv')) {
      setUploadStatus('error');
      setErrorMessage('Please upload a CSV file');
      return;
    }

    setUploadedFile(file);
    setUploadStatus('processing');
    setErrorMessage('');

    try {
      const text = await file.text();
      const parsedData = parseCSVData(text);
      setPreviewData(parsedData);
      setUploadStatus('success');
    } catch (error) {
      setUploadStatus('error');
      setErrorMessage('Error parsing CSV file. Please check the format.');
    }
  };

  const processData = () => {
    if (previewData) {
      onDataUpload(previewData);
      setUploadStatus('idle');
      setUploadedFile(null);
      setPreviewData(null);
    }
  };

  const clearFile = () => {
    setUploadedFile(null);
    setUploadStatus('idle');
    setPreviewData(null);
    setErrorMessage('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const downloadSample = () => {
    const sampleData = `Date,Open,High,Low,Close,Volume,Symbol
2024-01-01,150.00,155.00,149.00,154.50,1000000,AAPL
2024-01-02,154.50,158.00,153.00,157.25,1200000,AAPL
2024-01-03,157.25,160.00,156.00,159.80,1100000,AAPL`;
    
    const blob = new Blob([sampleData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample_stock_data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 relative overflow-hidden">
        {/* Background Image for CSV Upload */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5"
          style={{
        backgroundImage: `url(${BgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "95vh",
        width: "95%",
      }}
         
        ></div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white relative z-10">CSV Data Upload</h2>
          <button
            onClick={downloadSample}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors relative z-10"
          >
            <Download className="h-4 w-4" />
            <span>Download Sample</span>
          </button>
        </div>

        {/* Upload Area */}
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? 'border-blue-500 bg-blue-500/10'
              : uploadStatus === 'error'
              ? 'border-red-500 bg-red-500/10'
              : 'border-gray-600 hover:border-gray-500'
          } z-10`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />

          {uploadStatus === 'processing' ? (
            <div className="space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto"></div>
              <p className="text-gray-300">Processing CSV file...</p>
            </div>
          ) : uploadStatus === 'success' ? (
            <div className="space-y-4">
              <CheckCircle className="h-12 w-12 text-green-400 mx-auto" />
              <div>
                <p className="text-green-400 font-medium">File uploaded successfully!</p>
                <p className="text-gray-400 text-sm mt-1">{uploadedFile?.name}</p>
              </div>
            </div>
          ) : uploadStatus === 'error' ? (
            <div className="space-y-4">
              <AlertCircle className="h-12 w-12 text-red-400 mx-auto" />
              <div>
                <p className="text-red-400 font-medium">Upload failed</p>
                <p className="text-gray-400 text-sm mt-1">{errorMessage}</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="h-12 w-12 text-gray-400 mx-auto" />
              <div>
                <p className="text-white font-medium">Drop your CSV file here</p>
                <p className="text-gray-400 text-sm mt-1">or click to browse</p>
              </div>
            </div>
          )}
        </div>

        {/* File Requirements */}
        <div className="mt-6 p-4 bg-gray-700 rounded-lg">
          <h3 className="text-white font-medium mb-2">CSV Format Requirements</h3>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>• Required columns: Date, Open, High, Low, Close, Volume</li>
            <li>• Optional columns: Symbol, Adj Close</li>
            <li>• Date format: YYYY-MM-DD</li>
            <li>• Numeric values for price and volume data</li>
            <li>• Maximum file size: 10MB</li>
          </ul>
        </div>
      </div>

      {/* Data Preview */}
      {previewData && (
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Data Preview</h3>
            <div className="flex space-x-2">
              <button
                onClick={processData}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                Use This Data
              </button>
              <button
                onClick={clearFile}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-gray-700 p-3 rounded-lg">
              <div className="text-sm text-gray-400">Total Records</div>
              <div className="text-xl font-bold text-white">{previewData.totalRecords}</div>
            </div>
            <div className="bg-gray-700 p-3 rounded-lg">
              <div className="text-sm text-gray-400">Date Range</div>
              <div className="text-sm font-medium text-white">{previewData.dateRange}</div>
            </div>
            <div className="bg-gray-700 p-3 rounded-lg">
              <div className="text-sm text-gray-400">Symbols</div>
              <div className="text-xl font-bold text-white">{previewData.symbols?.length || 1}</div>
            </div>
            <div className="bg-gray-700 p-3 rounded-lg">
              <div className="text-sm text-gray-400">Columns</div>
              <div className="text-xl font-bold text-white">{previewData.columns?.length}</div>
            </div>
          </div>

          {/* Sample Data Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-600">
                  {previewData.columns?.map((col: string, index: number) => (
                    <th key={index} className="text-left py-2 px-3 text-gray-400 font-medium">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {previewData.sampleRows?.slice(0, 5).map((row: any, index: number) => (
                  <tr key={index} className="border-b border-gray-700">
                    {previewData.columns?.map((col: string, colIndex: number) => (
                      <td key={colIndex} className="py-2 px-3 text-gray-300">
                        {row[col]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CSVUpload;
