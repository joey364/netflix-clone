import React from 'react';

import Row from '../components/Row';
import requests from '../utils/requests';
import Banner from '../components/Banner';
import Nav from '../components/Nav';

function Main() {
  return (
    <div>
        <Nav />
        <Banner />
        <Row
          title={'NETFLIX ORIGINALS'}
          fetchUrl={requests.fetchNetflixOriginals}
          isLargeRow
        />
        <Row
          title={'Trending Now'}
          fetchUrl={requests.fetchTrending}
          isLargeRow
        />
        <Row title={'Top rated'} fetchUrl={requests.fetchTopRated} isLargeRow />
        <Row
          title={'Action Movies'}
          fetchUrl={requests.fetchActionMovies}
          isLargeRow
        />
        <Row
          title={'Comedy Movies'}
          fetchUrl={requests.fetchComedyMovies}
          isLargeRow
        />
        <Row
          title={'Horror Movies'}
          fetchUrl={requests.fetchHorrorMovies}
          isLargeRow
        />
        <Row
          title={'Romance Movies'}
          fetchUrl={requests.fetchRomanceMovies}
          isLargeRow
        />
        <Row
          title={'Documentaries'}
          fetchUrl={requests.fetchDocumentaries}
          isLargeRow
        />
      </div>
  );
}

export default Main;
