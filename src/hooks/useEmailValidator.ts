const useEmailValidation = (email: string, setEmail: any, setErrorMsg: any) => {
  setErrorMsg('');

  if (!email || email.length === 0) {
    setErrorMsg('Email cannot be empty');
  }

  const isEmailValid = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email); // use any validator you want
  if (!isEmailValid) {
    setErrorMsg('Invalid email provided');
  }

  setEmail(email);
  return null;
};

export default useEmailValidation;
