
export default function List({display}) {
    return (
        <>
            <ul>
                {display.map((match, idx) => (
                    <li key={idx}>{match.city} - {match.state} - {match.population}</li>
                ))}
            </ul>
        </>
    )
}