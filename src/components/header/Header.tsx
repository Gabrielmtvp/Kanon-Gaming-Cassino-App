import './index.css';

import { destroyCookie } from 'nookies';
import { IoIosLogOut } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setLogout } from '../../features/userSlice';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function logoff() {
    dispatch(setLogout());

    destroyCookie(null, 'token');

    navigate('/');
  }

  return (
    <div className="header">
      <div>
        <a href="/home">
          <img
            src="https://kanongaming.com/wp-content/uploads/2022/11/KanonGaming100x60-01-1.png"
            alt="Kanon Gaming"
          />
        </a>
      </div>
      <div className="logout">
        <span onClick={() => logoff()}>
          <IoIosLogOut size={30} />
        </span>
      </div>
    </div>
  );
}

export default Header;
