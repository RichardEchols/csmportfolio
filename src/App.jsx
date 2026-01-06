import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar, Legend } from 'recharts';

// ============ SAMPLE DATA ============
const cloudSpendData = [
  { date: '2024-01', costCenter: 'Engineering', application: 'Data Lake', status: 'Active', spend: 45000, budget: 42000 },
  { date: '2024-01', costCenter: 'Engineering', application: 'CI/CD Pipeline', status: 'Active', spend: 28000, budget: 30000 },
  { date: '2024-01', costCenter: 'Engineering', application: 'Dev Environments', status: 'Idle', spend: 18500, budget: 15000 },
  { date: '2024-01', costCenter: 'Engineering', application: 'Legacy API', status: 'Orphaned', spend: 12000, budget: 0 },
  { date: '2024-01', costCenter: 'Marketing', application: 'CRM', status: 'Active', spend: 32000, budget: 30000 },
  { date: '2024-01', costCenter: 'Marketing', application: 'Analytics Platform', status: 'Active', spend: 15000, budget: 16000 },
  { date: '2024-01', costCenter: 'Marketing', application: 'Old Campaign Tool', status: 'Orphaned', spend: 8500, budget: 0 },
  { date: '2024-01', costCenter: 'Finance', application: 'ERP System', status: 'Active', spend: 52000, budget: 50000 },
  { date: '2024-01', costCenter: 'Finance', application: 'Reporting DB', status: 'Active', spend: 18000, budget: 20000 },
  { date: '2024-01', costCenter: 'Finance', application: 'Test Environment', status: 'Idle', spend: 6500, budget: 5000 },
  { date: '2024-01', costCenter: 'HR', application: 'HRIS', status: 'Active', spend: 22000, budget: 22000 },
  { date: '2024-01', costCenter: 'HR', application: 'Old Payroll System', status: 'Orphaned', spend: 9800, budget: 0 },
  { date: '2024-02', costCenter: 'Engineering', application: 'Data Lake', status: 'Active', spend: 47000, budget: 42000 },
  { date: '2024-02', costCenter: 'Engineering', application: 'CI/CD Pipeline', status: 'Active', spend: 29500, budget: 30000 },
  { date: '2024-02', costCenter: 'Engineering', application: 'Dev Environments', status: 'Idle', spend: 19200, budget: 15000 },
  { date: '2024-02', costCenter: 'Engineering', application: 'Legacy API', status: 'Orphaned', spend: 12000, budget: 0 },
  { date: '2024-02', costCenter: 'Marketing', application: 'CRM', status: 'Active', spend: 33500, budget: 30000 },
  { date: '2024-02', costCenter: 'Marketing', application: 'Analytics Platform', status: 'Active', spend: 15800, budget: 16000 },
  { date: '2024-02', costCenter: 'Marketing', application: 'Old Campaign Tool', status: 'Orphaned', spend: 8500, budget: 0 },
  { date: '2024-02', costCenter: 'Finance', application: 'ERP System', status: 'Active', spend: 54000, budget: 50000 },
  { date: '2024-02', costCenter: 'Finance', application: 'Reporting DB', status: 'Active', spend: 19000, budget: 20000 },
  { date: '2024-02', costCenter: 'Finance', application: 'Test Environment', status: 'Idle', spend: 7200, budget: 5000 },
  { date: '2024-02', costCenter: 'HR', application: 'HRIS', status: 'Active', spend: 22500, budget: 22000 },
  { date: '2024-02', costCenter: 'HR', application: 'Old Payroll System', status: 'Orphaned', spend: 9800, budget: 0 },
  { date: '2024-03', costCenter: 'Engineering', application: 'Data Lake', status: 'Active', spend: 48500, budget: 42000 },
  { date: '2024-03', costCenter: 'Engineering', application: 'CI/CD Pipeline', status: 'Active', spend: 31000, budget: 30000 },
  { date: '2024-03', costCenter: 'Engineering', application: 'Dev Environments', status: 'Idle', spend: 20100, budget: 15000 },
  { date: '2024-03', costCenter: 'Engineering', application: 'Legacy API', status: 'Orphaned', spend: 12000, budget: 0 },
  { date: '2024-03', costCenter: 'Marketing', application: 'CRM', status: 'Active', spend: 35000, budget: 30000 },
  { date: '2024-03', costCenter: 'Marketing', application: 'Analytics Platform', status: 'Active', spend: 16500, budget: 16000 },
  { date: '2024-03', costCenter: 'Marketing', application: 'Old Campaign Tool', status: 'Orphaned', spend: 8500, budget: 0 },
  { date: '2024-03', costCenter: 'Finance', application: 'ERP System', status: 'Active', spend: 56000, budget: 50000 },
  { date: '2024-03', costCenter: 'Finance', application: 'Reporting DB', status: 'Active', spend: 19500, budget: 20000 },
  { date: '2024-03', costCenter: 'Finance', application: 'Test Environment', status: 'Idle', spend: 7800, budget: 5000 },
  { date: '2024-03', costCenter: 'HR', application: 'HRIS', status: 'Active', spend: 23000, budget: 22000 },
  { date: '2024-03', costCenter: 'HR', application: 'Old Payroll System', status: 'Orphaned', spend: 9800, budget: 0 },
];

const forecastData = [
  { month: 'Jan', actual: 328420, legacy: 310000, ai: 325000 },
  { month: 'Feb', actual: 371800, legacy: 320000, ai: 368500 },
  { month: 'Mar', actual: 428180, legacy: 335000, ai: 422000 },
  { month: 'Apr', actual: 445200, legacy: 350000, ai: 448800 },
  { month: 'May', actual: 462300, legacy: 365000, ai: 458900 },
  { month: 'Jun', actual: 489100, legacy: 380000, ai: 492500 },
  { month: 'Jul', actual: 512800, legacy: 395000, ai: 508200 },
  { month: 'Aug', actual: 528400, legacy: 410000, ai: 531000 },
  { month: 'Sep', actual: 551200, legacy: 425000, ai: 548500 },
  { month: 'Oct', actual: 578900, legacy: 440000, ai: 582100 },
  { month: 'Nov', actual: 602400, legacy: 455000, ai: 598700 },
];

// ============ HELPERS ============
const formatCurrency = (value) => {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
  return `$${value.toFixed(0)}`;
};

const formatPercent = (value) => {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${(value * 100).toFixed(1)}%`;
};

// ============ LANDING PAGE ============
const LandingPage = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Richard Echols</h1>
          <p className="text-xl text-slate-400 mb-2">Customer Success Manager — SaaS (Analytics & FinOps)</p>
          <p className="text-slate-500">IBM | TBM/FinOps | AI-Assisted Analytics</p>
        </div>

        {/* Contact Links */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          <a href="https://www.linkedin.com/in/richard-echols/" target="_blank" rel="noopener noreferrer" 
             className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            LinkedIn
          </a>
          <a href="mailto:Richardechols92@gmail.com" 
             className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
            📧 Email
          </a>
          <a href="https://github.com/RichardEchols" target="_blank" rel="noopener noreferrer"
             className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
            💻 GitHub
          </a>
        </div>

        {/* About Section */}
        <div className="bg-slate-800 rounded-2xl p-6 mb-12">
          <h2 className="text-xl font-semibold mb-4">About This Portfolio</h2>
          <p className="text-slate-300 leading-relaxed">
            This interactive dashboard demonstrates my ability to transform chaotic IT finance data into 
            actionable insights for enterprise clients. Built using AI-assisted development, it showcases 
            the exact workflows I use in Quarterly Business Reviews: <strong>showback reporting</strong>, 
            <strong> FinOps optimization</strong>, and <strong>AI-assisted forecasting</strong>.
          </p>
        </div>

        {/* Dashboard Cards */}
        <h2 className="text-2xl font-bold mb-6 text-center">Portfolio Projects</h2>
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Value Realization Dashboard */}
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-blue-500 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Value Realization Dashboard</h3>
            </div>
            <p className="text-slate-400 mb-4">
              Identify cloud waste, track budget variance, and drive accountability with interactive 
              cross-filtering. Features Executive KPIs, Waste Finder, and Accountability Matrix.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300">FinOps</span>
              <span className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300">Cost Optimization</span>
              <span className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300">Showback</span>
            </div>
            <button 
              onClick={() => onNavigate('value')}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
            >
              View Dashboard →
            </button>
          </div>

          {/* QBR Forecast Dashboard */}
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-emerald-500 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-emerald-500/20 rounded-lg">
                <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">AI Forecast Dashboard</h3>
            </div>
            <p className="text-slate-400 mb-4">
              Compare AI-assisted forecasting vs. legacy Excel methods. Demonstrates predictive analytics 
              value with 98% accuracy vs. 68% traditional approach.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300">AI/ML</span>
              <span className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300">Forecasting</span>
              <span className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300">QBR</span>
            </div>
            <button 
              onClick={() => onNavigate('forecast')}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 rounded-lg font-medium transition-colors"
            >
              View Dashboard →
            </button>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-12 bg-slate-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Core Competencies</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              'TBM/ITFM & FinOps',
              'ApptioOne/TBM Studio',
              'Cloudability',
              'Power BI (DAX)',
              'SQL & Azure',
              'AI Forecasting',
              'QBR/EBR Delivery',
              'Value Realization'
            ].map((skill, idx) => (
              <div key={idx} className="px-3 py-2 bg-slate-700 rounded-lg text-sm text-center text-slate-300">
                {skill}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-slate-500 text-sm">
          Built with React + AI Assistance • © 2025 Richard Echols
        </div>
      </div>
    </div>
  );
};

// ============ VALUE REALIZATION DASHBOARD ============
const ValueDashboard = ({ onBack }) => {
  const [selectedWasteType, setSelectedWasteType] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState('all');

  const months = ['2024-01', '2024-02', '2024-03'];
  const filteredData = selectedMonth === 'all' 
    ? cloudSpendData 
    : cloudSpendData.filter(d => d.date === selectedMonth);

  const totalSpend = filteredData.reduce((sum, d) => sum + d.spend, 0);
  const totalBudget = filteredData.reduce((sum, d) => sum + d.budget, 0);
  const variancePercent = totalBudget > 0 ? (totalSpend - totalBudget) / totalBudget : 0;
  
  const wasteData = filteredData.filter(d => d.status === 'Idle' || d.status === 'Orphaned');
  const totalWaste = wasteData.reduce((sum, d) => sum + d.spend, 0);
  
  const idleTotal = filteredData.filter(d => d.status === 'Idle').reduce((sum, d) => sum + d.spend, 0);
  const orphanedTotal = filteredData.filter(d => d.status === 'Orphaned').reduce((sum, d) => sum + d.spend, 0);
  
  const wasteByStatus = [
    { name: 'Idle', value: idleTotal, color: '#F59E0B' },
    { name: 'Orphaned', value: orphanedTotal, color: '#EF4444' },
  ];

  const trendData = months.map(month => {
    const monthData = cloudSpendData.filter(d => d.date === month);
    const spend = monthData.reduce((s, d) => s + d.spend, 0);
    const budget = monthData.reduce((s, d) => s + d.budget, 0);
    return {
      month: month.replace('2024-', ''),
      variance: budget > 0 ? ((spend - budget) / budget) * 100 : 0,
    };
  });

  const getAccountabilityData = () => {
    const dataToUse = selectedWasteType 
      ? filteredData.filter(d => d.status === selectedWasteType)
      : filteredData;
    
    const grouped = {};
    dataToUse.forEach(d => {
      const key = `${d.costCenter}|${d.application}`;
      if (!grouped[key]) {
        grouped[key] = { costCenter: d.costCenter, application: d.application, spend: 0, waste: 0 };
      }
      grouped[key].spend += d.spend;
      if (d.status === 'Idle' || d.status === 'Orphaned') {
        grouped[key].waste += d.spend;
      }
    });
    
    return Object.values(grouped)
      .filter(d => selectedWasteType ? d.waste > 0 : true)
      .sort((a, b) => b.waste - a.waste);
  };

  const accountabilityData = getAccountabilityData();

  const handleDonutClick = (data) => {
    setSelectedWasteType(selectedWasteType === data.name ? null : data.name);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <button onClick={onBack} className="text-slate-400 hover:text-white mb-2 flex items-center gap-1">
              ← Back to Portfolio
            </button>
            <h1 className="text-2xl md:text-3xl font-bold">Value Realization Dashboard</h1>
            <p className="text-slate-400">Cloud Spend Analysis & Waste Identification</p>
          </div>
        </div>

        {/* Month Filter */}
        <div className="flex gap-2 mb-6 flex-wrap">
          <button onClick={() => setSelectedMonth('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedMonth === 'all' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>
            All Q1
          </button>
          {months.map(m => (
            <button key={m} onClick={() => setSelectedMonth(m)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedMonth === m ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>
              {m.replace('2024-', 'Month ')}
            </button>
          ))}
        </div>

        {/* Row 1: KPIs */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className={`p-6 rounded-xl border-l-4 ${variancePercent >= 0 ? 'bg-red-500/10 border-l-red-500' : 'bg-emerald-500/10 border-l-emerald-500'}`}>
            <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">% Variance to Budget</p>
            <p className={`text-4xl font-bold ${variancePercent >= 0 ? 'text-red-400' : 'text-emerald-400'}`}>
              {formatPercent(variancePercent)}
            </p>
            <p className="text-sm text-slate-400 mt-2">{variancePercent >= 0 ? '⚠️ Over Budget' : '✓ Under Budget'}</p>
            <div className="mt-4 pt-4 border-t border-slate-700 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-500">Total Spend</p>
                <p className="text-white font-semibold">{formatCurrency(totalSpend)}</p>
              </div>
              <div>
                <p className="text-slate-500">Total Budget</p>
                <p className="text-white font-semibold">{formatCurrency(totalBudget)}</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-4 md:col-span-2">
            <h3 className="text-sm font-semibold text-white mb-3">Monthly Variance Trend</h3>
            <ResponsiveContainer width="100%" height={140}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" tick={{ fontSize: 12 }} />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} tickFormatter={(v) => `${v}%`} />
                <Tooltip formatter={(v) => [`${v.toFixed(1)}%`, 'Variance']} contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="variance" stroke="#EF4444" strokeWidth={2} dot={{ fill: '#EF4444', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Row 2: Waste */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-amber-500/10 border-l-4 border-l-amber-500 p-6 rounded-xl">
            <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Total Waste Identified</p>
            <p className="text-4xl font-bold text-amber-400">{formatCurrency(totalWaste)}</p>
            <p className="text-sm text-slate-400 mt-2">{((totalWaste / totalSpend) * 100).toFixed(1)}% of total spend</p>
            <div className="mt-4 pt-4 border-t border-slate-700 text-sm">
              <p className="text-slate-500">Annualized Waste</p>
              <p className="text-amber-400 font-semibold">{formatCurrency(totalWaste * 4)}</p>
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-4 md:col-span-2">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-semibold text-white">Waste Finder by Status</h3>
              {selectedWasteType && (
                <button onClick={() => setSelectedWasteType(null)} className="text-xs text-blue-400 hover:text-blue-300">
                  Clear filter
                </button>
              )}
            </div>
            <p className="text-xs text-slate-500 mb-3">Click a segment to filter the table below</p>
            <div className="flex items-center">
              <ResponsiveContainer width="60%" height={180}>
                <PieChart>
                  <Pie data={wasteByStatus} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value"
                    onClick={(_, index) => handleDonutClick(wasteByStatus[index])} style={{ cursor: 'pointer' }}>
                    {wasteByStatus.map((entry, index) => (
                      <Cell key={index} fill={entry.color}
                        opacity={selectedWasteType && selectedWasteType !== entry.name ? 0.3 : 1}
                        stroke={selectedWasteType === entry.name ? '#fff' : 'none'} strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => formatCurrency(v)} contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-3">
                {wasteByStatus.map((item, idx) => (
                  <div key={idx} onClick={() => handleDonutClick(item)}
                    className={`flex items-center gap-2 cursor-pointer p-2 rounded-lg transition-colors ${selectedWasteType === item.name ? 'bg-slate-700' : 'hover:bg-slate-700/50'}`}>
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <div>
                      <p className="text-sm text-white">{item.name}</p>
                      <p className="text-xs text-slate-400">{formatCurrency(item.value)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Accountability Matrix */}
        <div className="bg-slate-800 rounded-xl p-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-semibold text-white">Accountability Matrix</h3>
              <p className="text-xs text-slate-500">
                {selectedWasteType ? `Filtered to: ${selectedWasteType} resources` : 'Showing all resources'}
              </p>
            </div>
            {selectedWasteType && (
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${selectedWasteType === 'Idle' ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400'}`}>
                {selectedWasteType} Filter Active
              </span>
            )}
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-400 border-b border-slate-700">
                  <th className="text-left py-3 px-4 font-medium">Cost Center</th>
                  <th className="text-left py-3 px-4 font-medium">Application</th>
                  <th className="text-right py-3 px-4 font-medium">Total Spend</th>
                  <th className="text-right py-3 px-4 font-medium">Total Waste</th>
                  <th className="text-right py-3 px-4 font-medium">Waste %</th>
                </tr>
              </thead>
              <tbody>
                {accountabilityData.map((row, idx) => {
                  const wastePercent = row.spend > 0 ? (row.waste / row.spend) * 100 : 0;
                  return (
                    <tr key={idx} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                      <td className="py-3 px-4 text-white font-medium">{row.costCenter}</td>
                      <td className="py-3 px-4 text-slate-300">{row.application}</td>
                      <td className="py-3 px-4 text-right text-white">{formatCurrency(row.spend)}</td>
                      <td className="py-3 px-4 text-right">
                        <span className={row.waste > 0 ? 'text-red-400 font-medium' : 'text-slate-500'}>
                          {row.waste > 0 ? formatCurrency(row.waste) : '-'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        {row.waste > 0 ? (
                          <span className={`px-2 py-1 rounded text-xs font-medium ${wastePercent > 50 ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'}`}>
                            {wastePercent.toFixed(0)}%
                          </span>
                        ) : <span className="text-slate-500">-</span>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
          <h4 className="text-blue-400 font-semibold mb-1">💡 Key Insight</h4>
          <p className="text-slate-300 text-sm">
            Engineering owns <span className="text-white font-semibold">
              {formatCurrency(filteredData.filter(d => d.costCenter === 'Engineering' && (d.status === 'Idle' || d.status === 'Orphaned')).reduce((s, d) => s + d.spend, 0))}
            </span> of total waste — recommend immediate review of Legacy API and Dev Environments.
          </p>
        </div>
      </div>
    </div>
  );
};

// ============ FORECAST DASHBOARD ============
const ForecastDashboard = ({ onBack }) => {
  const actualData = forecastData.filter(d => d.actual !== null);
  const aiAccuracy = 1 - (actualData.reduce((sum, d) => sum + Math.abs(d.actual - d.ai) / d.actual, 0) / actualData.length);
  const legacyAccuracy = 1 - (actualData.reduce((sum, d) => sum + Math.abs(d.actual - d.legacy) / d.actual, 0) / actualData.length);
  
  const totalActual = actualData.reduce((sum, d) => sum + d.actual, 0);
  const totalLegacyForecast = actualData.reduce((sum, d) => sum + d.legacy, 0);
  const totalAIForecast = actualData.reduce((sum, d) => sum + d.ai, 0);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-6">
          <button onClick={onBack} className="text-slate-400 hover:text-white mb-2 flex items-center gap-1">
            ← Back to Portfolio
          </button>
          <h1 className="text-2xl md:text-3xl font-bold">AI Forecast Dashboard</h1>
          <p className="text-slate-400">Predictive Analytics vs. Legacy Methods</p>
        </div>

        <div className="bg-emerald-500/20 border border-emerald-500/50 rounded-xl p-4 mb-6">
          <h3 className="text-emerald-400 font-semibold">✓ AI Forecasting Delivers Results</h3>
          <p className="text-white mt-1">
            AI model achieved <span className="text-emerald-400 font-bold">{(aiAccuracy * 100).toFixed(1)}% accuracy</span> vs. 
            legacy Excel method at {(legacyAccuracy * 100).toFixed(1)}%. Improvement: <span className="text-emerald-400 font-bold">+{((aiAccuracy - legacyAccuracy) * 100).toFixed(0)} points</span>
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 rounded-lg border-l-4 border-l-emerald-500 bg-emerald-500/10">
            <p className="text-xs text-slate-400 uppercase">AI Accuracy</p>
            <p className="text-2xl font-bold text-emerald-400">{(aiAccuracy * 100).toFixed(1)}%</p>
          </div>
          <div className="p-4 rounded-lg border-l-4 border-l-red-500 bg-red-500/10">
            <p className="text-xs text-slate-400 uppercase">Legacy Accuracy</p>
            <p className="text-2xl font-bold text-red-400">{(legacyAccuracy * 100).toFixed(1)}%</p>
          </div>
          <div className="p-4 rounded-lg border-l-4 border-l-blue-500 bg-blue-500/10">
            <p className="text-xs text-slate-400 uppercase">Dec Projection</p>
            <p className="text-2xl font-bold text-white">$628K</p>
          </div>
          <div className="p-4 rounded-lg border-l-4 border-l-amber-500 bg-amber-500/10">
            <p className="text-xs text-slate-400 uppercase">Variance Saved</p>
            <p className="text-2xl font-bold text-amber-400">{formatCurrency(Math.abs(totalActual - totalLegacyForecast) - Math.abs(totalActual - totalAIForecast))}</p>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-4 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">2024 Forecast: Actual vs Predictions</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" tickFormatter={(v) => `$${v/1000}K`} />
              <Tooltip formatter={(v) => formatCurrency(v)} contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} />
              <Legend />
              <Line type="monotone" dataKey="actual" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} name="Actual" />
              <Line type="monotone" dataKey="ai" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" name="AI Forecast" />
              <Line type="monotone" dataKey="legacy" stroke="#ef4444" strokeWidth={2} strokeDasharray="3 3" name="Legacy" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-800 rounded-xl p-4">
          <h3 className="text-lg font-semibold text-white mb-4">Accuracy Comparison</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-400">AI Forecast</span>
                <span className="text-emerald-400">{(aiAccuracy * 100).toFixed(1)}%</span>
              </div>
              <div className="h-3 bg-slate-700 rounded-full">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${aiAccuracy * 100}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-400">Legacy Excel</span>
                <span className="text-red-400">{(legacyAccuracy * 100).toFixed(1)}%</span>
              </div>
              <div className="h-3 bg-slate-700 rounded-full">
                <div className="h-full bg-red-500 rounded-full" style={{ width: `${legacyAccuracy * 100}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============ MAIN APP ============
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  if (currentPage === 'value') {
    return <ValueDashboard onBack={() => setCurrentPage('home')} />;
  }
  
  if (currentPage === 'forecast') {
    return <ForecastDashboard onBack={() => setCurrentPage('home')} />;
  }

  return <LandingPage onNavigate={setCurrentPage} />;
}
