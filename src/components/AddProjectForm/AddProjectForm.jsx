import { useState } from 'react';
import styles from './AddProjectForm.module.css';

const INITIAL_FORM = {
  title: '',
  description: '',
  techStack: '',
  imageUrl: '',
  liveUrl: '',
  githubUrl: '',
};

function AddProjectForm({ onAdd }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  }

  function validate() {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'Project title is required.';
    if (!form.description.trim()) newErrors.description = 'Description is required.';
    if (!form.techStack.trim()) newErrors.techStack = 'At least one technology is required.';
    if (form.liveUrl && !/^https?:\/\/.+/.test(form.liveUrl)) {
      newErrors.liveUrl = 'Live URL must start with http:// or https://';
    }
    if (form.githubUrl && !/^https?:\/\/.+/.test(form.githubUrl)) {
      newErrors.githubUrl = 'GitHub URL must start with http:// or https://';
    }
    if (form.imageUrl && !/^https?:\/\/.+/.test(form.imageUrl)) {
      newErrors.imageUrl = 'Image URL must start with http:// or https://';
    }
    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    setSuccessMessage('');

    const projectData = {
      title: form.title.trim(),
      description: form.description.trim(),
      techStack: form.techStack.split(',').map((t) => t.trim()).filter(Boolean),
      imageUrl: form.imageUrl.trim() || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
      liveUrl: form.liveUrl.trim(),
      githubUrl: form.githubUrl.trim(),
      dateAdded: new Date().toISOString().split('T')[0],
    };

    onAdd(projectData)
      .then(() => {
        setForm(INITIAL_FORM);
        setErrors({});
        setSuccessMessage('Project added successfully.');
        setTimeout(() => setSuccessMessage(''), 4000);
      })
      .catch(() => {
        setErrors({ form: 'Failed to add project. Make sure the server is running.' });
      })
      .finally(() => {
        setSubmitting(false);
      });
  }

  function handleReset() {
    setForm(INITIAL_FORM);
    setErrors({});
    setSuccessMessage('');
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {successMessage && (
        <div className={styles.successBanner} role="status">
          {successMessage}
        </div>
      )}
      {errors.form && (
        <div className={styles.errorBanner} role="alert">
          {errors.form}
        </div>
      )}

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="title" className={styles.label}>
            Project Title <span className={styles.required}>*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
            placeholder="e.g. E-Commerce Dashboard"
            value={form.title}
            onChange={handleChange}
          />
          {errors.title && <span className={styles.fieldError}>{errors.title}</span>}
        </div>
        <div className={styles.field}>
          <label htmlFor="techStack" className={styles.label}>
            Tech Stack <span className={styles.required}>*</span>
          </label>
          <input
            id="techStack"
            name="techStack"
            type="text"
            className={`${styles.input} ${errors.techStack ? styles.inputError : ''}`}
            placeholder="React, Node.js, PostgreSQL (comma-separated)"
            value={form.techStack}
            onChange={handleChange}
          />
          {errors.techStack && <span className={styles.fieldError}>{errors.techStack}</span>}
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="description" className={styles.label}>
          Description <span className={styles.required}>*</span>
        </label>
        <textarea
          id="description"
          name="description"
          className={`${styles.textarea} ${errors.description ? styles.inputError : ''}`}
          placeholder="Describe what the project does, the problem it solves, and your role in building it..."
          value={form.description}
          onChange={handleChange}
          rows={4}
        />
        {errors.description && <span className={styles.fieldError}>{errors.description}</span>}
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="liveUrl" className={styles.label}>
            Live URL
          </label>
          <input
            id="liveUrl"
            name="liveUrl"
            type="url"
            className={`${styles.input} ${errors.liveUrl ? styles.inputError : ''}`}
            placeholder="https://your-project.com"
            value={form.liveUrl}
            onChange={handleChange}
          />
          {errors.liveUrl && <span className={styles.fieldError}>{errors.liveUrl}</span>}
        </div>
        <div className={styles.field}>
          <label htmlFor="githubUrl" className={styles.label}>
            GitHub URL
          </label>
          <input
            id="githubUrl"
            name="githubUrl"
            type="url"
            className={`${styles.input} ${errors.githubUrl ? styles.inputError : ''}`}
            placeholder="https://github.com/you/project"
            value={form.githubUrl}
            onChange={handleChange}
          />
          {errors.githubUrl && <span className={styles.fieldError}>{errors.githubUrl}</span>}
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="imageUrl" className={styles.label}>
          Cover Image URL
        </label>
        <input
          id="imageUrl"
          name="imageUrl"
          type="url"
          className={`${styles.input} ${errors.imageUrl ? styles.inputError : ''}`}
          placeholder="https://images.unsplash.com/..."
          value={form.imageUrl}
          onChange={handleChange}
        />
        {errors.imageUrl && <span className={styles.fieldError}>{errors.imageUrl}</span>}
        <span className={styles.hint}>Leave blank to use a default image.</span>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.resetBtn}
          onClick={handleReset}
          disabled={submitting}
        >
          Clear Form
        </button>
        <button type="submit" className={styles.submitBtn} disabled={submitting}>
          {submitting ? 'Adding...' : 'Add Project'}
        </button>
      </div>
    </form>
  );
}

export default AddProjectForm;
