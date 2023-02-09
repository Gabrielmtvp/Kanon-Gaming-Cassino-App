import './index.css';

import { useSelector } from 'react-redux';

import { selectUser } from '../../features/userSlice';
import Header from '../header/Header';

function Home() {
  const user = useSelector(selectUser);
  return (
    <div className="homeContainer">
      <Header />
      <div className="content">
        <h1>Hi {user.user.name}</h1>
        <p>Welcome to the Kanon Gaming! Enjoy the games!</p>
      </div>
      <div className="cards">
        <a href="/games">
          <div className="card games"></div>
        </a>
        <a href="/slotmachine">
          <div className="card cassino"></div>
        </a>
      </div>
    </div>
  );
}

export default Home;
