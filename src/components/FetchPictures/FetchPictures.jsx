import axios from 'axios';
import PropTypes from 'prop-types';

export const fetchPictures = (name, page = 1) => {
  const apiUrl = 'https://pixabay.com/api/';
  const apiKey = '30025570-88047e109e19df2adec6469b3';

  return axios.get(
    `${apiUrl}/?key=${apiKey}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`
  );
};
fetchPictures.propTypes = {
  name: PropTypes.string,
  page: PropTypes.number,
};
