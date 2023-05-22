import { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastOptions, audioOptions } from 'serveses/utils';
import { Audio } from 'react-loader-spinner';
import { getImages } from '../serveses/api';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [hits, setHits] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [loading, setLoading] = useState(false);
  const hitsLengthRef = useRef(hits.length);
  useEffect(() => {
    const newSearchQuery = setSearchQuery(prevSearchQuery => prevSearchQuery);
    const newPage = setPage(prevPage => prevPage);
    if (
      searchQuery !== '' &&
      (searchQuery !== newSearchQuery || newPage !== page)
    ) {
      setLoading(true);
      getImages(searchQuery, page)
        .then(({ hits: newHits, totalHits }) => {
          if (searchQuery.trim() === '' || totalHits === 0) {
            toast.error('Введіть валідне значення', toastOptions);
            return;
          }
          if (
            (hitsLengthRef.current !== 0 && newHits.length < 12) ||
            (hitsLengthRef.current === 0 && newHits.length === totalHits)
          ) {
            toast.info('Більше немає картинок', toastOptions);
          }
          setHits(prevHits => [...prevHits, ...newHits]);
          setTotalHits(totalHits);
        })
        .catch(error => console.error(error.response))
        .finally(() => {
          setLoading(false);
        });
    }
  }, [searchQuery, page]);

  useEffect(() => {
    hitsLengthRef.current = hits.length;
  }, [hits]);

  const handleFormSubmit = valueInput => {
    if (searchQuery === valueInput) {
      return;
    }
    setSearchQuery(valueInput);
    setPage(1);
    setHits([]);
    setTotalHits(0);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = (largeImageURL = '') => {
    setLargeImageURL(largeImageURL);
  };

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
      <Searchbar onSubmit={handleFormSubmit} />
      {hits.length > 0 && (
        <ImageGallery images={hits} handleClick={toggleModal} />
      )}
      {showLoadMoreButton && (
        <Button onClick={handleLoadMore} disabled={loading} />
      )}
      {loading && <Audio {...audioOptions}></Audio>}
      {largeImageURL && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt="" />
        </Modal>
      )}
      <ToastContainer />
    </div>
  );
}

// export class App extends Component {
//   state = {
//     searchQuery: '',
//     page: 1,
//     hits: [],
//     totalHits: 0,
//     largeImageURL: '',
//     loading: false,
//   };

// componentDidUpdate(_, prevState) {
//   const { searchQuery, page } = this.state;
//   if (searchQuery !== prevState.searchQuery || prevState.page !== page) {
//     this.setState({ loading: true });
//     getImages(searchQuery, page)
//       .then(({ hits: newHits, totalHits }) => {
//         if (this.state.searchQuery.trim() === '' || totalHits === 0) {
//           toast.error('Введіть валідне значення', toastOptions);
//           return;
//         }
//         if (
//           (prevState.hits.length !== 0 && newHits.length < 12) ||
//           (prevState.hits.length === 0 && newHits.length === totalHits)
//         ) {
//           toast.info('Більше немає картинок', toastOptions);
//         }
//         this.setState(prevState => ({
//           hits: [...prevState.hits, ...newHits],
//           totalHits,
//         }));
//       })
//       .catch(error => console.error(error.response))
//       .finally(() => {
//         this.setState({ loading: false });
//       });
//   }
// }

//   handleFormSubmit = valueInput => {
//     if (this.state.searchQuery === valueInput) {
//       return;
//     }
//     this.setState({ searchQuery: valueInput, page: 1, hits: [], totalHits: 0 });
//   };

//   handleLoadMore = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };

//   toggleModal = (largeImageURL = '') => {
//     this.setState({ largeImageURL: largeImageURL });
//   };

//   render() {
//     const { largeImageURL, hits, loading, totalHits } = this.state;
//     const showLoadMoreButton = !loading && hits.length !== totalHits;
//     return (
//       <div
//         style={{
//           display: 'grid',
//           gridTemplateColumns: '1fr',
//           gridGap: '16px',
//           paddingBottom: '24px',
//         }}
//       >
//         <Searchbar onSubmit={this.handleFormSubmit} />
//         {hits.length > 0 && (
//           <ImageGallery images={hits} handleClick={this.toggleModal} />
//         )}
//         {showLoadMoreButton && (
//           <Button onClick={this.handleLoadMore} disabled={loading} />
//         )}
//         {loading && <Audio {...audioOptions}></Audio>}
//         {largeImageURL && (
//           <Modal onClose={this.toggleModal}>
//             <img src={largeImageURL} alt="" />
//           </Modal>
//         )}
//         <ToastContainer />
//       </div>
//     );
//   }
// }
