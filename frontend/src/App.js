import React, { useEffect, useState } from 'react';
import axios from 'axios';

// This component handles the user interface and logic for the portal
export default function App() {
  // State to hold the list of job openings
  const [jobs, setJobs] = useState([]);
  // State for the new job post form
  const [form, setForm] = useState({ title: '', company: '', location: '', skills: '' });

  // Load real listings (data from the Node.js backend) on component mount
  useEffect(() => {
    // Access thousands of openings from the API
    axios.get('http://localhost:5000/api/jobs')
      .then(res => setJobs(res.data))
      .catch((error) => console.error("Error fetching jobs:", error));
  }, []);

  // Function to submit a new job posting
  const submit = async (e) => {
    e.preventDefault();
    // Prepare the payload (skills are comma-separated in the input, must be an array for the backend)
    const payload = { ...form, skills: form.skills.split(',').map(s => s.trim()) };

    try {
      // Send the job posting allows employers to easily share opportunities online. [cite: 28]
      const res = await axios.post('http://localhost:5000/api/jobs', payload);
      // Update the list of jobs with the new posting
      setJobs(prev => [...prev, res.data]);
      // Reset the form after successful post
      setForm({ title: '', company: '', location: '', skills: '' });
    } catch (error) {
      console.error("Error posting job:", error);
    }
  };

  return (
    <div style={{ background: '#0f1724', color: '#e6eef8', minHeight: '100vh', padding: 20, fontFamily: 'Arial' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1f2937', paddingBottom: 10 }}>
        <h1>ONYX Online Job Portal</h1>
        <div>Presented by: Aditya, Dharmendre, Utkarsh [cite: 4, 5, 6]</div>
      </header>

      <main style={{ marginTop: 20 }}>
        {/* Job Posting Section: Key Feature 01 [cite: 27] */}
        <section style={{ marginBottom: 40, background: '#111827', padding: 20, borderRadius: 8 }}>
          <h2>Post a Job (Job Posting)</h2>
          <p>Employers can easily share opportunities online[cite: 28].</p>
          <form onSubmit={submit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 15 }}>
            <input required placeholder='Job Title' value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} style={{ padding: 10, borderRadius: 4, border: 'none' }} />
            <input required placeholder='Company Name' value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} style={{ padding: 10, borderRadius: 4, border: 'none' }} />
            <input placeholder='Location (e.g., Remote, Noida)' value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} style={{ padding: 10, borderRadius: 4, border: 'none' }} />
            <input placeholder='Skills (e.g., Node.js, React, MongoDB)' value={form.skills} onChange={e => setForm({ ...form, skills: e.target.value })} style={{ padding: 10, borderRadius: 4, border: 'none' }} />
            <button type='submit' style={{ gridColumn: '1 / -1', padding: 12, background: '#1c90f3', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>Share Opportunity</button>
          </form>
        </section>

        {/* Job Openings Section: Fast search & real listings [cite: 8] */}
        <section>
          <h2>Job Openings (Advanced Search & Filters) [cite: 32]</h2>
          <p>Find relevant jobs quickly[cite: 33].</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 15, marginTop: 15 }}>
            {jobs.map(j => (
              <div key={j.id} style={{ padding: 15, background: '#071025', borderRadius: 8, border: '1px solid #1f2937' }}>
                <h3>{j.title}</h3>
                <div>**{j.company}** • {j.location}</div>
                <div style={{ marginTop: 10, fontSize: '0.9em', color: '#ccc' }}>Skills: {j.skills?.join(', ')}</div>
                <button style={{ marginTop: 10, padding: '8px 15px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>Apply (Resume Upload) [cite: 30]</button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
