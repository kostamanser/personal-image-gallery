// app/page.js
'use client';


import NavBar from './components/NavBar';
import LoginForm from './components/LoginForm';

const LandingPage = () => {
  return (
    <div>
      <NavBar />
      <main style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Welcome to The Image Gallery</h1>
        <LoginForm />
      </main>
    </div>
  );
};

export default LandingPage;
