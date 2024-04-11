"use client";

import styles from "./page.module.css";
import WithSessionContext from "@/context/WithSessionContext";

// async function getData() {
//   // 1. Check if there is already a session. We store this in local storage. Could also be a Cookie.
//   // 2. If not, create a new session.
// }

export default function Home() {
  // const data = await getData();

  return (
    <WithSessionContext>
      <main className={styles.main}>
        <h1>Serverless test</h1>
      </main>
    </WithSessionContext>
  );
}
