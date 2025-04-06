// components/CourseList.js

import React, { useState, useEffect } from "react";
import { getCourses, deleteCourse } from "../services/api";
import CourseItem from "./CourseItem";
import CourseForm from "./CourseForm";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const data = await getCourses();
      setCourses(data);
      setError(null);
    } catch (err) {
      setError("Error al cargar los cursos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este curso?")) {
      try {
        await deleteCourse(id);
        setCourses(courses.filter((course) => course.id !== id));
      } catch (err) {
        setError("Error al eliminar el curso");
      }
    }
  };

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleFormSubmit = () => {
    fetchCourses();
    setEditingId(null);
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">Lista de Cursos</h2>

      {!editingId && (
        <div className="mb-5">
          <h4 className="mb-3">Agregar Nuevo Curso</h4>
          <CourseForm onSubmitSuccess={handleFormSubmit} />
        </div>
      )}

      {loading && <div className="alert alert-info">Cargando cursos...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        {courses.length === 0 ? (
          <p>No hay cursos registrados.</p>
        ) : (
          courses.map((course) => (
            <div className="col-md-6 mb-4" key={course.id}>
              {editingId === course.id ? (
                <div className="card p-3">
                  <h4 className="mb-3">Editar Curso</h4>
                  <CourseForm
                    course={course}
                    onSubmitSuccess={handleFormSubmit}
                    onCancel={handleCancelEdit}
                  />
                </div>
              ) : (
                <CourseItem
                  course={course}
                  onDelete={() => handleDelete(course.id)}
                  onEdit={() => handleEdit(course.id)}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CourseList;
