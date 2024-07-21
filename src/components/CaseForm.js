import { useState } from 'react';

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
    <form onSubmit={handleSubmit}>
      <h1>Add a New Case</h1>
      <div>
        <label>User ID:</label>
        <input
          type="text"
          name="userId"
          value={formData.userId}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Full Name:</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Request URL:</label>
        <input
          type="url"
          name="requestUrl"
          value={formData.requestUrl}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CaseForm;
