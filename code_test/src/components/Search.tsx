import React, { useState } from "react";

const Search = () => {

    const [query, setQuery] = useState("")

    const [results, setResults] = useState([])

    function queryChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        setQuery(event.target.value)
}
    async function fetchDataHandler(event: React.MouseEvent<HTMLFormElement>) {
        event.preventDefault();
        const response = await fetch(`https://api.github.com/search/repositories?q=${query}{&page,1,sort,order}`)
        const data = await response.json()
        setResults(data.items)
      }
    
      console.log(results)
  // Name, language, node_id, owner.login, url,
    
    return (
    <div>
    <form onSubmit={fetchDataHandler}>
    <label> Search GitHub Repository <input type="text" value={query} onChange={queryChangeHandler}/></label>
    <button type='submit'>Enter</button>
    </form>
    <div className="results"><h1>Results go here ⬇︎</h1></div>
      {results.map((result: any) => { return (
            <ul key={result.node_id}>
                <li>
                <h2>Name: {result.name}</h2>
                <h3>Language: {result.language}</h3>
                <p>Author: {result.owner.login}</p>
                <p>Link: {result.html_url}</p>
                </li>
                </ul>)
      })}
    </div>
)}

export default Search;