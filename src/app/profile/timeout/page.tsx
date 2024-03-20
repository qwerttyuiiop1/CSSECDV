"use client";
import styles from "../login.module.css";
import React from "react";
import {
  CardPage,
  Card,
  Title,
  CardRow,
} from "@/components/CardPage/CardPage";

export default function Page() {
  return (
    <CardPage>
      <Card>
        <Title className={styles.width}> Session Timeout </Title>
        <CardRow>
          <div className={styles.no_account}>
            Your session has timed out due to inactivity.
          </div>
        </CardRow>
      </Card>
    </CardPage>
  );
}
