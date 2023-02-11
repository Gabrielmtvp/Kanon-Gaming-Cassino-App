import '../index.css';

import axios from 'axios';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useEmailValidation from '../../../hooks/useEmailValidator';
import useNameValidation from '../../../hooks/useNameValidator';
import CustomInput from '../../input/CustomInput';
import MsgBox from '../../msgBox/MsgBox';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [type, setType] = useState('');
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  const navigate = useNavigate();

  async function handleRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await axios
      .post(`${import.meta.env.VITE_API_BASE_URL}user/register`, {
        name,
        email,
        password,
      })
      .then(async (res) => {
        if (res.status == 200) {
          navigate('/login?user=ok');
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          setMsg(error.response.data.error);
          setType('error');
        }
      });
  }

  return (
    <div className="container">
      {msg != '' ? <MsgBox msg={msg} type={type} /> : null}
      <div className="divImg">
        <a href="/login">
          <img
            src="https://kanongaming.com/wp-content/uploads/2022/11/KanonGaming100x60-01-1.png"
            alt="Kanon Gaming"
            width={250}
          />
        </a>
      </div>
      <form onSubmit={(e) => handleRegister(e)}>
        <CustomInput
          type="text"
          name="name"
          id="name"
          value={name}
          placeholder="Name"
          required="required"
          maxlength={20}
          onChange={(e) => useNameValidation(e.target.value, setName, setNameError)}
        />
        {nameError != '' ? <span>{nameError}</span> : null}
        <CustomInput
          type="email"
          name="email"
          id="email"
          value={email}
          placeholder="Email"
          required="required"
          onChange={(e) => useEmailValidation(e.target.value, setEmail, setEmailError)}
        />
        {emailError != '' ? <span>{emailError}</span> : null}
        <CustomInput
          type="password"
          name="password"
          id="password"
          value={password}
          placeholder="Password"
          required="required"
          onChange={(e) => setPassword(e.target.value)}
        />

        <CustomInput
          type="submit"
          name="Register"
          disabled={emailError != '' || nameError != ''}
        />
        <a href="/login">
          <span>Go back to Login and enjoy!</span>
        </a>
      </form>
    </div>
  );
}

export default Register;
