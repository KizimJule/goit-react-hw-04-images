import React from 'react';
import * as SC from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({
  id,
  webformatURL,
  tags,
  largeImageURL,
  showModal,
  imgInfo,
}) => (
  <SC.GalleryItem key={id} onClick={showModal}>
    <SC.GalleryItemImage
      src={webformatURL}
      alt={tags}
      dataLargeimageurl={largeImageURL}
      onClick={() => {
        imgInfo(largeImageURL);
      }}
    />
  </SC.GalleryItem>
);
ImageGalleryItem.propTypes = {
  id: PropTypes.number,
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  tags: PropTypes.string,
  showModal: PropTypes.func,
};
