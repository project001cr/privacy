"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../styles/ControlPanel.module.css';

const ControlPanel = () => {
  const [selectedPage, setSelectedPage] = useState('/my-cases');
  const router = useRouter();

  const handleMenuClick = (page) => {
    setSelectedPage(page);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      localStorage.removeItem('token');
      router.push('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <button onClick={() => handleMenuClick('/my-cases')} className={styles.menuItem}>My Cases</button>
        <button onClick={() => handleMenuClick('/add-case')} className={styles.menuItem}>Add Case</button>
        <button onClick={handleLogout} className={styles.logoutButton}>Log Out</button>
      </aside>
      <main className={styles.content}>
        <iframe
          src={selectedPage}
          className={styles.iframe}
          title="Content Frame"
        ></iframe>
      </main>
    </div>
  );
};

export default ControlPanel;
