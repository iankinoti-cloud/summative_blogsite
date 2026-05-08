import { readFileSync } from 'fs';
import { join } from 'path';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const dbPath = join(process.cwd(), 'db.json');
  const db = JSON.parse(readFileSync(dbPath, 'utf8'));

  if (req.method === 'GET') {
    return res.status(200).json(db.projects);
  }

  if (req.method === 'POST') {
    const newProject = {
      ...req.body,
      id: Date.now().toString(),
    };
    return res.status(201).json(newProject);
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
