"use client";

import { useEffect, useState } from 'react';
import styles from './CaseList.module.css';

const CaseList = () => {
  const [cases, setCases] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const res = await fetch('/api/cases');
        const data = await res.json();

        if (!Array.isArray(data)) {
          throw new Error("Response data is not an array");
        }

        setCases(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCases();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>User Cases</h1>
      <ul className={styles.list}>
        {cases.map((caseItem) => (
          <li key={caseItem.id} className={styles.item}>
            <div className={styles.field}>
              <span className={styles.label}>ID:</span>
              <span className={styles.value}>{caseItem.id}</span>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>User ID:</span>
              <span className={styles.value}>{caseItem.user_id}</span>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>Full Name:</span>
              <span className={styles.value}>{caseItem.full_name}</span>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>Email:</span>
              <span className={styles.value}>{caseItem.email}</span>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>Request URL:</span>
              <span className={styles.value}>{caseItem.request_url}</span>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>Status:</span>
              <span className={styles.value}>{caseItem.status}</span>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>Case Number:</span>
              <span className={styles.value}>{caseItem.case_number}</span>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>Submitted At:</span>
              <span className={styles.value}>{caseItem.submitted_at}</span>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>Updated At:</span>
              <span className={styles.value}>{caseItem.updated_at}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CaseList;
