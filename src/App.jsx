import React, { useState } from 'react';

// Home Component
const Home = () => {
  const [age, setAge] = useState('');
  const [temperature, setTemperature] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const symptoms = [
    { id: 'cough', name: 'Cough', emoji: '🤧' },
    { id: 'fever', name: 'Fever', emoji: '🌡️' },
    { id: 'fatigue', name: 'Fatigue', emoji: '😴' },
    { id: 'headache', name: 'Headache', emoji: '🤕' },
    { id: 'nausea', name: 'Nausea', emoji: '🤢' },
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
    let statusColor = '';
    let recommendation = '';
    
    if (temp > 38.5) {
      status = 'High Fever';
      statusColor = '#ef4444';
      recommendation = '⚠️ Please consult a doctor immediately. Rest and stay hydrated.';
    } else if (temp > 37.5) {
      status = 'Mild Fever';
      statusColor = '#f97316';
      recommendation = '🌡️ You have a mild fever. Rest, stay hydrated, and monitor your temperature.';
    } else if (temp < 36.0) {
      status = 'Below Normal';
      statusColor = '#3b82f6';
      recommendation = '❄️ Your temperature is below normal. Keep warm and stay hydrated.';
    } else {
      status = 'Normal';
      statusColor = '#10b981';
      recommendation = '✅ Your temperature is normal. Continue maintaining a healthy lifestyle.';
    }
    
    return { status, statusColor, recommendation };
  };

  const summary = getHealthSummary();

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <div style={styles.heroIcon}>🏥</div>
        <h1 style={styles.heroTitle}>
          Your Health, <span style={styles.gradientText}>Digitally Simplified</span>
        </h1>
        <p style={styles.heroSubtitle}>AI Symptom Analyzer — Input vitals for an immediate health summary</p>
      </div>

      {/* Two Column Layout */}
      <div style={styles.twoColumn}>
        {/* Left Column - Form */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <span style={{ fontSize: '24px' }}>📋</span>
            <h2 style={styles.cardTitle}>Health Assessment</h2>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>
                <span>👤</span> Enter Age
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Years"
                style={styles.formInput}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>
                <span>🌡️</span> Temp (°C)
              </label>
              <input
                type="number"
                step="0.1"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                placeholder="36.5"
                style={styles.formInput}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Select Current Symptoms</label>
              <div style={styles.symptomsContainer}>
                {symptoms.map((symptom) => {
                  const isSelected = selectedSymptoms.includes(symptom.id);
                  return (
                    <button
                      key={symptom.id}
                      type="button"
                      onClick={() => toggleSymptom(symptom.id)}
                      style={{
                        ...styles.symptomChip,
                        ...(isSelected ? styles.symptomChipSelected : {})
                      }}
                    >
                      <span>{symptom.emoji}</span>
                      <span>{symptom.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button type="submit" style={styles.primaryButton}>
              Get Health Analysis <span>➔</span>
            </button>
          </form>
        </div>

        {/* Right Column - Result */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <span style={{ fontSize: '24px' }}>📊</span>
            <h2 style={styles.cardTitle}>Health Summary</h2>
          </div>
          
          {showResult ? (
            <div>
              <div style={styles.vitalsGrid}>
                <div style={styles.vitalCard}>
                  <div style={styles.vitalLabel}>Age</div>
                  <div style={styles.vitalValue}>{age} <span style={styles.vitalUnit}>years</span></div>
                </div>
                <div style={styles.vitalCard}>
                  <div style={styles.vitalLabel}>Temperature</div>
                  <div style={{ ...styles.vitalValue, color: summary.statusColor }}>{temperature}°C</div>
                </div>
              </div>
              
              <div style={{
                ...styles.statusCard,
                ...(summary.status === 'Normal' ? styles.statusNormal :
                  summary.status.includes('Fever') ? styles.statusWarning : styles.statusHigh)
              }}>
                <div style={styles.vitalLabel}>Temperature Status</div>
                <div style={{ ...styles.vitalValue, color: summary.statusColor }}>{summary.status}</div>
              </div>
              
              {selectedSymptoms.length > 0 && (
                <div style={{ marginBottom: '16px' }}>
                  <div style={styles.vitalLabel}>Reported Symptoms</div>
                  <div style={styles.symptomsContainer}>
                    {selectedSymptoms.map(id => {
                      const symptom = symptoms.find(s => s.id === id);
                      return (
                        <span key={id} style={styles.symptomBadge}>
                          <span>{symptom.emoji}</span> {symptom.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
              
              <div style={styles.recommendationBox}>
                <div style={styles.recommendationLabel}>🤖 AI Recommendation</div>
                <div style={styles.recommendationText}>
                  {summary.recommendation}
                  {selectedSymptoms.length > 0 && !summary.recommendation.includes('consult') && 
                    " Monitor your symptoms and rest well. If symptoms persist, consult a healthcare provider."}
                </div>
              </div>
            </div>
          ) : (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>📝</div>
              <div style={styles.emptyText}>
                <p>Enter your vitals and click</p>
                <p>"Get Health Analysis" to see your summary</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div style={styles.featuresGrid}>
        <div style={styles.featureCard}>
          <div style={styles.featureIcon}>🤖</div>
          <h3 style={styles.featureTitle}>AI-Powered Analysis</h3>
          <p style={styles.featureText}>Instant health insights using advanced algorithms</p>
        </div>
        <div style={styles.featureCard}>
          <div style={styles.featureIcon}>📅</div>
          <h3 style={styles.featureTitle}>Track History</h3>
          <p style={styles.featureText}>All your health analyses saved in one place</p>
        </div>
        <div style={styles.featureCard}>
          <div style={styles.featureIcon}>👨‍⚕️</div>
          <h3 style={styles.featureTitle}>Doctor Recommendations</h3>
          <p style={styles.featureText}>Connect with professionals when needed</p>
        </div>
      </div>
    </div>
  );
};

// Dashboard Component
const Dashboard = () => {
  const vitals = [
    { name: 'Heart Rate', value: '72', unit: 'bpm', icon: '❤️', status: 'normal' },
    { name: 'Temperature', value: '36.6', unit: '°C', icon: '🌡️', status: 'normal' },
    { name: 'Oxygen Level', value: '98', unit: '%', icon: '🫁', status: 'good' },
    { name: 'Blood Pressure', value: '118/76', unit: 'mmHg', icon: '📊', status: 'normal' },
  ];

  const recentChecks = [
    { date: 'Mar 28, 2026', symptoms: 'Cough, Fatigue', temp: '37.2°C', result: 'Mild Fever', resultColor: '#f97316' },
    { date: 'Mar 21, 2026', symptoms: 'Headache', temp: '36.8°C', result: 'Normal', resultColor: '#3b82f6' },
    { date: 'Mar 14, 2026', symptoms: 'None', temp: '36.5°C', result: 'Healthy', resultColor: '#10b981' },
  ];

  return (
    <div style={styles.container}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '30px', fontWeight: 'bold', color: '#1e293b' }}>Welcome back, John</h1>
        <p style={{ color: '#64748b', marginTop: '4px' }}>Here's your health overview</p>
      </div>

      <div style={styles.dashboardGrid}>
        {vitals.map((vital, index) => (
          <div key={index} style={styles.statCard}>
            <div style={styles.statHeader}>
              <div style={styles.statIcon}>{vital.icon}</div>
              <span style={{
                ...styles.statBadge,
                ...(vital.status === 'good' ? styles.statBadgeGood : styles.statBadgeNormal)
              }}>
                {vital.status === 'good' ? 'Good' : 'Normal'}
              </span>
            </div>
            <div style={styles.statName}>{vital.name}</div>
            <div style={styles.statValue}>
              {vital.value} <span style={{ fontSize: '14px', fontWeight: 'normal', color: '#94a3b8' }}>{vital.unit}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.recentList}>
        <div style={styles.recentTitle}>📋 Recent Health Analyses</div>
        {recentChecks.map((check, index) => (
          <div key={index} style={styles.recentItem}>
            <div>
              <div style={styles.recentDate}>{check.date}</div>
              <div style={styles.recentSymptoms}>{check.symptoms || 'No symptoms'}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={styles.recentTemp}>{check.temp}</div>
              <div style={{ ...styles.recentResult, color: check.resultColor }}>{check.result}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Profile Component
const Profile = () => {
  return (
    <div style={styles.container}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '30px', fontWeight: 'bold', color: '#1e293b' }}>My Profile</h1>
        <p style={{ color: '#64748b', marginTop: '4px' }}>Manage your personal information</p>
      </div>

      <div style={styles.profileGrid}>
        <div style={styles.profileCard}>
          <div style={styles.profileAvatar}>JD</div>
          <div style={styles.profileName}>John Doe</div>
          <div style={styles.profileEmail}>john.doe@email.com</div>
          <div style={styles.profileMember}>Member since 2024</div>
          <button style={styles.editButton}>Edit Profile</button>
        </div>

        <div style={styles.infoCard}>
          <div style={styles.infoTitle}>Personal Information</div>
          <div style={styles.infoGrid}>
            <div>
              <div style={styles.infoLabel}>Full Name</div>
              <div style={styles.infoValue}>John Doe</div>
            </div>
            <div>
              <div style={styles.infoLabel}>Date of Birth</div>
              <div style={styles.infoValue}>March 15, 1990</div>
            </div>
            <div>
              <div style={styles.infoLabel}>Blood Type</div>
              <div style={styles.infoValue}>O+</div>
            </div>
            <div>
              <div style={styles.infoLabel}>Allergies</div>
              <div style={styles.infoValue}>Pollen, Penicillin</div>
            </div>
            <div>
              <div style={styles.infoLabel}>Phone</div>
              <div style={styles.infoValue}>+1 (555) 123-4567</div>
            </div>
            <div>
              <div style={styles.infoLabel}>Emergency Contact</div>
              <div style={styles.infoValue}>Jane Doe: +1 (555) 987-6543</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'dashboard':
        return <Dashboard />;
      case 'profile':
        return <Profile />;
      default:
        return <Home />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0f4f8 0%, #e6ecf4 100%)' }}>
      {/* Navigation Bar */}
      <nav style={styles.navbar}>
        <div style={styles.navbarContent}>
          <div style={styles.logo} onClick={() => setCurrentPage('home')}>
            <div style={styles.logoIcon}>V</div>
            <div style={styles.logoText}>Vital<span style={{ color: '#14b8a6' }}>Ease</span></div>
          </div>
          <div style={styles.navLinks}>
            <button
              onClick={() => setCurrentPage('home')}
              style={{
                ...styles.navButton,
                ...(currentPage === 'home' ? styles.navButtonActive : {})
              }}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentPage('dashboard')}
              style={{
                ...styles.navButton,
                ...(currentPage === 'dashboard' ? styles.navButtonActive : {})
              }}
            >
              Dashboard
            </button>
            <button
              onClick={() => setCurrentPage('profile')}
              style={{
                ...styles.navButton,
                ...(currentPage === 'profile' ? styles.navButtonActive : {})
              }}
            >
              Profile
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {renderPage()}
      </div>
    </div>
  );
}

// All Styles (Inline)
const styles = {
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
  },
  navbar: {
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(12px)',
    position: 'sticky',
    top: 0,
    zIndex: 50,
    borderBottom: '1px solid #e2e8f0',
  },
  navbarContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '70px',
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 24px',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
  },
  logoIcon: {
    width: '36px',
    height: '36px',
    background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    fontWeight: 'bold',
    color: 'white',
  },
  logoText: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1e293b',
  },
  navLinks: {
    display: 'flex',
    gap: '8px',
  },
  navButton: {
    padding: '8px 16px',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: 500,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#64748b',
    transition: 'all 0.2s',
  },
  navButtonActive: {
    background: '#e6f7f5',
    color: '#0d9488',
    fontWeight: 600,
  },
  mainContent: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '32px 24px',
  },
  hero: {
    textAlign: 'center',
    marginBottom: '48px',
  },
  heroIcon: {
    width: '80px',
    height: '80px',
    background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
    borderRadius: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 24px',
    fontSize: '40px',
    boxShadow: '0 20px 25px -12px rgba(20, 184, 166, 0.3)',
  },
  heroTitle: {
    fontSize: '40px',
    fontWeight: 800,
    marginBottom: '16px',
    color: '#1e293b',
  },
  gradientText: {
    background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  heroSubtitle: {
    fontSize: '18px',
    color: '#64748b',
    maxWidth: '600px',
    margin: '0 auto',
  },
  twoColumn: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '32px',
  },
  card: {
    background: 'white',
    borderRadius: '24px',
    padding: '32px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
    border: '1px solid #e2e8f0',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '24px',
  },
  cardTitle: {
    fontSize: '20px',
    fontWeight: 600,
    color: '#1e293b',
  },
  formGroup: {
    marginBottom: '24px',
  },
  formLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    fontWeight: 500,
    color: '#334155',
    marginBottom: '8px',
  },
  formInput: {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '16px',
    transition: 'all 0.2s',
    boxSizing: 'border-box',
  },
  symptomsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
  },
  symptomChip: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 20px',
    borderRadius: '40px',
    fontSize: '14px',
    fontWeight: 500,
    background: '#f8fafc',
    color: '#334155',
    border: '1px solid #e2e8f0',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  symptomChipSelected: {
    background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
    color: 'white',
    border: 'none',
  },
  primaryButton: {
    width: '100%',
    background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
    color: 'white',
    padding: '14px',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: 600,
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'all 0.2s',
  },
  vitalsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    marginBottom: '24px',
  },
  vitalCard: {
    background: 'linear-gradient(135deg, #f8fafc, #ffffff)',
    borderRadius: '16px',
    padding: '16px',
    textAlign: 'center',
    border: '1px solid #e2e8f0',
  },
  vitalLabel: {
    fontSize: '12px',
    color: '#64748b',
    marginBottom: '4px',
  },
  vitalValue: {
    fontSize: '28px',
    fontWeight: 700,
    color: '#1e293b',
  },
  vitalUnit: {
    fontSize: '12px',
    fontWeight: 400,
    color: '#94a3b8',
  },
  statusCard: {
    borderRadius: '16px',
    padding: '16px',
    marginBottom: '16px',
  },
  statusNormal: {
    background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
    borderLeft: '4px solid #22c55e',
  },
  statusWarning: {
    background: 'linear-gradient(135deg, #fff7ed, #ffedd5)',
    borderLeft: '4px solid #f97316',
  },
  statusHigh: {
    background: 'linear-gradient(135deg, #fef2f2, #fee2e2)',
    borderLeft: '4px solid #ef4444',
  },
  symptomBadge: {
    padding: '4px 12px',
    background: '#f1f5f9',
    borderRadius: '9999px',
    fontSize: '12px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
  },
  recommendationBox: {
    background: '#f8fafc',
    borderRadius: '16px',
    padding: '16px',
    marginTop: '16px',
    border: '1px solid #e2e8f0',
  },
  recommendationLabel: {
    fontSize: '12px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: '#14b8a6',
    marginBottom: '8px',
  },
  recommendationText: {
    fontSize: '14px',
    color: '#334155',
    lineHeight: 1.5,
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '400px',
    textAlign: 'center',
  },
  emptyIcon: {
    width: '96px',
    height: '96px',
    background: '#f1f5f9',
    borderRadius: '9999px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '48px',
    marginBottom: '16px',
  },
  emptyText: {
    color: '#94a3b8',
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '24px',
    marginTop: '48px',
  },
  featureCard: {
    background: 'white',
    borderRadius: '20px',
    padding: '24px',
    textAlign: 'center',
    border: '1px solid #e2e8f0',
    transition: 'all 0.3s',
  },
  featureIcon: {
    width: '64px',
    height: '64px',
    background: 'linear-gradient(135deg, #e6f7f5, #ccf0ed)',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 16px',
    fontSize: '32px',
  },
  featureTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#1e293b',
    marginBottom: '8px',
  },
  featureText: {
    fontSize: '14px',
    color: '#64748b',
  },
  dashboardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '32px',
  },
  statCard: {
    background: 'white',
    borderRadius: '20px',
    padding: '20px',
    border: '1px solid #e2e8f0',
  },
  statHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  statIcon: {
    width: '48px',
    height: '48px',
    background: 'linear-gradient(135deg, #e6f7f5, #ccf0ed)',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
  },
  statBadge: {
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: 600,
  },
  statBadgeGood: {
    background: '#d1fae5',
    color: '#065f46',
  },
  statBadgeNormal: {
    background: '#dbeafe',
    color: '#1e40af',
  },
  statName: {
    fontSize: '12px',
    color: '#64748b',
    marginBottom: '4px',
  },
  statValue: {
    fontSize: '28px',
    fontWeight: 700,
    color: '#1e293b',
  },
  recentList: {
    background: 'white',
    borderRadius: '20px',
    padding: '24px',
    border: '1px solid #e2e8f0',
  },
  recentTitle: {
    fontSize: '18px',
    fontWeight: 600,
    marginBottom: '20px',
    paddingBottom: '12px',
    borderBottom: '2px solid #e2e8f0',
  },
  recentItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 0',
    borderBottom: '1px solid #f1f5f9',
  },
  recentDate: {
    fontWeight: 600,
    color: '#1e293b',
    fontSize: '14px',
  },
  recentSymptoms: {
    fontSize: '12px',
    color: '#64748b',
    marginTop: '4px',
  },
  recentTemp: {
    fontSize: '14px',
    color: '#475569',
  },
  recentResult: {
    fontSize: '12px',
    fontWeight: 600,
  },
  profileGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '32px',
  },
  profileCard: {
    background: 'white',
    borderRadius: '24px',
    padding: '32px 24px',
    textAlign: 'center',
    border: '1px solid #e2e8f0',
  },
  profileAvatar: {
    width: '120px',
    height: '120px',
    background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
    borderRadius: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 16px',
    fontSize: '40px',
    fontWeight: 'bold',
    color: 'white',
  },
  profileName: {
    fontSize: '24px',
    fontWeight: 700,
    color: '#1e293b',
    marginBottom: '4px',
  },
  profileEmail: {
    fontSize: '14px',
    color: '#64748b',
    marginBottom: '4px',
  },
  profileMember: {
    fontSize: '12px',
    color: '#94a3b8',
    marginBottom: '16px',
  },
  editButton: {
    width: '100%',
    padding: '10px 20px',
    background: '#f1f5f9',
    border: 'none',
    borderRadius: '12px',
    color: '#475569',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
  },
  infoCard: {
    background: 'white',
    borderRadius: '24px',
    padding: '32px',
    border: '1px solid #e2e8f0',
  },
  infoTitle: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#1e293b',
    marginBottom: '24px',
    paddingBottom: '12px',
    borderBottom: '2px solid #e2e8f0',
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
  },
  infoLabel: {
    fontSize: '12px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: '#14b8a6',
    marginBottom: '4px',
  },
  infoValue: {
    fontSize: '16px',
    fontWeight: 500,
    color: '#1e293b',
  },
};

export default App;