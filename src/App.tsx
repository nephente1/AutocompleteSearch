import { useState } from "react";
import ResultsList from "./components/ResultsList";
import SearchAutocomplete from "./components/SearchAutocomplete";

const App = () => {
  const [results, setResults] = useState([]);

  return (
    <div className="px-10 py-5">
      <SearchAutocomplete setResults={setResults}/>
      {results.length > 0 && <ResultsList results={results} />}
    </div>
  );
};

export default App;
