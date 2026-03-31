// src/services/api.js
// src/services/api.js
// src/services/api.js
// Use an Environment Variable so you can easily change the API on GitHub
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const postHealthCheck = async (healthData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/check`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(healthData)
    });
    if (!response.ok) throw new Error("API Connection Failed");
    return await response.json();
  } catch (error) {
    console.error("Backend Error:", error);
    return { status: "error", message: "Connect backend to activate analysis." };
  }
};
export const getAppointments = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/appointments`);
  return response.json();
};
const [vitals, setVitals] = useState([]);

useEffect(() => {
  fetch('http://localhost:5000/api/vitals')
    .then(res => res.json())
    .then(data => setVitals(data));
}, []);