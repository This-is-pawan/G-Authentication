import React, { useContext } from 'react';
import { AuthContext } from '../contextApi';

const SearchForm = () => {
  const { setSearchTheme,addToHistory,searchTheme } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchValue = e.target.elements.search.value.trim();
    if (!searchValue) return;
    setSearchTheme(searchValue);
    // console.log(searchValue);
  };

  return (
    <section className="flex flex-col items-center justify-center text-center py-10 px-4">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Unsplash Images
      </h1>

      <form
        className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="search"
          placeholder="Search images (e.g. dog)"
          className="w-full sm:flex-1 px-4 py-2 border border-gray-300 text-black dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-200"
        >
          Search
        </button>
      </form>
    </section>
  );
};

export default SearchForm;
