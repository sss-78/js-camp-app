import './App.css';

import { useState } from 'react';

export default function Counter2() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>Example of Lifting State to the Parent Component</h1>
			<h2>Notice now that the counters are always in sync with each other</h2>
      <MyButton cn="left" count={count} onClick={handleClick}/>
      <MyButton count={count} onClick={handleClick}/>
    </div>
  );
}

function MyButton({cn, count, onClick}) {
  return (
    <button className={cn} onClick={onClick}>
      Clicked {count} times
    </button>
  );
}

