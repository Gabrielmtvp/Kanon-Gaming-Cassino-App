import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AllGames from './components/allGames/AllGames';
import Login from './components/forms/login/Login';
import Register from './components/forms/register/Register';
import Home from './components/home/Home';
import PrivateRoute from './components/privateRouter/PrivateRouter';
import SlotMachine from './components/slotMachine/SlotMachine';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<PrivateRoute component={Home} />} />
        <Route path="/games" element={<PrivateRoute component={AllGames} />} />
        <Route path="/slotmachine" element={<PrivateRoute component={SlotMachine} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
