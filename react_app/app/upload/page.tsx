'use client';

import { useState } from 'react';
import axios from 'axios';
import './UploadPage.css'; // Import the CSS file
import NavBar from '../components/NavBar';


const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
     
        setFile(e.target.files[0]);
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }
    formData.append('description', description);
    try {
      await axios.post('http://localhost:5000/upload', formData);
      alert('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <header className="header">
        <h1>Upload Images</h1>
      </header>
      <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} required />
        <input type="text" value={description} onChange={handleDescriptionChange} placeholder="Description" required />
        <button type="submit" className="upload-button" >Upload</button >
      </form>
      </div>
    </div>
  );
};

export default Upload;
