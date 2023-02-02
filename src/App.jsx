import { Component } from 'react';
import { Audio } from 'react-loader-spinner';

import { searchPosts } from 'services/API';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Modal } from 'components/Modal/Modal';
import { Button } from 'components/Button/Button';

export class App extends Component {
  state = {
    keyWord: '',
    images: [],
    page: 1,
    error: null,
    loading: false,
    showModal: false,
    largeImageURL: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { keyWord, page } = this.state;
    if (prevState.keyWord !== keyWord || prevState.page !== page) {
      this.fetchPosts();
    }
  }

  async fetchPosts() {
    try {
      this.setState({ loading: true });
      const { keyWord, page } = this.state;
      const data = await searchPosts(keyWord, page);
      this.setState(({ images }) => ({
        images: [...images, ...data.hits],
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  }

  onSubmitForm = data => {
    this.setState({ keyWord: data, images: [], page: 1 });
  };

  onImageClick = data => {
    this.setState({
      largeImageURL: data,
      showModal: true,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      largeImageURL: '',
    });
  };

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  render() {
    const { loading, images, largeImageURL, showModal } = this.state;
    const { onSubmitForm, onImageClick, closeModal, loadMore } = this;
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
            <img src={largeImageURL} alt="" />
          </Modal>
        )}
      </>
    );
  }
}
