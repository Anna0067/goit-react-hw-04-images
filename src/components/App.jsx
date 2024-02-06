import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Searchbar from './SearchBar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import styles from './styles.module.css';

const apiKey = '41180039-5593941cf655dc817cda9c37b';
const apiUrl = 'https://pixabay.com/api/';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${apiUrl}?q=${query}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`
        );

        if (response.data.hits.length === 0) {
          setHasMore(false);
        } else {
          setImages(prevImages => [...prevImages, ...response.data.hits]);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, page]);

  const handleSearch = searchQuery => {
    setQuery(searchQuery);
    setImages([]);
    setPage(1);
    setHasMore(true);
  };

  const loadMore = () => {
    if (hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const openModal = imageUrl => {
    setShowModal(true);
    setModalImage(imageUrl);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalImage('');
  };

  return (
    <div className={styles.App}>
      <Searchbar onSubmit={handleSearch} />
      <ImageGallery images={images} onImageClick={openModal} />
      {loading && <Loader />}
      {images.length > 0 && !loading && hasMore && (
        <Button onClick={loadMore} />
      )}
      {showModal && <Modal imageUrl={modalImage} onClose={closeModal} />}
    </div>
  );
};

export default App;
