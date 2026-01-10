import "./SearchBar.css";

function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Buscar por hotel ou cidade..."
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default SearchBar;

