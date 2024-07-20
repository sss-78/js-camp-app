import './App.css';
import { useState } from 'react';

export default function LoginForm(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const printValues = e => {
      e.preventDefault();
      console.log(username, password);
    };
  
    return (
			<>
      <h1>Example of multiple useState hooks with a string</h1>
    	<h2>Entering and storing values from a login form</h2>  
      <form onSubmit={printValues}>
        <label>
          Username: {''}  
          <input className={props.cn}
            value={username}
            onChange={event => setUsername(event.target.value)}
            name="username"
            type="text"
          />
        </label>

        <label>
          Password: {''}
          <input
            value={password}
            onChange={event => setPassword(event.target.value)}
            name="password"
            type="password"
          />
        </label>
        <br />
				<br />
        <button>Submit</button>
      </form>
			</>
    );
  }