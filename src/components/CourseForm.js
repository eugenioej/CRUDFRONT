// components/CourseForm.js

import React, { useState, useEffect } from "react";
import { createCourse, updateCourse } from "../services/api";

const CourseForm = ({ course, onSubmitSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    start_date: "",
    end_date: "",
    description: "",
    category: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (course) {
      setFormData({
        title: course.title || "",
        start_date: course.start_date || "",
        end_date: course.end_date || "",
        description: course.description || "",
        category: course.category || "",
      });
    }
  }, [course]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.start_date || !formData.end_date) {
      setError("Título, fecha de inicio y fecha de cierre son obligatorios");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      if (course) {
        await updateCourse(course.id, formData);
      } else {
        await createCourse(formData);
      }

      setFormData({
        title: "",
        start_date: "",
        end_date: "",
        description: "",
        category: "",
      });

      if (onSubmitSuccess) onSubmitSuccess();
    } catch (err) {
      setError("Error al guardar el curso");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border p-4 rounded shadow bg-white"
    >
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Título*
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          disabled={submitting}
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="start_date" className="form-label">
          Fecha de inicio*
        </label>
        <input
          type="date"
          id="start_date"
          name="start_date"
          value={formData.start_date}
          onChange={handleChange}
          disabled={submitting}
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="end_date" className="form-label">
          Fecha de cierre*
        </label>
        <input
          type="date"
          id="end_date"
          name="end_date"
          value={formData.end_date}
          onChange={handleChange}
          disabled={submitting}
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          disabled={submitting}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Categoría
        </label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          disabled={submitting}
          className="form-control"
        />
      </div>

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? "Guardando..." : course ? "Actualizar" : "Crear"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
            disabled={submitting}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default CourseForm;
