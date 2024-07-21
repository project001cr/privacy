"use client";

import { useEffect, useState } from 'react';
import styles from '../styles/CaseList.module.css';
import { useRouter } from 'next/navigation';

const MyCases = () => {
  const [cases, setCases] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      setIsMounted(true);
      fetchCases(token);
    }
  }, [router]);

  const fetchCases = async (token) => {
    try {
      const res = await fetch('/api/my-cases', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();

      if (res.ok) {
        setCases(data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to fetch cases');
    }
  };

  if (!isMounted) return null;

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Cases</h1>
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

export default MyCases;
