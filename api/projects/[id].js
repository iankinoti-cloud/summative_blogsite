import { readFileSync } from 'fs';
import { join } from 'path';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id } = req.query;
  const dbPath = join(process.cwd(), 'db.json');
  const db = JSON.parse(readFileSync(dbPath, 'utf8'));

  if (req.method === 'GET') {
    const project = db.projects.find((p) => p.id === id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }
    return res.status(200).json(project);
  }

  if (req.method === 'DELETE') {
    return res.status(200).json({ id, deleted: true });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
