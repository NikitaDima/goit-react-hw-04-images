import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';
const ImageGalleryItem = ({ webformatURL, onClick, tags }) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img src={webformatURL} alt={tags} onClick={onClick} />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
