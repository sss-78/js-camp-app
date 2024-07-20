import { useState, useEffect } from 'react';

export default function Filter() {
  const [places, setState] = useState({
   data : []
  });
  const endpoint =
    "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";
  
    useEffect(() => {
    fetch(endpoint)
      .then(data => data.json())
      .then(results => {
				setState({data: results})
      })
      .catch(error => console.log(error));
  }, []);
	console.log(places)
	
}
