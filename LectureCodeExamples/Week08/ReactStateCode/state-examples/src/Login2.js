import './App.css';
import { useState } from 'react';

export default function LoginForm2({cn}) {
	const [form, setState] = useState({
    username: '',
    password: ''
  });

  const printValues = e => {
    e.preventDefault();
    console.log(form.username, form.password);
  };

  const updateField = e => {
    setState({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  return (
		<>
		<h1>Example of useState hook with an object</h1>
		<h2>Entering and storing values from a login form</h2>
    <form onSubmit={printValues}>
      <label>
        Username: {''}
        <input
					className={cn}
          value={form.username}
          name="username"
          onChange={updateField}
        />
      </label>
      <label>
        Password: {''}
        <input
          value={form.password}
          name="password"
          type="password"
          onChange={updateField}
        />
      </label>
      <br />
			<br />
      <button>Submit</button>
    </form>
		</>
  );
}