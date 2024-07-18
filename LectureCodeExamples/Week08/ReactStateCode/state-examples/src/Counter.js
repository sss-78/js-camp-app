import './App.css';

import { useState } from 'react';

export default function Counter() {
  return (
    <div>
      <h1>Example of useState hook with a number</h1>
			<h2>Counters that update separately</h2>
      <MyButton cn = "left"/>
      <MyButton />
    </div>
  );
}

function MyButton({cn}) {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button className={cn} onClick={handleClick}>
      Clicked {count} times
    </button>
  );
}

