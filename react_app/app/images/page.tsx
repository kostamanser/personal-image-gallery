'use client';

import { SetStateAction, useEffect, useState } from 'react';
import axios from 'axios';
import './ImageList.css'; // Import the CSS file
import NavBar from '../components/NavBar';


type ImageMetadata = {
    filename: string;
    description: string;
  };

const ImageList = () => {
  const [images, setImages] = useState<ImageMetadata[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 5;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await axios.get('http://localhost:5000/images');
        setImages(result.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };
    fetchImages();
  }, []);

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);

  const paginate = (pageNumber: SetStateAction<number>) => setCurrentPage(pageNumber);

  return (
    <div>
    <div>
      <NavBar />
      {/* <header className="header">
        <h1>Image Gallery</h1>
      </header> */}
    </div>
      <div className="image-grid">
        {currentImages.map((img, index) => (
          <div key={index} className="image-frame">
            <img src={`http://localhost:5000/uploads/${img.filename}`} alt={img.description} className="image" />
            <p className="description">&quot;{img.description}&quot;</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: Math.ceil(images.length / imagesPerPage) }, (_, i) => (
          <button key={i} onClick={() => paginate(i + 1)} className="page-button">
            {i + 1}
          </button>
        ))}
      </div>
      </div>
  );
};

export default ImageList;
