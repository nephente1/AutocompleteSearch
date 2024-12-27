import { filteredResultsTypes } from "./SearchAutocomplete";

interface ResultsListProps {
  results: Array<filteredResultsTypes>;
}
const ResultsList = ({ results }: ResultsListProps) => {
  return (
    <div>
      <ul>
        {results.map((result) => (
          <li key={result.id}>
            <a href={result.url} target="_blank" rel="noopener noreferrer">
              {result.title}
            </a>
            <p>{result.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultsList