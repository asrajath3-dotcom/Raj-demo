import React from 'react';

const Dashboard = () => {
  const vitals = [
    { name: 'Heart Rate', value: '72', unit: 'bpm', icon: '❤️', status: 'normal' },
    { name: 'Temperature', value: '36.6', unit: '°C', icon: '🌡️', status: 'normal' },
    { name: 'Oxygen Level', value: '98', unit: '%', icon: '🫁', status: 'good' },
    { name: 'Blood Pressure', value: '118/76', unit: 'mmHg', icon: '📊', status: 'normal' },
  ];

  const recentChecks = [
    { date: 'Mar 28, 2026', symptoms: 'Cough, Fatigue', temp: '37.2°C', result: 'Mild Fever' },
    { date: 'Mar 21, 2026', symptoms: 'Headache', temp: '36.8°C', result: 'Normal' },
    { date: 'Mar 14, 2026', symptoms: 'None', temp: '36.5°C', result: 'Healthy' },
  ];

  return (
    <div className="animate-fadeInUp">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Welcome back, John</h1>
        <p className="text-gray-500 mt-1">Here's your health overview</p>
      </div>

      {/* Vitals Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {vitals.map((vital, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-5 card-hover border border-gray-100">
            <div className="flex justify-between items-start mb-3">
              <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center text-2xl">
                {vital.icon}
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                vital.status === 'good' ? 'bg-green-100 text-green-700' :
                vital.status === 'warning' ? 'bg-orange-100 text-orange-700' :
                'bg-blue-100 text-blue-700'
              }`}>
                {vital.status === 'good' ? 'Good' : vital.status === 'warning' ? 'Attention' : 'Normal'}
              </span>
            </div>
            <h3 className="text-gray-500 text-sm">{vital.name}</h3>
            <p className="text-2xl font-bold text-gray-800 mt-1">
              {vital.value} <span className="text-sm font-normal text-gray-400">{vital.unit}</span>
            </p>
          </div>
        ))}
      </div>

      {/* Recent Health Checks */}
      <div className="bg-white rounded-xl shadow-sm p-6 card-hover border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span>📋</span> Recent Health Analyses
        </h2>
        <div className="space-y-3">
          {recentChecks.map((check, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div>
                <p className="font-medium text-gray-800">{check.date}</p>
                <p className="text-sm text-gray-500">{check.symptoms || 'No symptoms'}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">{check.temp}</p>
                <p className={`text-sm font-medium ${
                  check.result === 'Healthy' ? 'text-green-600' :
                  check.result === 'Normal' ? 'text-blue-600' :
                  'text-orange-600'
                }`}>
                  {check.result}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;