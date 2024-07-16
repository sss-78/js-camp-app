const Message = ({ name} ) => <h1>Hola {name}!</h1>

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(<Message name="Terps" />);