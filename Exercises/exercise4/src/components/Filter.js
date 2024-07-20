import { useState, useEffect } from 'react';
import List from './List';

export default function Filter() {
  const [places, setState] = useState({
   data : []
  });

  const [populationSize, setPopulationSize] = useState('')
  const [matches, setMatches] = useState([])


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

  const filterPlaces = (e) => {
    console.log(e.target.value)
    setPopulationSize(e.target.value)

    const found = places.data.filter((place) => parseInt(place.population) < e.target.value)
    console.log(found.length)
    setMatches(found)
  }

  return (
    <>
      <h4>Enter Population Maximum Size</h4>
      <input name="population" type="text" value={populationSize} onChange={filterPlaces}/>
      <h4>Cities that have a population less than {populationSize} are:</h4>
      <List display={matches}/>
    </>
  )
	
}
