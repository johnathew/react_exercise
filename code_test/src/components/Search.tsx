import React, { useState } from "react";
import Filter from "./Filter";

const Search = () => {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<any[]>([]);
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

    // filter languages from results
    const removeDuplicateLanguages: any[] = [];
    const languagesArray = data.items.map((lang: any) => lang.language);

    languagesArray.forEach((lang: any) => {
      if (!removeDuplicateLanguages.includes(lang)) {
        removeDuplicateLanguages.push(lang);
      }
    });

    setFilters(removeDuplicateLanguages);
  }

  const sortDataHandler = () => {
    const sortedArray = [...results].sort(
      (a, b) => b.stargazers_count - a.stargazers_count
    );
    setResults(sortedArray);
  };
  const filterHandler = (value: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log(value)
  };

  return (
    <>
      <form onSubmit={fetchDataHandler}>
        <label>
          Search GitHub Repository
          <input type="text" value={query} onChange={queryChangeHandler} />
        </label>
        <button type="submit">Enter</button>
        <button type="button" onClick={sortDataHandler}>
          Sort (by stars)
        </button>
      </form>

      <div>
        Select a filter
        {filters.map((lang) => {
          if (lang !== null) {
            return (
              <Filter
                key={lang}
                toggleFilter={filterHandler}
                value={lang}
                language={lang}
               />
            );
          }
        })}
      </div>
      <h1>Results go here ⬇︎</h1>
      {results.map((result) => {
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
