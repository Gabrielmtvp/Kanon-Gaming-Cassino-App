import '../index.css';

import axios from 'axios';
import jwt from 'jwt-decode';
import { setCookie } from 'nookies';
import { FormEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setLogin } from '../../../features/userSlice';
import CustomInput from '../../input/CustomInput';
import MsgBox from '../../msgBox/MsgBox';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [type, setType] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registered = window.location.href.indexOf('user=ok') != -1;

  useEffect(() => {
    if (registered) {
      setMsg('Registered with successful.');
      setType('info');
    }
  }, []);

  async function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await axios
      .post(`${import.meta.env.VITE_API_BASE_URL}/user/authenticate`, {
        email,
        password,
      })
      .then((res) => {
        if (res.status === 200) {
          const token = res.data.token;
          const userData = jwt(token);
          dispatch(setLogin({ userData, token }));
          setCookie(null, 'token', token, {
            maxAge: 30 * 24 * 60 * 60,
          });
          navigate('/home');
        }
      })
      .catch((error) => {
        console.log(error);
        console.log('fewfewfw');
        setMsg('teste');
        if (error.response.status == 400) {
          setMsg(error.response.data.error);
          setType('error');
        }
      });
  }

  return (
    <div className="container">
      {msg != '' ? <MsgBox msg={msg} type={type} /> : null}
      <div className="divImg">
        <img
          src="https://kanongaming.com/wp-content/uploads/2022/11/KanonGaming100x60-01-1.png"
          alt="Kanon Gaming"
          width={250}
        />
      </div>
      <form onSubmit={(e) => login(e)}>
        <CustomInput
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <CustomInput
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <CustomInput type="submit" name="Login" disabled={false} />
        <a href="/register">
          <span>New to Kanon Gaming? Register for an account</span>
        </a>
      </form>
    </div>
  );
}

export default Login;
