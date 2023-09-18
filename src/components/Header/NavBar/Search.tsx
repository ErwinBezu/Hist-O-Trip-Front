import React, { useContext } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { SearchInput } from '../../contexts';

const Search = () => {
  const { searchInput, setSearchInput } = useContext(SearchInput);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchInput(e.target.value);
  };

  console.log(searchInput);
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Rechercher un Lieu"
        name=""
        id=""
        value={searchInput}
        onChange={handleChange}
      />
      <span className="search-btn">
        <AiOutlineSearch />
      </span>
    </div>
  );
};

export default Search;
