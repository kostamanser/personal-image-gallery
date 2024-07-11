// app/hello/page.tsx
'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

const Hello = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/hello')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error('There was an error fetching the message!', error);
      });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>{message}</h1>
    </main>
  );
};

export default Hello;
