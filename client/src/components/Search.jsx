import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import API from "./utils/api";
import { useSearchParams } from "react-router-dom";

const Search = ({ setBlogPosts }) => {
  const [query, setQuery] = useState("");
  // const [seachParams, setSearchParams] = useSearchParams();

  const handleSearch = async () => {
    try {
      const trimmedQuery = query.trim();
      if (!trimmedQuery) return;
      // setSearchParams({ search: trimmedQuery });
      const res = await API.get(`/blog/search/query?query=${query}`);
      setBlogPosts(res.data || []);
    } catch (error) {
      console.error("Error searching blogs", error);
    }
  };
  return (
    <div className="flex flex-col sm:flex-row gap-2 w-full max-w-xl mx-auto my-5 px-4">
      <Input
        type="text"
        placeholder="Search blogs..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1"
      />
      <Button onClick={handleSearch}>Search</Button>
    </div>
  );
};

export default Search;
