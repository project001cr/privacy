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
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Send email with form data
      const emailRes = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          to: 'project001.cr@gmail.com', // Replace with the recipient's email
          subject: 'New Case Submitted',
          text: `A new case has been submitted:\n\nUser ID: ${formData.userId}\nFull Name: ${formData.fullName}\nEmail: ${formData.email}\nRequest URL: ${formData.requestUrl}`
        })
      });

      if (!emailRes.ok) {
        throw new Error('Failed to send email');
      }

      // Submit case to the database
      const res = await fetch('/api/cases', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({
          userId: '',
          fullName: '',
          email: '',
          requestUrl: ''
        });
      } else {
        const errorData = await res.json();
        setError(errorData.error || 'Failed to submit case');
      }
    } catch (err) {
      setError(err.message || 'Failed to submit case');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Add a New Case</h1>
      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>Case submitted and email sent successfully!</p>}
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
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default CaseForm;
