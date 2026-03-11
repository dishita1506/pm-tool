import { useState } from "react";

const SearchFilter = ({ onFilterChange }) => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const handleChange = () => {
    onFilterChange({ search, status });
  };

  return (
    <div className="flex gap-4 mb-8">
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyUp={handleChange}
        className="flex-1 border px-6 py-4 rounded-2xl"
      />
      <select
        value={status}
        onChange={(e) => {
          setStatus(e.target.value);
          handleChange();
        }}
        className="border px-6 py-4 rounded-2xl"
      >
        <option value="">All Status</option>
        <option value="Todo">To Do</option>
        <option value="InProgress">In Progress</option>
        <option value="Done">Done</option>
      </select>
    </div>
  );
};

export default SearchFilter;
