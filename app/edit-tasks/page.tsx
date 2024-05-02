"use client";
import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

const EditUser = dynamic(() => import("@/Components/Forms/EditTask"));

import { ArrowBackIcon } from "@/Components/Icons/Icons";

import styles from "@/styles/TaskFormStyles.module.scss";

export default function page() {
  return (
    <div className={styles.container}>
      <EditUser />
      <Link href={"/"}>
        {" "}
        <ArrowBackIcon />
        Back to home
      </Link>
    </div>
  );
}
