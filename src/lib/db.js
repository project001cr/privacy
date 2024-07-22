const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

const query = async (text, params) => {
  try {
    const result = await pool.query(text, params); // Ensure the query is awaited
    return result;
  } catch (error) {
    console.error('Error making query:', text, params, error);
    throw error;
  }
};

const get_user_id = async (useremail) => {
  const res = await query('SELECT id FROM users WHERE email = $1;', [useremail]);
  if (res.rows.length === 0) {
    throw new Error('User not found');
  }
  return res.rows[0].id;
};

const update_case_num = async (userid, url, casenum) => {
  await query('UPDATE cases SET case_number = $1, status = $2 WHERE user_id = $3 AND request_url = $4;', [casenum, 'active', userid, url]);
};

module.exports = {
  get_user_id,
  update_case_num,
};
