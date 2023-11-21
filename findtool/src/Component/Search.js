// SearchComponent.jsx

import './css/Search.css'

function SearchComponent({ onSearch }) {
    const handleSearch = (e) => {
      onSearch(e.target.value);
    };
  
    return (
      <div className="search-container">
        <input
          type="text"
          placeholder="검색어를 입력하세요..."
          onChange={handleSearch}
          className="search-input"
        />
      </div>
    );
}

export default SearchComponent;
