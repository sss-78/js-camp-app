import { useState } from 'react';

export default function List() {
	const [items, setItems] = useState([]);
	const [itemName, setItemName] = useState("");

	const addItem = event => {
		event.preventDefault();
		setItems([
			...items,
			{
				id: items.length,
				name: itemName
			}
		]);
		console.log("inside handler");
		console.log(`items is: ${items}`);
		console.log(`itemName is: ${itemName}`);
		setItemName("");
	};
	console.log("outside handler before return");
	console.log(`items is: ${items}`);
	console.log(`itemName is: ${itemName}`);
	return (
		<>
			<h1>Example of useState hook with an array of objects and a string</h1>
			<h2>Creating a List and Displaying it</h2>
			<form onSubmit={addItem}>
				<label>
					<input
						name="item"
						type="text"
						value={itemName}
						onChange={e => setItemName(e.target.value)}
					/>
				</label>
			</form>
			<ul>
				{items.map(item => (
					<li key={item.id}>{item.name}</li>
				))}
			</ul>
		</>
	);
}