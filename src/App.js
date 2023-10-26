import logo from './logo.svg';
import './App.css';
import Signin from './components/Signin';
import Main  from './components/Main';
import { Route, Routes } from 'react-router-dom';
import Chat from './components/Chat';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Signin/>}/>
        <Route path='/main' element={<Main/>}/>
        <Route path='/chat' element={<Chat/>}/>
      </Routes>
    </div>
  );
}

export default App;
