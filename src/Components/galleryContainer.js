import React, {useState} from 'react';
import '../CSS/galleryContainer.css';
import Modal from 'react-modal';
import { FaChevronLeft, FaChevronRight, FaTimes} from 'react-icons/fa';
import Image12 from  "../Assets/Images/Image12.jpg";
import Image13 from  "../Assets/Images/Image13.jpg";
import Image14 from  "../Assets/Images/Image14.jpg";
import Image15 from  "../Assets/Images/Image15.jpg";
import Image16 from  "../Assets/Images/Image16.jpg";
import Image17 from  "../Assets/Images/Image17.jpg";

const GalleryContainer = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);

  const imageUrls = [
    Image12,
    Image13,
    Image14,
    Image15,
    Image16,
    Image17
  ];

  const handleImageClick = (imageUrl, imageAlt) => {
    setSelectedImage({ url: imageUrl, alt: imageAlt });
  };

  const handleNextImage = () => {
    const newIndex = (imageIndex + 1) % imageUrls.length;
    setSelectedImage({ url: imageUrls[newIndex], alt: `Gallery ${newIndex + 1}` });
    setImageIndex(newIndex);
  };

  const handlePreviousImage = () => {
    const newIndex = (imageIndex - 1 + imageUrls.length) % imageUrls.length;
    setSelectedImage({ url: imageUrls[newIndex], alt: `Gallery ${newIndex + 1}` });
    setImageIndex(newIndex);
  };

  const handleCancelImage = () => {
    setSelectedImage(null);
  };

  return (
    <div className="gallery-container">
      <h2 className="heading3">Gallery</h2>
      <p className="description">Some of the photos from the events</p>
      <div className="gallery-grid">
        <div className="gallery-item" onClick={() => handleImageClick(Image12, "Gallery 1")}>
          <img src = {Image12} alt="Gallery 1" />
        </div>
        <div className="gallery-item" onClick={() => handleImageClick(Image13, "Gallery 2")}>
          <img src = {Image13} alt="Gallery 2" />
        </div>
        <div className="gallery-item" onClick={() => handleImageClick(Image14, "Gallery 3")}>
          <img src = {Image14} alt="Gallery 3" />
        </div>
        <div className="gallery-item" onClick={() => handleImageClick(Image15, "Gallery 4")}>
          <img src = {Image15} alt="Gallery 4" />
        </div>
        <div className="gallery-item" onClick={() => handleImageClick(Image16, "Gallery 5")}>
          <img src = {Image16} alt="Gallery 5" />
        </div>
        <div className="gallery-item" onClick={() => handleImageClick(Image17, "Gallery 6")}>
          <img src = {Image17} alt="Gallery 6" />
        </div>
      </div>

      <Modal
        className="modal"
        isOpen={selectedImage !== null}
        onRequestClose={handleCancelImage}
        contentLabel="Selected Image"
      >
        {selectedImage && (
          <div>
            <img className="modal-image" src={selectedImage.url} alt={selectedImage.alt} />
            <button className="previous-button" onClick={handlePreviousImage}>
              <FaChevronLeft/>
            </button>
            <button className="next-button" onClick={handleNextImage}>
             <FaChevronRight/>
            </button>
            <button className="cancel-button" onClick={handleCancelImage}>
              <FaTimes/>
            </button>
          </div>
        )}
      </Modal>

    </div>
  );
};

export default GalleryContainer;