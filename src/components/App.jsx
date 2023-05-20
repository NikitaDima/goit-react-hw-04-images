import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastOptions, audioOptions } from 'serveses/utils';
import { Audio } from 'react-loader-spinner';
import { getImages } from '../serveses/api';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    hits: [],
    totalHits: 0,
    largeImageURL: '',
    loading: false,
  };

  componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;
    if (searchQuery !== prevState.searchQuery || prevState.page !== page) {
      this.setState({ loading: true });
      getImages(searchQuery, page)
        .then(({ hits: newHits, totalHits }) => {
          if (this.state.searchQuery.trim() === '' || totalHits === 0) {
            toast.error('Введіть валідне значення', toastOptions);
            return;
          }
          if (
            (prevState.hits.length !== 0 && newHits.length < 12) ||
            (prevState.hits.length === 0 && newHits.length === totalHits)
          ) {
            toast.info('Більше немає картинок', toastOptions);
          }
          this.setState(prevState => ({
            hits: [...prevState.hits, ...newHits],
            totalHits,
          }));
        })
        .catch(error => console.error(error.response))
        .finally(() => {
          this.setState({ loading: false });
        });
    }
  }

  handleFormSubmit = valueInput => {
    if (this.state.searchQuery === valueInput) {
      return;
    }
    this.setState({ searchQuery: valueInput, page: 1, hits: [], totalHits: 0 });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  toggleModal = (largeImageURL = '') => {
    this.setState({ largeImageURL: largeImageURL });
  };

  render() {
    const { largeImageURL, hits, loading, totalHits } = this.state;
    const showLoadMoreButton = !loading && hits.length !== totalHits;
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        <Searchbar onSubmit={this.handleFormSubmit} />
        {hits.length > 0 && (
          <ImageGallery images={hits} handleClick={this.toggleModal} />
        )}
        {showLoadMoreButton && (
          <Button onClick={this.handleLoadMore} disabled={loading} />
        )}
        {loading && <Audio {...audioOptions}></Audio>}
        {largeImageURL && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt="" />
          </Modal>
        )}
        <ToastContainer />
      </div>
    );
  }
}
