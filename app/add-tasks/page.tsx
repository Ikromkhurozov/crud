import React from "react";
import Link from "next/link";
import styles from "@/styles/TaskFormStyles.module.scss";
import CreateTask from "@/Components/Forms/CreateTask";
import { ArrowBackIcon } from "@/Components/Icons/Icons";

export default function page() {
  return (
    <div className={styles.container}>
      <CreateTask />
      <Link href={"/"}>
        {" "}
        <ArrowBackIcon />
        Back to home
      </Link>
    </div>
  );
}
