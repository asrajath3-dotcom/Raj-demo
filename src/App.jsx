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
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <span style={{ fontSize: '24px' }}>📋</span>
            <h2 style={styles.cardTitle}>Health Assessment</h2>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>👤 Enter Age</label>
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
              <label style={styles.formLabel}>🌡️ Temp (°C)</label>
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
                <div style={{ ...styles.vitalValue, color: summary.statusColor, fontSize: '20px' }}>{summary.status}</div>
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

// Profile Component with Working Edit Modal
const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    dob: 'March 15, 1990',
    bloodType: 'O+',
    allergies: 'Pollen, Penicillin',
    emergencyContact: 'Jane Doe: +1 (555) 987-6543',
    address: '123 Health St, Wellness City, HC 12345'
  });

  const [formData, setFormData] = useState({ ...profileData });

  const openModal = () => {
    setFormData({ ...profileData });
    setIsEditing(true);
  };

  const closeModal = () => {
    setIsEditing(false);
  };

  const saveChanges = () => {
    setProfileData({ ...formData });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div style={styles.container}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '30px', fontWeight: 'bold', color: '#1e293b' }}>My Profile</h1>
        <p style={{ color: '#64748b', marginTop: '4px' }}>Manage your personal information</p>
      </div>

      <div style={profileStyles.grid}>
        <div style={profileStyles.card}>
          <div style={profileStyles.avatar}>JD</div>
          <div style={profileStyles.name}>{profileData.fullName}</div>
          <div style={profileStyles.email}>{profileData.email}</div>
          <div style={profileStyles.memberSince}>Member since 2024</div>
          <button onClick={openModal} style={profileStyles.editButton}>
            ✏️ Edit Profile
          </button>
        </div>

        <div style={profileStyles.infoCard}>
          <div style={profileStyles.infoTitle}>Personal Information</div>
          <div style={profileStyles.infoGrid}>
            <div>
              <div style={profileStyles.infoLabel}>Full Name</div>
              <div style={profileStyles.infoValue}>{profileData.fullName}</div>
            </div>
            <div>
              <div style={profileStyles.infoLabel}>Date of Birth</div>
              <div style={profileStyles.infoValue}>{profileData.dob}</div>
            </div>
            <div>
              <div style={profileStyles.infoLabel}>Blood Type</div>
              <div style={profileStyles.infoValue}>{profileData.bloodType}</div>
            </div>
            <div>
              <div style={profileStyles.infoLabel}>Allergies</div>
              <div style={profileStyles.infoValue}>{profileData.allergies}</div>
            </div>
            <div>
              <div style={profileStyles.infoLabel}>Phone</div>
              <div style={profileStyles.infoValue}>{profileData.phone}</div>
            </div>
            <div>
              <div style={profileStyles.infoLabel}>Emergency Contact</div>
              <div style={profileStyles.infoValue}>{profileData.emergencyContact}</div>
            </div>
            <div>
              <div style={profileStyles.infoLabel}>Email</div>
              <div style={profileStyles.infoValue}>{profileData.email}</div>
            </div>
            <div>
              <div style={profileStyles.infoLabel}>Address</div>
              <div style={profileStyles.infoValue}>{profileData.address}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div style={modalStyles.overlay} onClick={closeModal}>
          <div style={modalStyles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={modalStyles.header}>
              <h2 style={modalStyles.title}>Edit Profile</h2>
              <button onClick={closeModal} style={modalStyles.closeBtn}>✕</button>
            </div>
            
            <div style={modalStyles.body}>
              <div style={modalStyles.field}>
                <label style={modalStyles.label}>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  style={modalStyles.input}
                />
              </div>
              
              <div style={modalStyles.row}>
                <div style={modalStyles.field}>
                  <label style={modalStyles.label}>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    style={modalStyles.input}
                  />
                </div>
                <div style={modalStyles.field}>
                  <label style={modalStyles.label}>Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    style={modalStyles.input}
                  />
                </div>
              </div>
              
              <div style={modalStyles.row}>
                <div style={modalStyles.field}>
                  <label style={modalStyles.label}>Date of Birth</label>
                  <input
                    type="text"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    style={modalStyles.input}
                  />
                </div>
                <div style={modalStyles.field}>
                  <label style={modalStyles.label}>Blood Type</label>
                  <select
                    name="bloodType"
                    value={formData.bloodType}
                    onChange={handleChange}
                    style={modalStyles.input}
                  >
                    <option>A+</option><option>A-</option><option>B+</option><option>B-</option>
                    <option>O+</option><option>O-</option><option>AB+</option><option>AB-</option>
                  </select>
                </div>
              </div>
              
              <div style={modalStyles.field}>
                <label style={modalStyles.label}>Allergies</label>
                <input
                  type="text"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  style={modalStyles.input}
                />
              </div>
              
              <div style={modalStyles.field}>
                <label style={modalStyles.label}>Emergency Contact</label>
                <input
                  type="text"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  style={modalStyles.input}
                />
              </div>
              
              <div style={modalStyles.field}>
                <label style={modalStyles.label}>Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  style={{ ...modalStyles.input, ...modalStyles.textarea }}
                  rows="2"
                />
              </div>
            </div>
            
            <div style={modalStyles.footer}>
              <button onClick={closeModal} style={modalStyles.cancelBtn}>Cancel</button>
              <button onClick={saveChanges} style={modalStyles.saveBtn}>Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Main App Component
function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home />;
      case 'dashboard': return <Dashboard />;
      case 'profile': return <Profile />;
      default: return <Home />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0f4f8 0%, #e6ecf4 100%)' }}>
      <nav style={navStyles.navbar}>
        <div style={navStyles.content}>
          <div style={navStyles.logo} onClick={() => setCurrentPage('home')}>
            <div style={navStyles.logoIcon}>V</div>
            <div style={navStyles.logoText}>Vital<span style={{ color: '#14b8a6' }}>Ease</span></div>
          </div>
          <div style={navStyles.links}>
            <button onClick={() => setCurrentPage('home')} style={{...navStyles.link, ...(currentPage === 'home' ? navStyles.active : {})}}>Home</button>
            <button onClick={() => setCurrentPage('dashboard')} style={{...navStyles.link, ...(currentPage === 'dashboard' ? navStyles.active : {})}}>Dashboard</button>
            <button onClick={() => setCurrentPage('profile')} style={{...navStyles.link, ...(currentPage === 'profile' ? navStyles.active : {})}}>Profile</button>
          </div>
        </div>
      </nav>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 24px' }}>
        {renderPage()}
      </div>
    </div>
  );
}

// Styles
const styles = {
  container: { maxWidth: '1280px', margin: '0 auto' },
  hero: { textAlign: 'center', marginBottom: '48px' },
  heroIcon: { width: '80px', height: '80px', background: 'linear-gradient(135deg, #14b8a6, #0d9488)', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '40px', boxShadow: '0 20px 25px -12px rgba(20, 184, 166, 0.3)' },
  heroTitle: { fontSize: '40px', fontWeight: 800, marginBottom: '16px', color: '#1e293b' },
  gradientText: { background: 'linear-gradient(135deg, #14b8a6, #0d9488)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
  heroSubtitle: { fontSize: '18px', color: '#64748b', maxWidth: '600px', margin: '0 auto' },
  twoColumn: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' },
  card: { background: 'white', borderRadius: '24px', padding: '32px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', border: '1px solid #e2e8f0' },
  cardHeader: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' },
  cardTitle: { fontSize: '20px', fontWeight: 600, color: '#1e293b' },
  formGroup: { marginBottom: '24px' },
  formLabel: { display: 'block', fontSize: '14px', fontWeight: 500, color: '#334155', marginBottom: '8px' },
  formInput: { width: '100%', padding: '12px 16px', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '16px', boxSizing: 'border-box' },
  symptomsContainer: { display: 'flex', flexWrap: 'wrap', gap: '12px' },
  symptomChip: { display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 20px', borderRadius: '40px', fontSize: '14px', fontWeight: 500, background: '#f8fafc', color: '#334155', border: '1px solid #e2e8f0', cursor: 'pointer' },
  symptomChipSelected: { background: 'linear-gradient(135deg, #14b8a6, #0d9488)', color: 'white', border: 'none' },
  primaryButton: { width: '100%', background: 'linear-gradient(135deg, #14b8a6, #0d9488)', color: 'white', padding: '14px', borderRadius: '12px', fontSize: '16px', fontWeight: 600, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' },
  vitalsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' },
  vitalCard: { background: 'linear-gradient(135deg, #f8fafc, #ffffff)', borderRadius: '16px', padding: '16px', textAlign: 'center', border: '1px solid #e2e8f0' },
  vitalLabel: { fontSize: '12px', color: '#64748b', marginBottom: '4px' },
  vitalValue: { fontSize: '28px', fontWeight: 700, color: '#1e293b' },
  vitalUnit: { fontSize: '12px', fontWeight: 400, color: '#94a3b8' },
  statusCard: { borderRadius: '16px', padding: '16px', marginBottom: '16px' },
  statusNormal: { background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', borderLeft: '4px solid #22c55e' },
  statusWarning: { background: 'linear-gradient(135deg, #fff7ed, #ffedd5)', borderLeft: '4px solid #f97316' },
  statusHigh: { background: 'linear-gradient(135deg, #fef2f2, #fee2e2)', borderLeft: '4px solid #ef4444' },
  symptomBadge: { padding: '4px 12px', background: '#f1f5f9', borderRadius: '9999px', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '4px' },
  recommendationBox: { background: '#f8fafc', borderRadius: '16px', padding: '16px', marginTop: '16px', border: '1px solid #e2e8f0' },
  recommendationLabel: { fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#14b8a6', marginBottom: '8px' },
  recommendationText: { fontSize: '14px', color: '#334155', lineHeight: 1.5 },
  emptyState: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px', textAlign: 'center' },
  emptyIcon: { width: '96px', height: '96px', background: '#f1f5f9', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px', marginBottom: '16px' },
  emptyText: { color: '#94a3b8' },
  featuresGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginTop: '48px' },
  featureCard: { background: 'white', borderRadius: '20px', padding: '24px', textAlign: 'center', border: '1px solid #e2e8f0' },
  featureIcon: { width: '64px', height: '64px', background: 'linear-gradient(135deg, #e6f7f5, #ccf0ed)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '32px' },
  featureTitle: { fontSize: '18px', fontWeight: 600, color: '#1e293b', marginBottom: '8px' },
  featureText: { fontSize: '14px', color: '#64748b' },
  dashboardGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '32px' },
  statCard: { background: 'white', borderRadius: '20px', padding: '20px', border: '1px solid #e2e8f0' },
  statHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' },
  statIcon: { width: '48px', height: '48px', background: 'linear-gradient(135deg, #e6f7f5, #ccf0ed)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' },
  statBadge: { padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 600 },
  statBadgeGood: { background: '#d1fae5', color: '#065f46' },
  statBadgeNormal: { background: '#dbeafe', color: '#1e40af' },
  statName: { fontSize: '12px', color: '#64748b', marginBottom: '4px' },
  statValue: { fontSize: '28px', fontWeight: 700, color: '#1e293b' },
  recentList: { background: 'white', borderRadius: '20px', padding: '24px', border: '1px solid #e2e8f0' },
  recentTitle: { fontSize: '18px', fontWeight: 600, marginBottom: '20px', paddingBottom: '12px', borderBottom: '2px solid #e2e8f0' },
  recentItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid #f1f5f9' },
  recentDate: { fontWeight: 600, color: '#1e293b', fontSize: '14px' },
  recentSymptoms: { fontSize: '12px', color: '#64748b', marginTop: '4px' },
  recentTemp: { fontSize: '14px', color: '#475569' },
  recentResult: { fontSize: '12px', fontWeight: 600 },
};

// Navigation Styles
const navStyles = {
  navbar: { background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 50, borderBottom: '1px solid #e2e8f0' },
  content: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '70px', maxWidth: '1280px', margin: '0 auto', padding: '0 24px' },
  logo: { display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' },
  logoIcon: { width: '36px', height: '36px', background: 'linear-gradient(135deg, #14b8a6, #0d9488)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 'bold', color: 'white' },
  logoText: { fontSize: '24px', fontWeight: 'bold', color: '#1e293b' },
  links: { display: 'flex', gap: '8px' },
  link: { padding: '8px 16px', borderRadius: '10px', fontSize: '15px', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' },
  active: { background: '#e6f7f5', color: '#0d9488', fontWeight: 600 },
};

// Profile Styles
const profileStyles = {
  grid: { display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px' },
  card: { background: 'white', borderRadius: '24px', padding: '32px 24px', textAlign: 'center', border: '1px solid #e2e8f0' },
  avatar: { width: '120px', height: '120px', background: 'linear-gradient(135deg, #14b8a6, #0d9488)', borderRadius: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '40px', fontWeight: 'bold', color: 'white' },
  name: { fontSize: '24px', fontWeight: 700, color: '#1e293b', marginBottom: '4px' },
  email: { fontSize: '14px', color: '#64748b', marginBottom: '4px' },
  memberSince: { fontSize: '12px', color: '#94a3b8', marginBottom: '16px' },
  editButton: { width: '100%', padding: '10px 20px', background: '#f1f5f9', border: 'none', borderRadius: '12px', color: '#475569', fontSize: '14px', fontWeight: 500, cursor: 'pointer' },
  infoCard: { background: 'white', borderRadius: '24px', padding: '32px', border: '1px solid #e2e8f0' },
  infoTitle: { fontSize: '20px', fontWeight: 700, color: '#1e293b', marginBottom: '24px', paddingBottom: '12px', borderBottom: '2px solid #e2e8f0' },
  infoGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' },
  infoLabel: { fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#14b8a6', marginBottom: '4px' },
  infoValue: { fontSize: '16px', fontWeight: 500, color: '#1e293b' },
};

// Modal Styles
const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '24px',
    width: '90%',
    maxWidth: '550px',
    maxHeight: '85vh',
    overflow: 'auto',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 24px',
    borderBottom: '1px solid #e2e8f0',
  },
  title: { fontSize: '20px', fontWeight: 'bold', color: '#1e293b', margin: 0 },
  closeBtn: { background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#94a3b8', padding: '4px 8px' },
  body: { padding: '24px' },
  field: { marginBottom: '16px' },
  row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '0' },
  label: { display: 'block', fontSize: '14px', fontWeight: 500, color: '#334155', marginBottom: '6px' },
  input: { width: '100%', padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', boxSizing: 'border-box' },
  textarea: { resize: 'vertical', fontFamily: 'inherit' },
  footer: { display: 'flex', justifyContent: 'flex-end', gap: '12px', padding: '16px 24px', borderTop: '1px solid #e2e8f0' },
  cancelBtn: { padding: '10px 20px', background: '#f1f5f9', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: 500, color: '#475569', cursor: 'pointer' },
    saveBtn: { padding: '10px 24px', background: 'linear-gradient(135deg, #14b8a6, #0d9488)', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: 500, color: 'white', cursor: 'pointer' },
  };
  
  export default App;