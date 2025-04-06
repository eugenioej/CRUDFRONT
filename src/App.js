import React from "react";
import CourseList from "./components/CourseList";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Administrador de Cursos</h1>
      </header>
      <main>
        <CourseList />
      </main>
      <footer>
        <p>CRUD de Cursos © 2025</p>
      </footer>
    </div>
  );
}

export default App;
