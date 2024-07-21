"use client";

import { useState } from 'react';
import styles from './CaseForm.module.css';

const CaseForm = () => {
  const [formData, setFormData] = useState({
    userId: '',
    fullName: '',
    email: '',
    requestUrl: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/cases', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      alert('Case added successfully!');
      setFormData({
        userId: '',
        fullName: '',
        email: '',
        requestUrl: ''
      });
    } else {
      alert('Failed to add case');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Add a New Case</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label className={styles.label}>User ID:</label>
          <input
            type="text"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div>
          <label className={styles.label}>Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div>
          <label className={styles.label}>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div>
          <label className={styles.label}>Request URL:</label>
          <input
            type="url"
            name="requestUrl"
            value={formData.requestUrl}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.button}>Submit</button>
      </form>
    </div>
  );
};

export default CaseForm;
