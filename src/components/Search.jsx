function Search({ onSearch }) {
  return (
    <div className="d-inline-flex justify-content-center align-items-center w-100 p-4">
      <div className="input-group mb-2 w-50">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">
            Search
          </span>
        </div>
        <input
          type="text"
          className="form-control search-bar"
          placeholder="write here & find your beer"
          onChange={(e) => onSearch(e.target.value)} // callback function passed from AllBeersPage and activated when the user writes-input
          // it captures the event(e) and obtains the input value (what the user writes)
        />
      </div>
    </div>
  );
}

export default Search;
