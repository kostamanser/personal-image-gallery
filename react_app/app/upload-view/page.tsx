'use client'; // This is a client component 

// app/upload-view/page.tsx
import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';

const UploadViewPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [images, setImages] = useState<string[]>([]);

  // Handle file selection
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append('file', selectedFile);
    try {
      await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('File uploaded successfully!');
      fetchImages(); // Fetch images after upload
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  // Fetch images from the server
  const fetchImages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/images');
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  // Use useEffect to fetch images on component mount
  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div>
      <h1>Upload and View Images</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <div>
        {images.map((image, index) => (
          <img key={index} src={`http://localhost:5000/images/${image}`} alt={image} />
        ))}
      </div>
    </div>
  );
}

export default UploadViewPage;
