import './index.css';

import { ChangeEvent, useState } from 'react';

import gameList from '../../assets/games.json';
import ArrowBack from '../arrowBack/ArrowBack';
import Header from '../header/Header';

function AllGames() {
  const [games, setGames] = useState(gameList);
  const filterBySearch = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    const length = event.target.value.length;
    if (length > 0) {
      let updatedList = [...games];

      updatedList = updatedList.filter((game) => {
        return game.title.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      });
      setGames(updatedList);
    } else {
      setGames(gameList);
    }
  };
  return (
    <div className="allGamesContainer">
      <Header />
      <ArrowBack url="/home" />
      <div className="allGamesContent">
        <div className="divInputSearch">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Filter a game"
            onChange={filterBySearch}
          />
        </div>
        <div className="cards">
          {games.map((game) => {
            return (
              <div className="card" key={game.id}>
                <a href={game.startUrl}>
                  <img src={game.thumb?.url} alt={game.title} />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AllGames;
