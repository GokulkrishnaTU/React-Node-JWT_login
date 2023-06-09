import React, { useState, useEffect } from 'react';
import styled from 'styled-components';




//styleds defined for the elements

const SearchContainer = styled.div`
  margin: 0 auto;

`;
const MainContainer = styled.div`
  margin: 0 ;
  background-color: black;

  h1{
    text-align: center;
    text-transform: uppercase;
    color: white;
    margin: 0;
    padding: 50px;
  }

`;
const SearchForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchInput = styled.input`
  flex: .5;
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
background-color: #393939;
padding: 16px;
border-radius: 10px;
box-shadow: 0 2px 4px rgba(0,0,0,0.1);
display: flex;
-webkit-flex-direction: column;
-ms-flex-direction: column;
flex-direction: column;
color: white;
  img{
    height: 300px;
  }

`;

const SearchPage = () => {

  //used the react useState hooks to handle the querys 

  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    //jwt token is assiged to a variable

    const token = localStorage.getItem('token');
    console.log(token);

    //api has been called when seach is done and stored to a variable

    try {
      const response = await fetch(
    `http://localhost:3001/api/search?title=${encodeURIComponent(searchTerm)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send the JWT token in the authorization header
          },

        }
      );


      //if the resposne is not ok is show error msg

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

  // api called when the page is loaded in try catch block to list the movie datas

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


<MainContainer>
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
    </MainContainer>
  );
};

export default SearchPage;




































// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import Container from '@mui/material/Container';
// import Typography from '@mui/material/Typography';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import Grid from '@mui/material/Grid';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';

// const SearchContainer = styled(Container)`
// background-color: #1f1e1c;
//   width: 100%;
//   margin: 0 auto;
// `;

// const SearchForm = styled('form')`
//   display: flex;
//   align-items: center;
// `;

// const SearchInput = styled(TextField)`
//   flex: 1;
//   background-color: white;
//   margin-bottom: ;
// `;

// const SearchButton = styled(Button)`
//   margin-left: 8px;
// `;

// const CardContainer = styled(Grid)`
//   margin-top: 24px;
// `;

// const StyledCard = styled(Card)`
// display: flex;
// flex-direction:column;
// align-items: center;
// gap: 20px;
//   background-color: #f5f5f5;
//   border-radius: 4px;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//   width: 100%;
//   height: 550px;
//   border-radius: 30px;
// `;

// const SearchPage = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [results, setResults] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     const token = localStorage.getItem('token');
//     console.log(token);

//     try {
//       const response = await fetch(
//         `http://localhost:3001/api/search?title=${encodeURIComponent(
//           searchTerm
//         )}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // Send the JWT token in the authorization header
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error('Search request failed');
//       }

//       const data = await response.json();
//       setResults(data);
//     } catch (error) {
//       console.error('Search request failed:', error);
//       setResults([]);
//     }

//     setIsLoading(false);
//   };

//   useEffect(() => {
//     const fetchMovies = async () => {
//       setIsLoading(true);

//       try {
//         const response = await fetch(
//           'https://api.tvmaze.com/search/shows?q=stand'
//         );

//         if (!response.ok) {
//           throw new Error('Failed to fetch movies');
//         }

//         const data = await response.json();
//         setResults(data);
//       } catch (error) {
//         console.error('Failed to fetch movies:', error);
//         setResults([]);
//       }

//       setIsLoading(false);
//     };

//     fetchMovies();
//   }, []);

//   useEffect(() => {
//     setResults([]);
//   }, [searchTerm]);

//   return (
//     <SearchContainer>
//       <Typography variant="h3" component="h1" align="center">
//         Search Page
//       </Typography>
//       <SearchForm onSubmit={handleSearch}>
//         <SearchInput
//           label="Search TV Shows"
//           variant="outlined"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <SearchButton variant="contained" type="submit" disabled={isLoading}>
//           Search
//         </SearchButton>
//       </SearchForm>
//       {results.length === 0 && !isLoading && <Typography>No results found.</Typography>}
//       {isLoading ? (
//         <Typography>Loading...</Typography>
//       ) : (
//         <CardContainer container spacing={2}>
//           {results.map((result) => (
//             <Grid item xs={12} sm={6} md={4} key={result.show.id}>
//               <StyledCard>
//                 <CardContent>
//                   <img
//                     src={result.show.image?.medium || 'placeholder-image-url'}
//                     alt={result.show.name}
//                   />
//                   <Typography variant="h3" component="h2">
//                     {result.show.name}
//                   </Typography>
//                   <Typography variant="body1">Type: {result.show.type}</Typography>
//                   <Typography variant="body1">Language: {result.show.language}</Typography>
//                   <Typography variant="body1">Genres: {result.show.genres.join(', ')}</Typography>
//                   <Typography variant="body1">Status: {result.show.status}</Typography>
//                   <Typography variant="body1">
//                     Schedule: {result.show.schedule?.days.join(', ')} at {result.show.schedule?.time}
//                   </Typography>
//                 </CardContent>
//               </StyledCard>
//             </Grid>
//           ))}
//         </CardContainer>
//       )}
//     </SearchContainer>
//   );
// };

// export default SearchPage;

