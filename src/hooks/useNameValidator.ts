const useEmailValidation = (name: string, setName: any, setNameError: any) => {
  setNameError('');

  if (!name || name.length >= 19) {
    setNameError('Name cannot be empty or more than 19 characteres');
  }

  setName(name);
  return null;
};

export default useEmailValidation;
