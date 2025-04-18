"use client";

import { Search } from "lucide-react";
import { useState } from "react";

type Props = {
  onSearch: (keyword: string) => void;
};

export default function SearchInput({ onSearch }: Props) {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    onSearch(val);
  };

  return (
    <div className="max-w-2xl mx-auto relative">
      <input
        type="text"
        placeholder="Cari berita..."
        value={query}
        onChange={handleChange}
        className="w-full p-4 pl-12 rounded-full border border-gray-200  dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-900"
      />
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
    </div>
  );
}
