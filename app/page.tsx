"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const CustomTable = dynamic(() => import("@/Components/Forms/CustomTable"));

import { AddUserIcon } from "@/Components/Icons/Icons";

import styles from "../styles/HomeStyles.module.scss";

export default function Home() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchTerm(value);
  };

  return (
    <div className={styles.container}>
      <section>
        <input
          type="text"
          id="search"
          name="search"
          className={styles["search-input"]}
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search..."
        />

        <button onClick={() => router.push("/add-tasks")}>
          Add user <AddUserIcon />
        </button>
      </section>

      <CustomTable filteredValue={searchTerm} />
    </div>
  );
}
