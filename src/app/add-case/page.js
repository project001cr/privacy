"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../styles/CaseForm.module.css';

const AddCase = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    requestUrl: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      setIsMounted(true);
    }
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const token = localStorage.getItem('token');

    try {
      const res = await fetch('/api/add-case', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({
          fullName: '',
          email: '',
          requestUrl: ''
        });
      } else {
        const errorData = await res.json();
        setError(errorData.error || 'Failed to submit case');
      }
    } catch (err) {
      setError('Failed to submit case');
    } finally {
      setLoading(false);
    }
  };

  if (!isMounted) return null;

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Add a New Case</h1>
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>Case submitted successfully!</p>}
        <form onSubmit={handleSubmit} className={styles.form}>
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
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCase;
