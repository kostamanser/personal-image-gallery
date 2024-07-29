// app/components/LoginForm.js
import { useState } from 'react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px', margin: '0 auto' }}>
      <label style={{ marginBottom: '0.5rem' }}>
        Email (not currently functional):
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0' }} />
      </label>
      <label style={{ marginBottom: '0.5rem' }}>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0' }} />
      </label>
      <button type="submit" style={{ padding: '0.5rem', background: '#333', color: '#fff', border: 'none', cursor: 'pointer' }}>Login</button>
    </form>
  );
};

export default LoginForm;
