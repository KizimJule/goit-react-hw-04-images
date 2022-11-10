import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import * as SC from './Searchbar.styled';

export function Searchbar({ onSubmitForm }) {
  const [name, setName] = useState('');

  const handleSubmit = evt => {
    evt.preventDefault();
    if (name.trim() === '') {
      toast.error('Please, enter the word');
      return;
    }
    onSubmitForm(name);
    setName('');
  };

  const handleInputChange = evt => {
    const { value } = evt.currentTarget;
    setName(value.toLowerCase());
  };

  return (
    <SC.Searchbar>
      <SC.Form onSubmit={handleSubmit}>
        <SC.SearchFormButton type="submit">
          <SC.SearchFormButtonLabel>
            <BiSearch style={{ width: 30, height: 30 }} />
          </SC.SearchFormButtonLabel>
        </SC.SearchFormButton>

        <SC.SearchFormInput
          onChange={handleInputChange}
          className="input"
          type="text"
          name="name"
          value={name}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SC.Form>
    </SC.Searchbar>
  );
}

Searchbar.propTypes = {
  name: PropTypes.string,
  handleSubmit: PropTypes.func,
  handleInputChange: PropTypes.func,
};
