import { useState, useEffect, useCallback } from 'react';

const API_URL = import.meta.env.VITE_API_URL || '/api/projects';

function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = useCallback(() => {
    setLoading(true);
    setError(null);
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch projects.');
        return res.json();
      })
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const addProject = useCallback((projectData) => {
    return fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectData),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to add project.');
        return res.json();
      })
      .then((newProject) => {
        setProjects((prev) => [...prev, newProject]);
        return newProject;
      });
  }, []);

  const deleteProject = useCallback((id) => {
    return fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to delete project.');
        setProjects((prev) => prev.filter((p) => p.id !== id));
      });
  }, []);

  return { projects, loading, error, addProject, deleteProject, refetch: fetchProjects };
}

export default useProjects;
