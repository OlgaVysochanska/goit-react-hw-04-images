import { useState, useEffect } from 'react';
import { Audio } from 'react-loader-spinner';

import { searchImages } from 'services/API';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Modal } from 'components/Modal/Modal';
import { Button } from 'components/Button/Button';

export const App = () => {
  const [keyWord, setKeyWord] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImgURL, setLargeImgURL] = useState('');

  useEffect(() => {
    if (!keyWord) {
      return;
    }
    const fetchImages = async () => {
      try {
        setLoading(true);
        const data = await searchImages(keyWord, page);
        setImages(prevState => [...prevState, ...data.hits]);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [keyWord, page]);

  const onSubmitForm = data => {
    setKeyWord(data);
    setImages([]);
    setPage(1);
  };

  const onImageClick = data => {
    setLargeImgURL(data);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setLargeImgURL('');
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <>
      <Searchbar onSubmit={onSubmitForm} />

      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={onImageClick} />
      )}

      {images.length > 0 && !loading && <Button loadMore={loadMore} />}

      {loading && (
        <Audio
          height="80"
          width="80"
          radius="9"
          color="green"
          ariaLabel="loading"
          wrapperStyle=""
          wrapperClass=""
        />
      )}

      {showModal && (
        <Modal close={closeModal}>
          <img src={largeImgURL} alt="" />
        </Modal>
      )}
    </>
  );
};
