import React, { useState } from "react";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  function queryChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }

  async function fetchDataHandler(event: React.MouseEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${query}&page=1&per_page=30&sort&order=desc`
    );
    const data = await response.json();
    setResults(data.items);
  }

  const sortDataHandler = () => {
    const sortedArray = [...results].sort(
      (a, b) => b.stargazers_count - a.stargazers_count
    );
    setResults(sortedArray);
  };
  // Name, language, node_id, owner.login, url,

  return (
    <>
      <form onSubmit={fetchDataHandler}>
        <label>
          {" "}
          Search GitHub Repository{" "}
          <input type="text" value={query} onChange={queryChangeHandler} />
        </label>
        <button type="submit">Enter</button>
      </form>
      <button type="button" onClick={sortDataHandler}>
        Sort (by stars)
      </button>
      <label>Filter results by language</label>
      <h1>Results go here ⬇︎</h1>

      {results.map((result: any) => {
        return (
          <div key={result.node_id} className="results_main">
            <ul>
              <h3>Name: {result.name}</h3>
              <h3>Language: {result.language}</h3>
              <p>Author: {result.owner.login}</p>
              <p>Link: {result.html_url}</p>
              <p>Stars: {result.stargazers_count}</p>
            </ul>
          </div>
        );
      })}
    </>
  );
};

export default Search;
