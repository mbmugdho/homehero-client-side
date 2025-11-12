import React from 'react'

const SearchBar = ({ search, setSearch, sortOrder, setSortOrder }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
      <input
        type="text"
        placeholder="Search by title or category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="input input-bordered w-full sm:w-2/3 rounded-full bg-white/10 text-white placeholder-white/60 border-white/30"
      />

      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        className="input input-bordered w-full sm:w-1/3 rounded-full bg-white/10 text-white border-white/30"
      >
        <option value="desc">Rating: High → Low</option>
        <option value="asc">Rating: Low → High</option>
      </select>
    </div>
  )
}

export default SearchBar
