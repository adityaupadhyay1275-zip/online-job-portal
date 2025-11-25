const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

// In-memory jobs store: Replace with MySQL/MongoDB for reliable data storage 
let jobs = [
  { id: 1, title: 'Web Developer', company: 'Tech Solutions', location: 'Remote', skills: ['HTML', 'CSS', 'JS', 'React'] },
  { id: 2, title: 'Data Scientist', company: 'DataCorp', location: 'Noida', skills: ['Python', 'Machine Learning', 'SQL'] }
];

// API Routes (Part of the Architecture Overview [cite: 23])

// Get all jobs (Fast search, real listings [cite: 8])
app.get('/api/jobs', (req, res) => {
  res.json(jobs);
});

// Post a new job (Job posting key feature [cite: 28])
app.post('/api/jobs', (req, res) => {
  const job = { id: jobs.length + 1, ...req.body };
  jobs.push(job);
  res.status(201).json(job);
});

// System Health Check (API [cite: 22] status)
app.get('/api/health', (req, res) => res.json({ status: 'API is running' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}. Ready for automated matching, user logins, and scalable coding architecture[cite: 12].`));
