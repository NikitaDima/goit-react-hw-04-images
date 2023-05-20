import axios from 'axios';

const KEY = '34385068-e7eac96c0a178113f872a4524';
axios.defaults.baseURL = 'https://pixabay.com/api';

export const getImages = async (searchQuery, page) => {
  const params = {
    key: KEY,
    q: searchQuery,
    page: page,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  };

  const response = await axios.get('/', { params });
  return response.data;
};
