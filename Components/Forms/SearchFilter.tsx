import React, { useState } from "react";

import { SearchInputProps } from "@/helpers/declarations";

import styles from "./FormStyles.module.scss";

const SearchInput: React.FC<SearchInputProps> = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <input
      type="text"
      id="search"
      name="search"
      className={styles["search-input"]}
      value={searchTerm}
      onChange={handleChange}
      placeholder="Search by task status..."
    />
  );
};

export default SearchInput;
