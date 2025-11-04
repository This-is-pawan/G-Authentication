import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contextApi";
import { X, Clock, History } from "lucide-react";

const SearchHistory = () => {
  const { searchHistory, setSearchTheme, setSearchHistory,searchTheme } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  // ✅ Load saved history from localStorage when component mounts
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setSearchHistory(savedHistory);
  }, [setSearchHistory]);

  // ✅ Save history to localStorage when searchHistory changes
  useEffect(() => {
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }, [searchHistory]);

  // ✅ Helper function to clear all history
  const handleClearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem("searchHistory");
  };

  return (
    <>
      {/* 🔍 Open History Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-[10rem] right-4 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition z-50"
        title="Open Search History"
      >
        <History className="w-5 h-5" />
      </button>

      {/* 🧾 Sidebar History Panel */}
      <aside
        className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <Clock className="w-5 h-5" /> Recent Searches
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100%-60px)]">
          {searchHistory.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">
              No recent searches yet.
            </p>
          ) : (
            <>
              <ul className="space-y-2 mb-4">
                {searchHistory.map((term, index) => (
                  <li key={index}>
                    <button
                      onClick={() => {
                        setSearchTheme(term);
                        setIsOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 transition"
                    >
                      {term}
                    </button>
                  </li>
                ))}
              </ul>
              <button
                onClick={handleClearHistory}
                className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
              >
                Clear History
              </button>
            </>
          )}
        </div>
      </aside>

      {/* 🔲 Background Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default SearchHistory;
