/* A component */
import "./CourseTable.css"; /* Notice how we include styles */
import Faculty from "./Faculty"; 
import Student from "./Student";

/* Note: we need the div; the return structure may have only one root element */
function CourseTable() {
  return (
      <div>
        <h1>Course Table</h1>
        <table border="1">
            <tr><th>Name</th><th>Credits</th></tr>
            <tr><td>CMSC335</td><td>3</td></tr>
            <tr><td>CMSC216</td><td>5</td></tr>
        </table>
        <Faculty />
        
        <Student student = {{name: "Peter", email: "peter@notreal.really"}} />
        <Student student = {{name: "Mary", email: "mary@notreal.really"}} />
        <Student student = {{name: "Kelly", email: "Kelly@notreal.really"}} />
        
      </div>
  );
}

export default CourseTable;
