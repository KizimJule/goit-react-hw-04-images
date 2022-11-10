import { useState, useEffect } from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

import { fetchPictures } from './FetchPictures/FetchPictures';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

export function App() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pictures, setPictures] = useState([]);
  // const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [totalImages, setTotalImages] = useState(0);

  const imgInfo = evt => {
    setLargeImageURL(evt);
  };

  const handleFormSubmit = newName => {
    if (newName === name) {
      toast.error('You enter the same word!!! Enter new one!!!', {
        theme: 'colored',
      });
    }
    setName(newName);
    setPage(1);
    setPictures([]);
  };

  useEffect(() => {
    if (!name) {
      return;
    }

    setLoading(true);
    fetchPictures(name, page)
      .then(({ data }) => {
        setPictures(prevPictures => [...prevPictures, ...data.hits]);
        setTotalImages(data.totalHits);
        if (data.totalHits === 0) {
          toast.error(`No images with name "${name}"`, {
            theme: 'colored',
          });
        }
      })
      .catch(error => {
        toast.error(`${error}`, {
          theme: 'colored',
        });
      })
      .finally(() => setLoading(false));
  }, [name, page]);

  const loadMoreImages = () => {
    setPage(prevPage => prevPage + 1);
  };

  const togleModal = () => {
    setShowModal(showModal => !showModal);
  };

  const restOfImages = totalImages - page * 12;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
        gap: 20,
        marginTop: 92,
      }}
    >
      <Searchbar onSubmitForm={handleFormSubmit} />

      {pictures.length <= 0 && !loading && <p>Введите название картинки</p>}

      {pictures.length > 0 && (
        <ImageGallery
          pictures={pictures}
          showModal={togleModal}
          imgInfo={imgInfo}
        />
      )}

      {loading && <Loader loading={loading} />}

      {pictures.length > 0 && restOfImages > 0 && (
        <Button title="Load more" onClick={loadMoreImages} />
      )}

      {showModal && (
        <Modal onClose={togleModal}>
          <img src={largeImageURL} alt="" />
        </Modal>
      )}

      <ToastContainer autoClose={3000} />
    </div>
  );
}
