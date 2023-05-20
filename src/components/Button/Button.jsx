import PropTypes from 'prop-types';
import css from './Button.module.css';
const Button = ({ onClick }) => {
  return (
    <button className={css.Button} onClick={onClick} type="button">
      Load more
    </button>
  );
};

export default Button;

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
