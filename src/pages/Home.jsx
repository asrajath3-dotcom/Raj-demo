import React, { useState } from 'react';

const Home = () => {
  const [age, setAge] = useState('');
  const [temperature, setTemperature] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const symptoms = [
    { id: 'cough', name: 'Cough', emoji: '🤧', color: 'from-blue-400 to-blue-500' },
    { id: 'fever', name: 'Fever', emoji: '🌡️', color: 'from-red-400 to-red-500' },
    { id: 'fatigue', name: 'Fatigue', emoji: '😴', color: 'from-yellow-400 to-yellow-500' },
    { id: 'headache', name: 'Headache', emoji: '🤕', color: 'from-purple-400 to-purple-500' },
    { id: 'nausea', name: 'Nausea', emoji: '🤢', color: 'from-green-400 to-green-500' },
  ];

  const toggleSymptom = (symptomId) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptomId)
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (age && temperature) {
      setShowResult(true);
    }
  };

  const getHealthSummary = () => {
    const temp = parseFloat(temperature);
    let status = '';
    let color = '';
    let recommendation = '';
    
    if (temp > 38.5) {
      status = 'High Fever';
      color = 'text-red-600';
      recommendation = '⚠️ Please consult a doctor immediately. Rest and stay hydrated.';
    } else if (temp > 37.5) {
      status = 'Mild Fever';
      color = 'text-orange-600';
      recommendation = '🌡️ You have a mild fever. Rest, stay hydrated, and monitor your temperature.';
    } else if (temp < 36.0) {
      status = 'Below Normal';
      color = 'text-blue-600';
      recommendation = '❄️ Your temperature is below normal. Keep warm and stay hydrated.';
    } else {
      status = 'Normal';
      color = 'text-green-600';
      recommendation = '✅ Your temperature is normal. Continue maintaining a healthy lifestyle.';
    }
    
    return { status, color, recommendation };
  };

  const summary = getHealthSummary();

  return (
    <div className="animate-fadeInUp">
      {/* Hero Section */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl mb-5 shadow-lg">
          <span className="text-white text-3xl">🏥</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
          Your Health, <span className="text-gradient">Digitally Simplified</span>
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
          AI Symptom Analyzer — Input vitals for an immediate health summary
        </p>
      </div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* Left Column - Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 card-hover border border-gray-100">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl">📋</span>
            <h2 className="text-xl font-semibold text-gray-800">Health Assessment</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Age Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <span>👤</span>
                Enter Age
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Years"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all bg-gray-50 hover:bg-white"
                required
              />
            </div>

            {/* Temperature Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <span>🌡️</span>
                Temp (°C)
              </label>
              <input
                type="number"
                step="0.1"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                placeholder="36.5"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all bg-gray-50 hover:bg-white"
                required
              />
            </div>

            {/* Symptoms Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Current Symptoms
              </label>
              <div className="flex flex-wrap gap-3">
                {symptoms.map((symptom) => {
                  const isSelected = selectedSymptoms.includes(symptom.id);
                  return (
                    <button
                      key={symptom.id}
                      type="button"
                      onClick={() => toggleSymptom(symptom.id)}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-200 ${
                        isSelected
                          ? `bg-gradient-to-r ${symptom.color} text-white shadow-md`
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <span>{symptom.emoji}</span>
                      <span>{symptom.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
            >
              Get Health Analysis
              <span>➔</span>
            </button>
          </form>
        </div>

        {/* Right Column - Result */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 card-hover border border-gray-100">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl">📊</span>
            <h2 className="text-xl font-semibold text-gray-800">Health Summary</h2>
          </div>
          
          {showResult ? (
            <div className="space-y-6">
              {/* Vitals Display */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 text-center">
                  <p className="text-sm text-gray-500 mb-1">Age</p>
                  <p className="text-2xl font-bold text-gray-800">{age} <span className="text-sm font-normal">years</span></p>
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 text-center">
                  <p className="text-sm text-gray-500 mb-1">Temperature</p>
                  <p className={`text-2xl font-bold ${summary.color}`}>{temperature}°C</p>
                </div>
              </div>
              
              {/* Temperature Status */}
              <div className={`p-4 rounded-xl ${
                summary.status === 'Normal' ? 'bg-green-50 border border-green-100' :
                summary.status.includes('Fever') ? 'bg-orange-50 border border-orange-100' : 
                'bg-blue-50 border border-blue-100'
              }`}>
                <p className="text-sm text-gray-600 mb-1">Temperature Status</p>
                <p className={`text-lg font-semibold ${summary.color}`}>{summary.status}</p>
              </div>
              
              {/* Symptoms Display */}
              {selectedSymptoms.length > 0 && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">Reported Symptoms</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedSymptoms.map(id => {
                      const symptom = symptoms.find(s => s.id === id);
                      return (
                        <span key={id} className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-700">
                          <span>{symptom.emoji}</span>
                          {symptom.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
              
              {/* AI Recommendation */}
              <div className="border-t border-gray-100 pt-4">
                <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                  <span>🤖</span> AI Recommendation
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {summary.recommendation}
                  {selectedSymptoms.length > 0 && !summary.recommendation.includes('consult') && 
                    " Monitor your symptoms and rest well. If symptoms persist, consult a healthcare provider."}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-5">
                <span className="text-gray-400 text-4xl">📝</span>
              </div>
              <p className="text-gray-400 text-lg">Enter your vitals and click</p>
              <p className="text-gray-400">"Get Health Analysis" to see your summary</p>
            </div>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 text-center card-hover border border-gray-100">
          <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-teal-600 text-2xl">🤖</span>
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">AI-Powered Analysis</h3>
          <p className="text-sm text-gray-500">Instant health insights using advanced algorithms</p>
        </div>
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 text-center card-hover border border-gray-100">
          <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-teal-600 text-2xl">📅</span>
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">Track History</h3>
          <p className="text-sm text-gray-500">All your health analyses saved in one place</p>
        </div>
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 text-center card-hover border border-gray-100">
          <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-teal-600 text-2xl">👨‍⚕️</span>
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">Doctor Recommendations</h3>
          <p className="text-sm text-gray-500">Connect with professionals when needed</p>
        </div>
      </div>
    </div>
  );
};

export default Home;