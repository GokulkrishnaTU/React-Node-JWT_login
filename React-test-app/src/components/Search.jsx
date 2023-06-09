import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 8px;
`;

const SearchButton = styled.button`
  background-color: #2196f3;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  margin-left: 8px;
  cursor: pointer;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
  margin-top: 24px;
`;

const Card = styled.div`
  background-color: #f5f5f5;
  padding: 16px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const token = localStorage.getItem('token');
    console.log(token);

    try {
      const response = await fetch(
    `http://localhost:3001/api/search?title=${encodeURIComponent(searchTerm)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send the JWT token in the authorization header
          },

        }
      );

      if (!response.ok) {
        throw new Error('Search request failed');
      }

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Search request failed:', error);
      setResults([]);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(
          'https://api.tvmaze.com/search/shows?q=stand'
        );

        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }

        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('Failed to fetch movies:', error);
        setResults([]);
      }

      setIsLoading(false);
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    setResults([]);
  }, [searchTerm]);

  return (
    <div>
      <h1>Search Page</h1>
      <SearchContainer>
        <SearchForm onSubmit={handleSearch}>
          <SearchInput
            type="text"
            placeholder="Search TV Shows"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchButton type="submit" disabled={isLoading}>
            Search
          </SearchButton>
        </SearchForm>
        {results.length === 0 && !isLoading && <p>No results found.</p>}
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <CardContainer>
            {results.map((result) => (
              <Card key={result.show.id}>
                <img
                  src={result.show.image?.medium || 'placeholder-image-url'}
                  alt={result.show.name}
                />
                <h2>{result.show.name}</h2>
                <p>Type: {result.show.type}</p>
                <p>Language: {result.show.language}</p>
                <p>Genres: {result.show.genres.join(', ')}</p>
                <p>Status: {result.show.status}</p>
                <p>
                  Schedule: {result.show.schedule?.days.join(', ')} at{' '}
                  {result.show.schedule?.time}
                </p>
              </Card>
            ))}
          </CardContainer>
        )}
      </SearchContainer>
    </div>
  );
};

export default SearchPage;
