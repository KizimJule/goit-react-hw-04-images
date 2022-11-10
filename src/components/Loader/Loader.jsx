import React from 'react';
import PropTypes from 'prop-types';
import { ThreeDots } from 'react-loader-spinner';

export const Loader = ({ loading }) => (
  <div>
    <ThreeDots
      height="80"
      width="80"
      radius="9"
      color="blue"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClassName=""
      visible={loading}
    />
  </div>
);
Loader.propTypes = {
  loading: PropTypes.bool,
};
