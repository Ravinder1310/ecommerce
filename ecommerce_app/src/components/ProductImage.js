import React, { useState } from 'react';
import ReactImageMagnify from 'react-image-magnify';
import "./images.css"



const ProductImages = ({product}) => {

  const images = [
    { name: `${product.photo1}`, vw: '355w' },
    { name: `${product.photo2}`, vw: '481w' },
    { name: `${product.photo3}`, vw: '584w' },
    { name: `${product.photo4}`, vw: '687w' },
    { name: `${product.photo5}`, vw: '770w' },
  ];


  const [selectedImage, setSelectedImage] = useState(images[0].name);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const srcSet = images.map((image) => {
    return `${image.name} ${image.vw}`;
  }).join(', ');

  return (
    <div className="product-images">
     
      <div className="thumbnails">
        {images.map((image, index) => (
          <div
            key={index}
            className={`thumbnail ${selectedImage.name === image.name ? 'active' : ''}`}
            onMouseEnter={() => handleImageClick(image)}
          >
            <img src={image.name} alt={`Thumbnail ${index}`}/>
          </div>
        ))}
      </div>
      <div className="main-image">
        <ReactImageMagnify
          smallImage={{
            alt: 'Wristwatch by Ted Baker London',
            isFluidWidth: true,
            src: selectedImage.name,
            sizes: '(min-width: 800px) 33.5vw, (min-width: 415px) 50vw, 100vw',
          }}
          largeImage={{
            alt: '',
            src: selectedImage.name,
            width: 3500,
            height: 2000,
          }}
          isHintEnabled={true}
        />
      </div>
    </div>
  );
};

export default ProductImages;