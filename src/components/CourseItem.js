// components/CourseItem.js

import React from "react";

const CourseItem = ({ course, onEdit, onDelete }) => {
  return (
    <div className="course-item">
      <h3>{course.title}</h3>
      <p>
        <strong>Inicio:</strong> {course.start_date}
      </p>
      <p>
        <strong>Cierre:</strong> {course.end_date}
      </p>
      <p>
        <strong>Categoría:</strong> {course.category || "Sin categoría"}
      </p>
      {course.description && (
        <p>
          <strong>Descripción:</strong> {course.description}
        </p>
      )}

      <div className="item-actions">
        <button onClick={() => onEdit(course)}>Editar</button>
        <button onClick={() => onDelete(course.id)}>Eliminar</button>
      </div>
    </div>
  );
};

export default CourseItem;
