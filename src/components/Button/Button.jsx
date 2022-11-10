import React from 'react';
import PropTypes from 'prop-types';
import * as SC from './Button.styled';

export const Button = ({ title, onClick }) => (
  <SC.Button type="button" onClick={onClick}>
    {title}
  </SC.Button>
);

Button.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string,
};
