'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';


type ImageMetadata = {
    filename: string;
    description: string;
  };

const ImageList = () => {
  const [images, setImages] = useState<ImageMetadata[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const result = await axios.get('http://localhost:5000/images');
      setImages(result.data);
    };
    fetchImages();
  }, []);

  return (
    <div>
      {images.map((img, index) => (
        <div key={index}>
          <img src={`http://localhost:5000/uploads/${img.filename}`} alt={img.description} />
          <p>{img.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ImageList;
