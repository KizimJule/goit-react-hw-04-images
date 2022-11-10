import React, { Component } from 'react';
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

export class App extends Component {
  state = {
    name: '',
    loading: false,
    page: 1,
    perPage: 12,
    pictures: [],
    error: null,
    showModal: false,
    largeImageURL: '',
    alt: '',
    totalImages: 0,
  };

  imgInfo = evt => {
    this.setState({
      largeImageURL: evt,
    });
  };

  handleFormSubmit = name => {
    if (this.state.name === name) {
      toast.error('You enter the same word!!! Enter new one!!!', {
        theme: 'colored',
      });
    }
    this.setState({
      name,
      page: 1,
      pictures: [],
    });
  };

  async searchArticles() {
    const { name, page } = this.state;
    this.setState({ loading: true });

    try {
      const { data } = await fetchPictures(name, page);
      this.setState({
        pictures: [...this.state.pictures, ...data.hits],
        totalImages: data.totalHits,
      });

      if (data.totalHits === 0) {
        toast.error(`No images with name "${this.state.name}"`, {
          theme: 'colored',
        });
      }
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ loading: false });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { name, page } = this.state;

    if (prevState.name === name && prevState.page === page) {
      return;
    }
    this.searchArticles();
  }

  loadMoreImages = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  togleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { pictures, loading, showModal, largeImageURL, totalImages, page } =
      this.state;

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
        <Searchbar onSubmitForm={this.handleFormSubmit} />

        {pictures.length <= 0 && !loading && <p>Введите название картинки</p>}

        {pictures.length > 0 && (
          <ImageGallery
            pictures={pictures}
            showModal={this.togleModal}
            imgInfo={this.imgInfo}
          />
        )}

        {loading && <Loader loading={loading} />}

        {pictures.length > 0 && restOfImages > 0 && (
          <Button title="Load more" onClick={this.loadMoreImages} />
        )}

        {showModal && (
          <Modal onClose={this.togleModal}>
            <img src={largeImageURL} alt="" />
          </Modal>
        )}

        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
