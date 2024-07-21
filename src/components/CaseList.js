import { useEffect, useState } from 'react';

const CaseList = () => {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    const fetchCases = async () => {
      const res = await fetch('/api/cases');
      const data = await res.json();
      setCases(data);
    };

    fetchCases();
  }, []);

  return (
    <div>
      <h1>User Cases</h1>
      <ul>
        {cases.map((caseItem) => (
          <li key={caseItem.id}>
            <p>ID: {caseItem.id}</p>
            <p>User ID: {caseItem.user_id}</p>
            <p>Full Name: {caseItem.full_name}</p>
            <p>Email: {caseItem.email}</p>
            <p>Request URL: {caseItem.request_url}</p>
            <p>Status: {caseItem.status}</p>
            <p>Case Number: {caseItem.case_number}</p>
            <p>Submitted At: {caseItem.submitted_at}</p>
            <p>Updated At: {caseItem.updated_at}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CaseList;
