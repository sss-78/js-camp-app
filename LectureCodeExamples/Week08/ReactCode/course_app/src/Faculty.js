/* A component */
function Faculty() {
  const school = "UMCP";
  const teachers = ["Mary", "John", "Mike"]

  return (
      <div>
        <h1>Faculty</h1>
        School name: {school}<br />  { /* To add a comment we need {} */ }
        Teacher's list:
        <ul>
          { teachers.map( (teacher) => <li>{teacher}</li>)}
        </ul>
        <button onClick={(event) => alert("Faculty Component")}>Click Here</button>
      </div>
  );
}

export default Faculty;
