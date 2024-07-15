/* A component */
function Student({ student }) {
  return (
      <span>
        name: {student.name}, 
        email: {student.email}<br />
      </span>
  );
}

export default Student;
