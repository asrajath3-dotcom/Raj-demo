import { useState } from 'react';

export default function Login() {
  return (
    <div className="card" style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h1>VitalEase Login</h1>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" style={{ width: '100%', padding: '12px', margin: '8px 0', borderRadius: '8px', border: '1px solid #fed7aa'}} />
      
      <div style={{ margin: '15px 0' }}>
        <input type="checkbox" id="notify" />
        <label htmlFor="notify" style={{ marginLeft: '10px', fontSize: '0.9rem' }}>
          Sign up for health notifications
        </label>
      </div>
      
      <button style={{ width: '100%' }}>Secure Log In</button>
    </div>
  );
}