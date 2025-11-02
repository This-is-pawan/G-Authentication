import React, { useContext } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../contextApi";
import SearchForm from "./SearchForm";
import SearchHistory from "./SearchHistory";

const UNSPLASH_URL =
  "https://api.unsplash.com/search/photos?client_id=7pmB29Xi9rOWHhYpvtuc4edchzh1w0eawUjJwNAqngA";

const Dashboard = () => {
  const { searchTheme } = useContext(AuthContext);

const { data, isLoading, isError } = useQuery({
  queryKey: ["images", searchTheme],
  queryFn: async () => {
    const result = await axios.get(`${UNSPLASH_URL}&query=${searchTheme}`, {
      withCredentials: false, // ✅ disable cookies for Unsplash
    });
    return result.data;
  },
});


  // ⏳ Loading state — circular spinner
  if (isLoading) {
    return (
      <section className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
      </section>
    );
  }

  // ❌ Error state
  if (isError) {
    return (
      <section className="flex justify-center items-center h-screen">
        <h3 className="text-lg font-semibold text-red-600">
          ‼️ There was an error loading images.
        </h3>
      </section>
    );
  }

  const results = data?.results || [];

  // 🕵️ No results found
  if (results.length < 1) {
    return (
      <section className="flex justify-center items-center h-screen">
        <h3 className="text-lg font-semibold text-gray-600">
          No results found...
        </h3>
      </section>
    );
  }

  // ✅ Display images
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Dashboard</h1>
      <SearchForm/>
       <SearchHistory />
      <section className="grid gap-4 
  grid-cols-1          
  sm:grid-cols-3        
  md:grid-cols-4        
  lg:grid-cols-5         
  xl:grid-cols-6        
  p-4 place-items-center">
        {results.map((item) => (
          <img
            src={item?.urls?.regular}
            key={item.id}
            alt={item.alt_description || "Image"}
            className="rounded-xl shadow-md hover:scale-105 transition-transform duration-300 w-64 h-64"
          />
        ))}
      </section>
    </div>
  );
};

export default Dashboard;
